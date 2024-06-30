## Description

This is a sample application that uses the following:

```
Postgresql (DB)
Prisma (ORM)
NestJS (Backend)
NextJS (Frontend)
Tailwind/DaisyUI (Component styling)
```

## Installation

```bash

Ensure Postgresql is installed

Ensure RabbitMQ service is running (perhaps in docker like below)and configure the appropriate values in .env.local
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management

Ensure the appropriate email server params are set up in .env.local
Ensure the email username and password (as shown in the .env.sample file) are setup in the .env file of the messaging microservice

$ pnpm install
This will install pnpm packages in apps/api-server and apps/webapp

$cd apps/api-server
$cp .env.sample .env
Set your db credentials in .env file
```

## Running the app

```bash
# watch mode
$ pnpm run dev

This will start:
 nextjs server in localhost:3000
 nestjs server in localhost:3001
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
