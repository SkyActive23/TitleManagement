import { Router } from "express";
import { checkAuth } from "../utils";
import { TitleController } from "../controllers";
import { TitleValidator } from "../validators";

export const titleRouter = Router();

titleRouter.post(
  "/",
  checkAuth,
  TitleValidator.createTitleValidator(),
  TitleController.createTitleController
);

titleRouter.get("/", checkAuth, TitleController.readTitleController);

titleRouter.delete("/:id", checkAuth, TitleController.deleteTitleController);

titleRouter.put("/:id", checkAuth, TitleValidator.updateTitleValidator(), TitleController.updateTitleController);
