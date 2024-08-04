-- CreateEnum
CREATE TYPE "DeploymentStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'READY', 'FAILED', 'NOT_STARTED');

-- CreateTable
CREATE TABLE "Projects" (
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "sub_domain" TEXT NOT NULL,
    "custom_domain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "Deployments" (
    "deploymentId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "deployment_url" TEXT,
    "deployment_status" "DeploymentStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deployments_pkey" PRIMARY KEY ("deploymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_sub_domain_key" ON "Projects"("sub_domain");

-- AddForeignKey
ALTER TABLE "Deployments" ADD CONSTRAINT "Deployments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
