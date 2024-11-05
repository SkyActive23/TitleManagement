// src/controllers/Title/updateTitle.ts

import { Response } from "express";
import httpStatus from "http-status";
import { titleService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const updateTitleHandler = async (req, res: Response) => {
  const { id } = req.params;
  const { title, details } = req.body;

  const updatedTitle = await titleService.updateTitle(id, { title, details });

  if (!updatedTitle) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "Title not found" });
  }

  return res.status(httpStatus.OK).json({ message: "Title updated successfully", title: updatedTitle });
};

export const updateTitleController = errorHandlerWrapper(updateTitleHandler);
