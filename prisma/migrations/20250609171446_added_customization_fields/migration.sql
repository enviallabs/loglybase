-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- CreateEnum
CREATE TYPE "FontSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "customCss" TEXT,
ADD COLUMN     "fontFamily" TEXT DEFAULT 'inter',
ADD COLUMN     "fontSize" "FontSize" NOT NULL DEFAULT 'SMALL',
ADD COLUMN     "primaryColor" TEXT,
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'LIGHT';
