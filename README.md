# Quiz App

## Overview
Quiz App is a quiz application built with Node.js and Express. It provides an API for creating and managing quiz questions and answers, allowing users to test their knowledge. The application is also containerized with Docker, making deployment straightforward.

## Features
- **API-based Quiz Management**: Create and fetch quiz questions, answer them and check the Result.
- **Validation and Security**: Uses Express Validator for request validation and Helmet for security enhancements.
- **Compression**: Uses gzip compression for improved performance.
- **Logging and Rate Limiting**: Integrated with Morgan for logging and Express Rate Limit for basic rate limiting.
- **Docker Support**: Easily deployable with Docker and Docker Compose.
- **API Tests**: All API endpoints tested for correct responses, error handling, and data validation using **Supertest**.
- **Service Functions Tests**: Comprehensive testing of all service functions using **Jest** to ensure they perform as expected.

## Prerequisites
- **Node.js** (v18 or above)
- **Docker** (if running in a container)

## Installation

git clone https://github.com/akshayshikre/quiz-app.git

cd quiz-app-master

1. Via Shell-Docker file:
    ```bash
    chmod +x run.sh
    bash run.sh
2. Via Docker
    ```Docker
    #Build, Run in Detached mode
    docker-compose up --build -d
    #Check logs
    docker-compose logs --tail 10 -f
    #Run npm tests (We already do it while starting container- Check docker-compose.yml file)
    docker container exec quiz-app-container npm test
    #Access morgan Logs
    docker container exec quiz-app-container tail -f logs/access.log 
3. Via Node
    ```node
    npm i
    npm test
    npm start

## Running Tests
The application includes comprehensive tests to ensure functionality and reliability.

### Testing Frameworks
- **Jest**: Used for running unit tests and assertions.
- **Supertest**: Used for testing HTTP endpoints and ensuring API functionality.

### API Tests
All API endpoints have been tested to verify correct responses, error handling, and data validation.

### Service Functions Tests
All service functions are thoroughly tested to ensure they perform as expected.

### To run tests, use the following command:
```bash
   npm test
 ```

### API Documentation

Base URL
Local: http://localhost:3000/api

1. Create Quiz
- Endpoint: POST /api/quizzes
- Description: Creates a new quiz with a set of questions.
- Curl Command:
  ```bash
  curl -X POST http://localhost:3000/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Sample Quiz Title",
        "questions": [
          {
            "text": "What is the capital of India?",
            "options": ["Mumbai", "Delhi", "Kashmir", "Pune"],
            "correct_option": 1
          },
          {
            "text": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin", "Madrid"],
            "correct_option": 0
          }
        ]
      }'
   ```
2. Get Quiz by ID
- Endpoint: GET /api/quizzes/:quizId
- Description: Fetches a quiz by its ID without revealing the correct answers.
- Curl Command:
  ```bash
   curl -X GET http://localhost:3000/api/quizzes/<quizId> \
   -H "Content-Type: application/json"
   #Replace <quizId> with the actual ID of the quiz.
  ```

3. Submit Answer to a Quiz Question
- Endpoint: POST /api/quizzes/:quizId/questions/:questionId/submit-answer
- Description: Submits an answer for a specific question in a quiz.
- Curl Command:
  ```bash
   curl -X POST http://localhost:3000/api/quizzes/<quizId>/questions/<questionId>/submit-answer \
   -H "Content-Type: application/json" \
   -d '{
        "selectedOption": 1
      }'
   #Replace <quizId> and <questionId> with the actual IDs of the quiz and question.
  ```
4. Get Quiz Results for a User
- Endpoint: GET /api/quizzes/:quizId/results/:userId
- Description: Fetches the user's results for a specific quiz.
- Curl Command:
  ```bash
   curl -X GET http://localhost:3000/api/quizzes/<quizId>/results/<userId> \
   -H "Content-Type: application/json"
   #Replace <quizId> and <userId> with the actual IDs of the quiz and the user.
  ```
