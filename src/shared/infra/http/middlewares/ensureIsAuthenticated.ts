import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

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

  return authorization.replace("Bearer", "").trim();
}

async function verifyToken(token: string): Promise<User> {
  const { sub: userId } = verify(token, "bded1326bdf4661d3df2736cea7305cec1afb037");

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(userId as string);

  if (!user) throw new AppError("User does not exists", 401);

  return user;
}
