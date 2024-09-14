# Employee-Management-System

![Macbook-Air-localhost (3)](https://github.com/user-attachments/assets/6397f111-56c5-475f-9b58-e6d12a95d874)


A Developed fundamental employee management web application. The application allows the company to manage employee and department data digitally, providing a foundation for future features like project management. Packaged the entire application using Docker to ensure consistency across different environments and simplify deployment.

## Features

- Add, update, and delete employees.
- Add, update, and delete departments.
- RESTful API built with Node.js and Express.
- Frontend built with React.
- MongoDB used for storing data.
- Dockerized for easy setup and deployment.

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Project Structure
    Employee-Management-System
    ├─ Backend
    │  ├─ .dockerignore
    │  ├─ .env
    │  ├─ .gitignore
    │  ├─ config
    │  │  └─ db.js
    │  ├─ controllers
    │  │  ├─ departmentController.js
    │  │  └─ employeeController.js
    │  ├─ Dockerfile
    │  ├─ index.js
    │  ├─ models
    │  │  ├─ Department.js
    │  │  └─ Employee.js
    │  ├─ package-lock.json
    │  ├─ package.json
    │  └─ routes
    │     ├─ departments.js
    │     └─ employees.js
    ├─ Frontend
    │  ├─ .dockerignore
    │  ├─ .env
    │  ├─ .gitignore
    │  ├─ Dockerfile
    │  ├─ package-lock.json
    │  ├─ package.json
    │  ├─ public
    │  │  ├─ index.html
    │  │  ├─ manifest.json
    │  │  └─ robots.txt
    │  └─ src
    │     ├─ App.css
    │     ├─ App.js
    │     ├─ App.test.js
    │     ├─ Components
    │     │  ├─ ButtonSet.js
    │     │  ├─ Dropdown.js
    │     │  ├─ Forms.js
    │     │  └─ Table.js
    │     ├─ Hooks
    │     │  └─ useReq.js
    │     ├─ index.css
    │     ├─ index.js
    │     ├─ reportWebVitals.js
    │     └─ setupTests.js
    ├─ .gitignore
    ├─ docker-compose.yml
    └─ README.md

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (if running locally)

### Running the Project with Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/AshanSalinda/Employee-Management-System.git
   cd Employee-Management-System

2. Build and run the Docker containers:
    ```bash
    docker-compose up --build
3. Open the frontend app in your browser:
    ```
    http://localhost:3000
4. The backend API will be available at:
    ```
    http://localhost:5000
### Running the Project Locally (without Docker)

1. Clone the repository:
    ```
    git clone https://github.com/your-username/employee-management-system.git
  	cd employee-management-system
2. Install dependencies for both frontend and backend:
    ```
    cd Backend
    npm install
    cd ../Frontend
    npm install
3. Start the backend server:
    ```
    cd Backend
  	npm start
4. Start the frontend app:
    ```
    cd Frontend
    npm start
5. Open the frontend in your browser at:
     ```
     http://localhost:3000
## API Endpoints
- **GET** /employees: Get a list of all employees.
- **POST** /employees: Add a new employee.
- **PUT** /employees/:id: Update an existing employee.
- **DELETE** /employees/:ids: Delete employees by id.
- **GET** /departments: Get a list of all departments.
- **POST** /departments: Add a new department.
- **PUT** /departments/:id: Update an existing department.
- **DELETE** /departments/:ids: Delete departments by id.
