import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class Security {
  public static hashPassword(pass: string) {
    return bcrypt.hashSync(pass, 10);
  }

  public static checkPassword(pass: string, hash: string) {
    return bcrypt.compareSync(pass, hash);
  }

  public static generateUserToken(user: User, expiry: number | string = 3600) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || "secret";
    const data = {
      time: Date(),
      user,
    };

    return jwt.sign(data, jwtSecretKey, { expiresIn: expiry });
  }
}
