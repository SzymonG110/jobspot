-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now();

-- CreateTable
CREATE TABLE "CompanyUser" (
    "company_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "CompanyUser_pkey" PRIMARY KEY ("company_id","user_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "logo_buffer" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanyUser_user_id_idx" ON "CompanyUser"("user_id");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
