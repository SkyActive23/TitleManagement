import { NextFunction } from "express";
import { Env } from "../env";
import jwt from "jsonwebtoken";
import { PayloadType } from "../types";
import { userService } from "../services";
import { UnauthorizedError } from "../errors/unauthorized.error";

export const checkAuth = async (req, _res, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new UnauthorizedError("Token is missing");

    const { secretKey } = Env;
    const { id } = jwt.verify(token, secretKey) as PayloadType;
    const user = await userService.getOneUser({ id });

    if (!user) throw new UnauthorizedError("User not found for this token");

    req.user = { ...user };
    next();
  } catch (error) {
    console.error("Authentication error:", (error as Error).message);
    next(new UnauthorizedError((error as Error).message || "Token is invalid"));
  }
};

