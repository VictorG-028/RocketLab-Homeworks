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
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Product" ("brand", "color", "connectivity", "currency", "description", "id", "imageUrl", "model", "name", "price", "quantity", "readyToShipToday") SELECT "brand", "color", "connectivity", "currency", "description", "id", "imageUrl", "model", "name", "price", "quantity", "readyToShipToday" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check("Product");
PRAGMA foreign_keys=ON;
