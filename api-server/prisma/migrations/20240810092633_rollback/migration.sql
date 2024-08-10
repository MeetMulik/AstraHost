/*
  Warnings:

  - The primary key for the `Deployments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Deployments" DROP CONSTRAINT "Deployments_pkey",
ALTER COLUMN "deploymentId" DROP DEFAULT,
ALTER COLUMN "deploymentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deployments_pkey" PRIMARY KEY ("deploymentId");
DROP SEQUENCE "Deployments_deploymentId_seq";
