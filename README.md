# Quiz App

## Overview
Quiz App is a quiz application built with Node.js and Express. It provides an API for creating and managing quiz questions and answers, allowing users to test their knowledge. The application is also containerized with Docker, making deployment straightforward.

## Features
- **API-based Quiz Management**: Create and fetch quiz questions.
- **Validation and Security**: Uses Express Validator for request validation and Helmet for security enhancements.
- **Compression**: Uses gzip compression for improved performance.
- **Logging and Rate Limiting**: Integrated with Morgan for logging and Express Rate Limit for basic rate limiting.
- **Docker Support**: Easily deployable with Docker and Docker Compose.

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


