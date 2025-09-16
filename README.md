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