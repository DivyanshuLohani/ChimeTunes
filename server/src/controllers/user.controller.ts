import prisma from "@utils/prisma";
import Security from "@utils/security";
import { Request, Response } from "express";

export async function signupUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const alreadyUser = await prisma.user.findUnique({ where: { email } });
  if (alreadyUser)
    return res.status(400).json({ error: "User already exists" });

  const hashedPassword = Security.hashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send Email to the user to verify their account
  const verifyToken = Security.generateUserToken(newUser);
  await prisma.userVerifyToken.create({
    data: {
      token: verifyToken,
      userId: newUser.id,
    },
  });

  return res.status(200).json(newUser);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "User does not exist" });

  if (!Security.checkPassword(password, user.password))
    return res.status(401).json({ error: "Invalid Credentials" });

  const userAccessToken = Security.generateUserToken(user);
  const userRefresh = Security.generateUserToken(user, "1m");
  res.json({
    accessToken: userAccessToken,
    refreshToken: userRefresh,
  });
}
