// src/controllers/Title/createTitle.ts

import { Response } from "express";
import httpStatus from "http-status";
import { titleService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const createTitleHandler = async (req, res: Response) => {
  const { title } = req.body;
  const userId = req.user; // Ensure req.user is set by the auth middleware

  const newTitle = await titleService.createTitle({ title, userId });

  if (!newTitle) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Failed to create title" });
  }

  return res.status(httpStatus.CREATED).json(newTitle);
};

export const createTitleController = errorHandlerWrapper(createTitleHandler);
