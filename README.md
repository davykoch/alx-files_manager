# File Management API

This project is a simple file management platform built as a summary of back-end development concepts including authentication, NodeJS, MongoDB, Redis, pagination, and background processing.

## Features

- User authentication via token
- List all files
- Upload new files
- Change file permissions
- View files
- Generate thumbnails for images (background process)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Redis
- Bull (for background processing)

## Project Objectives

This project demonstrates:

1. Creating an API with Express
2. Implementing user authentication
3. Storing data in MongoDB
4. Using Redis for temporary data storage
5. Setting up and using a background worker

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Redis

### Installation

1. Clone the repository:
git clone https://github.com/davykoch/file-management-api.git

2. Install dependencies:
cd file-management-api
npm install

3. Set up environment variables (create a `.env` file in the root directory):
PORT=3000
MONGODB_URI=mongodb://localhost:27017/file_management
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret

4. Start the server:
npm start

## API Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and receive an authentication token
- `GET /files`: List all files (requires authentication)
- `POST /files`: Upload a new file (requires authentication)
- `PUT /files/:id/permissions`: Change file permissions (requires authentication)
- `GET /files/:id`: View a file (requires authentication)

## Background Processing

This project uses Bull for background processing to generate thumbnails for uploaded image files.

## Contributing

This project is for learning purposes. Feel free to fork and extend it as you like.