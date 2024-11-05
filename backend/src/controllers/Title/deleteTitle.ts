// src/controllers/Title/deleteTitle.ts

import { Response } from "express";
import httpStatus from "http-status";
import { titleService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

export const deleteTitleHandler = async (req, res: Response) => {
  const { id } = req.params;

  try {
    const result = await titleService.deleteTitle(id);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Title not found" });
    }

    return res.status(httpStatus.OK).json({ message: "Title deleted successfully" });
  } catch (error) {
    console.error("Error deleting title:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error deleting title" });
  }
};
export const deleteTitleController = errorHandlerWrapper(deleteTitleHandler);
