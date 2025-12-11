import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../../../../shared/infra/database";
import { AuthRequest } from "../../../../shared/infra/http/middlewares/auth.middleware";
import { MailProvider } from "../../../../shared/providers/MailProvider";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
});

export class CheckoutController {
  async createSession(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user!.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    let total = 0;
    const orderItemsData = [];
    const lineItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        res.status(400).json({ error: `Product ${item.productId} not found` });
        return;
      }

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });

      lineItems.push({
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            // images: [product.imageUrl],
          },
          unit_amount: Math.round(Number(product.price) * 100),
        },
        quantity: item.quantity,
      });

      total += Number(product.price) * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total: total,
        status: "PENDING",
        items: {
          create: orderItemsData,
        },
      },
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user && user.email) {
      const mailProvider = new MailProvider();
      mailProvider.sendOrderConfirmation(user.email, order.id, Number(total), user.name);
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: `${process.env.FRONTEND_URL}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout`,
        metadata: {
          orderId: order.id,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: session.id },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create Stripe session" });
    }
  }
}
