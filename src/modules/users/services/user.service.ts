import { UserModel } from "../infra/mongo/user.model";
import { User, UserRole } from "../domain/user.types";

export class UserService {
  async getProfileById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    return user?.toJSON() as User | null;
  }

  async updateRole(userId: string, newRole: UserRole): Promise<User | null> {
    const user = await UserModel.findById(userId);

    if (!user) {
      return null;
    }

    const validRoles: UserRole[] = ["admin", "customer", "supplier"];
    if (!validRoles.includes(newRole)) {
      throw new Error("Invalid user role provided.");
    }

    user.role = newRole;
    await user.save();

    return user.toJSON() as User;
  }

  async getProfileByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    return user;
  }
}
