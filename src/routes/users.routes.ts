import { Router } from "express";
import multer from "multer";

import upload from "../config/upload";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRouter = Router();

const uploadAvatar = multer(upload.update("./tmp/avatar"));

usersRouter.post("/users", createUserController.handle);

usersRouter.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRouter };
