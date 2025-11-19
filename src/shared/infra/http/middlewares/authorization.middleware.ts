import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../../../modules/users/domain/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

export const authorizeRoles = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required. Missing token or invalid token.",
      });
    }

    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        error: "Forbidden: You do not have permission to access this resource.",
      });
    }

    next();
  };
};
