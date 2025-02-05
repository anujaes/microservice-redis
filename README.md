# microservice-redis

## Overview
This repository demonstrates **Redis-based inter-service communication** between two microservices using Redis as a **message queue**. The two servers exchange messages asynchronously through Redis, simulating a simple event-driven architecture.

## How It Works
1. **Producer Service** – Sends messages to a Redis queue.
2. **Consumer Service** – Listens for messages and processes them in real-time.
3. **Redis Queue** – Acts as the message broker for communication.

## Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v16 or later)
- **Redis** (via Docker, local installation, or cloud service)
- **npm** (Node Package Manager)

## Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/microservice-redis.git
cd microservice-redis
```

### 2️⃣ Install Dependencies
Each microservice runs independently. Navigate to each service folder and install dependencies:
```sh
cd server-one
npm install

cd ../server-two
npm install
```

### 3️⃣ Set Up Redis
You can run Redis in multiple ways:
- **Using Docker** (Recommended)  
  ```sh
  docker run --name redis -d -p 6379:6379 redis
  ```
- **Local Installation** (Download from [Redis.io](https://redis.io/docs/getting-started/))
- **Cloud-based Redis** (AWS ElastiCache, Redis Cloud, etc.) – Update the connection string in the `.env` file.

### 4️⃣ Start the Servers
Run each server separately:
```sh
cd server-one
npm run dev
```
```sh
cd server-two
npm run dev
```

### 5️⃣ Send a Message (Test with cURL)
Use the following **cURL command** to send a message:
```sh
curl --location 'http://localhost:5001/server-one/produce-message' \
--header 'Content-Type: application/json' \
--data '{
    "testing" : "This is a testing message 10"
}'
```

#### **Expected Output**
- The producer service will enqueue the message.
- The consumer service will receive and log it.

## Environment Variables
Create a `.env` file in both **server-one** and **server-two** directories and add the following:
```
REDIS_HOST=localhost
REDIS_PORT=6379
```
If using cloud Redis, update the `REDIS_HOST` and add authentication credentials if required.

## Tech Stack
- **Node.js** (Microservices)
- **Redis** (Message Queue)
- **BullMQ** (Job Management)
- **Docker** (Optional for Redis)

## Use Cases
✅ **Event-Driven Architectures**  
✅ **Decoupled Microservices**  
✅ **Background Job Processing**  
✅ **Scalable Message Queues**  

## Contributing
Feel free to fork this repository and submit a pull request if you have improvements or additional features to add.

## License
This project is licensed under the MIT License.

---

🚀 **Happy Coding!** If you have any questions, feel free to reach out!