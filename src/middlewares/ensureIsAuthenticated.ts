import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { User } from "../modules/accounts/entities/User";
import { UsersRepository } from "../modules/accounts/repositories/UsersRepository";

export async function ensureIsAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
  const token = getToken(request);

  try {
    const user = await verifyToken(token);

    request.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    throw new AppError(err.message, 401);
  }
}

function getToken(request: Request) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError("Invalid token", 401);
  }

  const token = authorization.replace("Bearer", "").trim();
  return token;
}

async function verifyToken(token: string): Promise<User> {
  const { sub: userId } = verify(token, "bded1326bdf4661d3df2736cea7305cec1afb037");

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(userId as string);

  if (!user) throw new AppError("User does not exists", 401);

  return user;
}
