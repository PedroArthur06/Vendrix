import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "./../../../../shared/infra/http/middlewares/auth.middleware";
import { authorizeRoles } from "../../../../shared/infra/http/middlewares/authorization.middleware";

const router = Router();
const userController = new UserController();

router.get(
  "/profile",
  authenticateToken,
  userController.getProfile.bind(userController)
);

router.patch(
  "/users/:id/role",
  authenticateToken,
  authorizeRoles(["admin"]),
  userController.updateRole.bind(userController)
);

export default router;
