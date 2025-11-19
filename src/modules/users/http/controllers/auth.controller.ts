import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { RegisterRequest, LoginRequest } from "../../dtos/request.types";
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<void> {
    const data = req.body as RegisterRequest;
    const result = await this.authService.register(data);
    res.status(201).json(result);
  }

  async login(req: Request, res: Response): Promise<void> {
    const data = req.body as LoginRequest;
    const result = await this.authService.login(data);

    res.status(200).json(result);
  }
}
