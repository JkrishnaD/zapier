
# Automation Tool

  

This project is an automation tool similar to Zapier, offering one trigger (`webhook`) and two actions (`email(Resend)` and `send-solana`). The project is organized as a monorepo using the Turborepo framework with Next.js for the frontend and several microservices for backend operations.

  

## Project Structure

  

The repository is divided into two main folders: `apps` and `packages`.

  

### Apps

  

The `apps` folder contains the core application services:

  

1. **backend**:

  

- Contains backend logic written in Express.

- Provides the main server-side functionalities.

  

2. **hooks**:

  

- Acts as a server that gets triggered by webhooks.

- Receives data whenever a zap is activated and logs the data to the database.

  

3. **processor**:

  

- Contains logic for setting up a local Kafka instance using Docker.

- Handles Kafka producer logic, receiving data from the hooks and producing messages in the Kafka server.

  

4. **worker**:

  

- Contains the Kafka consumer logic.

- Consumes data produced in the `zap-events` topic by the Kafka producer. Based on this data, it processes tasks to send emails and initiate Solana transactions.

  

5. **web**:

- The frontend for the application, built with Next.js.

- Allows users to log in, view created zaps, and create new zaps.

  

### Packages

  

The `packages` folder contains shared resources, primarily focused on the database:

  

- **database**:

- Contains the Prisma schema for defining and interacting with the database.

- Configured to run PostgreSQL locally using Docker.

- **Seeding**: To populate the database with initial data, use the following Prisma commands

```bash
npx primsa migrate dev
```

```bash
npx primsa generate
```
```
npx prisma db seed
```

  

## Getting Started

  

### Prerequisites

  

- **Node.js**: Make sure Node.js is installed.

- **Docker**: Ensure Docker is installed for setting up Kafka and PostgreSQL locally.

  

### Installation

  

1. Clone the repository.

2. Navigate to the root directory and install dependencies:

  

```bash
npm  install
```

  

3. To run the database locally using docker use the command:

  

```bash
docker  run  -p  5432:5432  -e  POSTGRES_PASSWORD=mysecretpassword  -d  postgres
```

  

4. after running the postgres locally add the this line in the `.env` file of the `package/db` folder

  

```
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
```

  

5. To run Kafka locally, use:

  

```bash
docker  run  -p  9092:9092  -d  apache/kafka:3.7.1
```

  

6. To create a topic inside your kafka server run these commands in cli commands
```bash
docker  ps
```

  

```bash
docker  exec  -it  container_id  /bin/bash
cd  /opt/kafka/bin
```

  

7. To create a Kafka topic named `zap-events`, use:

  

```bash
/kafka-topics.sh  --create  --topic  zap-events  --bootstrap-server  localhost:9092
```

  

8. To consume events from the `zap-events` topic, use:

  

```bash
/kafka-console-consumer.sh  --topic  zap-events  --bootstrap-server  localhost:9092
```

  

after installing the packages by going into each folder and run :
```
npm run dev
```
this command will start the each microserveice
  

### Webhook Structure
This document outlines the requirements for webhook data and how to use it.

If our webhook is triggered with following data format:

```json
{
"comment": {
"email": "user@example.com",
"address": "reciever public address",
"amount": "sol"
}}
```
then in the email and address inputs for the actions should be in the following form :
``` json
{comment.email},
{comment.address},
{comment.amount}
```