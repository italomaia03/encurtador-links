-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "long_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "url_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_long_url_key" ON "urls"("long_url");

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_url_key" ON "urls"("short_url");

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_code_key" ON "urls"("url_code");
