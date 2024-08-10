/*
  Warnings:

  - The primary key for the `Deployments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `deploymentId` column on the `Deployments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Deployments" DROP CONSTRAINT "Deployments_pkey",
DROP COLUMN "deploymentId",
ADD COLUMN     "deploymentId" SERIAL NOT NULL,
ADD CONSTRAINT "Deployments_pkey" PRIMARY KEY ("deploymentId");
