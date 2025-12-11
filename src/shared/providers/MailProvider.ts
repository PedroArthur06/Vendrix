import { Resend } from 'resend';

export class MailProvider {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendOrderConfirmation(email: string, orderId: string, total: number, name: string) {
    try {
      await this.resend.emails.send({
        from: 'Vendrix <onboarding@resend.dev>',
        to: email,
        subject: `Pedido Recebido! #${orderId.substring(0, 8).toUpperCase()}`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h1>Olá, ${name}!</h1>
            <p>Recebemos o seu pedido no <strong>Vendrix</strong>.</p>
            <hr />
            <p><strong>ID:</strong> ${orderId}</p>
            <p><strong>Total:</strong> ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</p>
            <br />
            <p>Assim que o pagamento for confirmado pelo banco, enviaremos o rastreio.</p>
            <p>Atenciosamente,<br>Equipe Vendrix</p>
          </div>
        `
      });
      console.log(`[MailProvider] Email enviado para ${email}`);
    } catch (error) {
      console.error('[MailProvider] Erro ao enviar:', error);
    }
  }
}