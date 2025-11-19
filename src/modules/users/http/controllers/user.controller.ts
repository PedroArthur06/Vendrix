import { Response } from "express";
import { UserService } from "../../services/user.service";
import { AuthRequest } from "../../../../shared/infra/http/middlewares/auth.middleware";
import { UserRole } from "../../domain/user.types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const user = await this.userService.getProfileById(req.user.id);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({
        id: user.id,
        email: user.email,
        profile: user.profile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateRole(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body as { role: UserRole };

      const updatedUser = await this.userService.updateRole(id, role);

      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Retorna a resposta limpa
      const { passwordHash, ...userResponse } = updatedUser;

      res.status(200).json(userResponse);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Invalid user role")
      ) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
