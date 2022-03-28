import { Router } from "express";
import multer from "multer";

import upload from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/UseCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/UseCases/updatedUserAvatar/UpdateUserAvatarController";
import { EnsureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(upload.upload("./tmp/avatar"));

const createUserController = new CreateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
	"/avatar",
	EnsureAuthenticated,
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);

export { usersRoutes };
