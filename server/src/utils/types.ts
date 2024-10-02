import { User } from "@prisma/client";

export interface UserTokenPayload {
  time: Date;
  user: User;
}
