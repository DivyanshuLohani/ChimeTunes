-- CreateTable
CREATE TABLE "UserVerifyToken" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVerifyToken_userId_token_key" ON "UserVerifyToken"("userId", "token");

-- AddForeignKey
ALTER TABLE "UserVerifyToken" ADD CONSTRAINT "UserVerifyToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
