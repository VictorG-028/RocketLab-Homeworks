-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "readyToShipToday" BOOLEAN NOT NULL DEFAULT false,
    "brand" TEXT NOT NULL DEFAULT '',
    "model" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "connectivity" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Product" ("brand", "color", "connectivity", "currency", "description", "id", "imageUrl", "model", "name", "price", "quantity", "readyToShipToday") SELECT "brand", "color", "connectivity", "currency", "description", "id", "imageUrl", "model", "name", "price", "quantity", "readyToShipToday" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("balance", "currency", "email", "id", "name", "password") SELECT "balance", "currency", "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check("Product");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
