-- CreateEnum for Role permissions (stored as JSON text)
-- CreateEnum for statuses (stored as TEXT with check constraints)

-- CreateTable: roles
CREATE TABLE "roles" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "permissions" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable: users
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roleKey" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable: sessions
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable: categories
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable: products
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL DEFAULT 'BUKHETE',
    "reference" TEXT,
    "categoryId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Brouillon',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "shortDescription" TEXT,
    "description" TEXT,
    "composition" TEXT,
    "certifications" TEXT,
    "packaging" TEXT,
    "instructions" TEXT,
    "precautions" TEXT,
    "additionalInfo" TEXT,
    "videoUrl" TEXT,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable: product_images
CREATE TABLE "product_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable: media
CREATE TABLE "media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'IMAGE',
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable: orders
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Nouvelle',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable: order_items
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable: distributor_requests
CREATE TABLE "distributor_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "zone" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Nouvelle',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable: videos
CREATE TABLE "videos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "duration" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Brouillon',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable: articles
CREATE TABLE "articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "excerpt" TEXT,
    "content" TEXT,
    "image" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Brouillon',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable: site_settings (single row with id=1)
CREATE TABLE "site_settings" (
    "id" INTEGER NOT NULL PRIMARY KEY DEFAULT 1,
    "companyName" TEXT NOT NULL DEFAULT 'NIUMBA TRANSFORM',
    "legalName" TEXT NOT NULL DEFAULT 'NIUMA TRANSFORM',
    "brandName" TEXT NOT NULL DEFAULT 'BUKHETE',
    "tagline" TEXT DEFAULT 'La propreté qui nous ressemble',
    "companyDescription" TEXT,
    "rccm" TEXT,
    "idNat" TEXT,
    "nif" TEXT,
    "foundedAt" TEXT,
    "address" TEXT,
    "industrialSite" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "whatsappLink" TEXT,
    "email" TEXT,
    "social" TEXT NOT NULL DEFAULT '{}',
    "horaires" TEXT,
    "designerCredit" TEXT NOT NULL DEFAULT 'Conçu par One Koncept',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "site_settings_single_row" CHECK ("id" = 1)
);

-- CreateTable: visual_identity (single row with id=1)
CREATE TABLE "visual_identity" (
    "id" INTEGER NOT NULL PRIMARY KEY DEFAULT 1,
    "logoPath" TEXT,
    "logoDarkPath" TEXT,
    "logoBlackPath" TEXT,
    "logoSquarePath" TEXT,
    "faviconPath" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "visual_identity_single_row" CHECK ("id" = 1)
);

-- CreateIndexes
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "sessions_tokenHash_key" ON "sessions"("tokenHash");
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE UNIQUE INDEX "orders_reference_key" ON "orders"("reference");
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- AddForeignKeys
ALTER TABLE "users" ADD CONSTRAINT "users_roleKey_fkey" FOREIGN KEY ("roleKey") REFERENCES "roles"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;