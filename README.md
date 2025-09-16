# Ekart

# Project Setup Steps 
1. npm init -y
2. npm install typescript ts-node @types/node --save-dev
3. npx tsc --init
4. update the ts-config 
5. mkdir src
6. touch server.js
7. npm install express
8. npm install --save-dev @types/express
9. tsc


# tsconfig.json

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}

# start nodemon server 
 npm install --save-dev nodemon

# package.json

  "scripts": {
    "start": "nodemon --exec ts-node src/index.ts"
  },


# Install Packages 
1. npm install @prisma/client
2. npm install --save-dev prisma typescript ts-node @types/node

# Initialize Prisma
npx prisma init

# Configure PostgreSQL Connection
DATABASE_URL="postgresql://postgres:root@localhost:5432/ecart?schema=public"


# Define Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

# Run Migration
npx prisma migrate dev --name init

# Create Prisma Client File
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;

# Run Prisma Studio (optional GUI)
npx prisma studio


# folder structure 

src -|
     |--> server.js 
     |--> app.js
     |--> middleware
     |--> config
     |--> utils
     |--> controller
     |--> routes 
