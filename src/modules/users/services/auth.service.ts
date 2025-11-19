import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../shared/infra/database";
import { UserRole } from "../domain/user.types";
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from "../dtos/request.types";

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "secret";
  private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash,
        name: data.profile.name,
        lastName: data.profile.lastName,
        phone: data.profile.phone,
        role: "customer", // Default
        address: data.profile.address
          ? {
              create: {
                street: data.profile.address.street,
                city: data.profile.address.city,
                zipCode: data.profile.address.zipCode,
              },
            }
          : undefined,
      },
      include: { address: true },
    });

    const token = this.generateToken(newUser);

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        profile: {
          name: newUser.name,
          lastName: newUser.lastName || undefined,
          phone: newUser.phone || undefined,
          address: newUser.address
            ? {
                street: newUser.address.street,
                city: newUser.address.city,
                zipCode: newUser.address.zipCode,
              }
            : undefined,
        },
      },
    };
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
      include: { address: true },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        profile: {
          name: user.name,
          lastName: user.lastName || undefined,
          phone: user.phone || undefined,
          address: user.address || undefined,
        } as any,
      },
    };
  }

  private generateToken(user: any): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN as any }
    );
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET) as {
        id: string;
        email: string;
        role: UserRole;
      };
    } catch {
      throw new Error("Invalid or expired token");
    }
  }
}
