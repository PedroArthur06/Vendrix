import { prisma } from "../../../shared/infra/database";
import { User, UserRole } from "../domain/user.types";

export class UserService {
  private mapToDomainUser(prismaUser: any): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      passwordHash: prismaUser.passwordHash,
      role: prismaUser.role as UserRole,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      profile: {
        name: prismaUser.name,
        lastName: prismaUser.lastName || undefined,
        phone: prismaUser.phone || undefined,
        address: prismaUser.address
          ? {
              street: prismaUser.address.street,
              city: prismaUser.address.city,
              zipCode: prismaUser.address.zipCode,
            }
          : undefined,
      },
    };
  }

  async getProfileById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { address: true },
    });

    if (!user) return null;

    return this.mapToDomainUser(user);
  }

  async updateRole(userId: string, newRole: UserRole): Promise<User | null> {
    const validRoles: UserRole[] = ["admin", "customer", "supplier"];
    if (!validRoles.includes(newRole)) {
      throw new Error("Invalid user role provided.");
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
        include: { address: true },
      });

      return this.mapToDomainUser(updatedUser);
    } catch (error) {
      return null;
    }
  }

  async getProfileByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { address: true },
    });

    if (!user) return null;

    return this.mapToDomainUser(user);
  }
}
