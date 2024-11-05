// src/validators/title/updateTitle.validator.ts

import { body } from "express-validator";

export const updateTitleValidator = () => {
  return [
    body("title").notEmpty().withMessage("Title is required."),
    body("details").optional().isString().withMessage("Details should be a string."),

  ];
};
