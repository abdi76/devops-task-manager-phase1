# 📚 Task Manager API Documentation - Phase 1

[![API Version](https://img.shields.io/badge/API-v1.0.0-blue.svg)](https://github.com/abdi76/devops-task-manager)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0-orange.svg)](https://swagger.io/specification/)

## 🚀 Overview

The Task Manager API provides a comprehensive RESTful interface for managing tasks and user authentication. Built with FastAPI, it offers **automatic interactive documentation**, robust validation, and enterprise-grade security features.

**🎯 Key Features:**
- **Interactive Documentation:** Auto-generated Swagger UI and ReDoc interfaces
- **JWT Authentication:** Secure token-based authentication system
- **Input Validation:** Automatic request/response validation with Pydantic
- **OpenAPI Compliance:** Full OpenAPI 3.0 specification support
- **Production Ready:** Comprehensive error handling and security practices

**📍 Base URL:** `http://localhost:8000`  
**🔗 Interactive Docs:** `http://localhost:8000/docs` (Swagger UI)  
**📖 Alternative Docs:** `http://localhost:8000/redoc` (ReDoc)  
**📋 OpenAPI Schema:** `http://localhost:8000/openapi.json`

## 🎯 FastAPI Advantages

One of the key benefits of using FastAPI is its **automatic API documentation generation**. This demonstrates modern development practices and provides several professional advantages:

- **Swagger UI Integration:** Interactive testing interface at `/docs`
- **ReDoc Interface:** Clean, professional documentation at `/redoc`
- **OpenAPI Schema:** Machine-readable API specification
- **Type Safety:** Automatic validation based on Python type hints
- **Performance:** High-performance async framework

## 🚀 Quick Start

### 1. Start the Application
```bash
# Start all services
docker-compose up --build

# Verify health
curl http://localhost:8000/health
2. Access Interactive Documentation
Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc
3. Basic API Usage
Copy# Register a new user
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'

# Response: {"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...", "token_type": "bearer"}

# Create a task with the token
curl -X POST "http://localhost:8000/api/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Complete API documentation",
    "description": "Write comprehensive API docs for Phase 1",
    "priority": "high"
  }'
🔐 Authentication
The API uses JWT (JSON Web Token) authentication with Bearer token authorization.

Authentication Flow
Register or Login to receive a JWT access token
Include token in subsequent requests: Authorization: Bearer <token>
Token expires after 24 hours (configurable)
Security Features
Password Hashing: bcrypt with salt for secure password storage
Token Signing: HS256 algorithm with configurable secret
Input Validation: Comprehensive validation on all endpoints
CORS Configuration: Properly configured for frontend integration
📖 API Endpoints
🏥 Health Check
GET /health
Check API health and readiness status.

Response (200 OK):

Copy{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
Example:

Copycurl -X GET "http://localhost:8000/health"
🔐 Authentication Endpoints
POST /api/auth/register
Register a new user account.

Request Body:

Copy{
  "username": "string",
  "email": "string",
  "password": "string"
}
Validation Rules:

username: 3-50 characters, alphanumeric and underscores
email: Valid email format
password: Minimum 8 characters
Response (201 Created):

Copy{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
Error Responses:

400 Bad Request: Username or email already exists
422 Unprocessable Entity: Invalid input data
Example:

Copycurl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_smith",
    "email": "jane@example.com",
    "password": "mypassword123"
  }'
POST /api/auth/login
Authenticate existing user and return access token.

Request Body:

Copy{
  "username": "string",
  "password": "string"
}
Response (200 OK):

Copy{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
Error Responses:

401 Unauthorized: Invalid credentials
422 Unprocessable Entity: Invalid input data
Example:

Copycurl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_smith",
    "password": "mypassword123"
  }'
📝 Task Management Endpoints
Authentication Required: All task endpoints require JWT token in Authorization: Bearer <token> header.

GET /api/tasks
Retrieve all tasks for the authenticated user.

Headers:

Authorization: Bearer <token> (required)
Response (200 OK):

Copy[
  {
    "id": 1,
    "title": "Complete API documentation",
    "description": "Write comprehensive API docs for Phase 1",
    "completed": false,
    "priority": "high",
    "due_date": "2024-01-20T23:59:59.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "owner_id": 1
  }
]
Example:

Copycurl -X GET "http://localhost:8000/api/tasks" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
POST /api/tasks
Create a new task for the authenticated user.

Headers:

Authorization: Bearer <token> (required)
Request Body:

Copy{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high",
  "due_date": "2024-01-20T23:59:59.000Z"
}
Field Details:

title: Required, 1-200 characters
description: Optional, max 1000 characters
priority: Optional, default "medium"
due_date: Optional, ISO 8601 datetime format
Response (201 Created):

Copy{
  "id": 1,
  "title": "Complete API documentation",
  "description": "Write comprehensive API docs for Phase 1",
  "completed": false,
  "priority": "high",
  "due_date": "2024-01-20T23:59:59.000Z",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z",
  "owner_id": 1
}
Example:

Copycurl -X POST "http://localhost:8000/api/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Deploy to staging",
    "description": "Deploy application to staging environment",
    "priority": "high",
    "due_date": "2024-01-18T17:00:00.000Z"
  }'
PUT /api/tasks/{task_id}
Update an existing task.

Headers:

Authorization: Bearer <token> (required)
Path Parameters:

task_id (integer): The ID of the task to update
Request Body:

Copy{
  "title": "string",
  "description": "string",
  "completed": true,
  "priority": "low|medium|high",
  "due_date": "2024-01-20T23:59:59.000Z"
}
Response (200 OK):

Copy{
  "id": 1,
  "title": "Complete API documentation - Updated",
  "description": "Write comprehensive API docs for Phase 1",
  "completed": true,
  "priority": "high",
  "due_date": "2024-01-20T23:59:59.000Z",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T14:45:00.000Z",
  "owner_id": 1
}
Example:

Copycurl -X PUT "http://localhost:8000/api/tasks/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "completed": true,
    "priority": "low"
  }'
DELETE /api/tasks/{task_id}
Delete a specific task.

Headers:

Authorization: Bearer <token> (required)
Path Parameters:

task_id (integer): The ID of the task to delete
Response (204 No Content): No response body.

Example:

Copycurl -X DELETE "http://localhost:8000/api/tasks/1" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
📊 Data Models
User Model
Copy{
  "id": "integer",
  "username": "string",
  "email": "string",
  "created_at": "datetime",
  "is_active": "boolean"
}
Task Model
Copy{
  "id": "integer",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "priority": "string",
  "due_date": "datetime",
  "created_at": "datetime",
  "updated_at": "datetime",
  "owner_id": "integer"
}
Token Response Model
Copy{
  "access_token": "string",
  "token_type": "string"
}
🧪 Testing Examples
Using Python requests
Copyimport requests

base_url = "http://localhost:8000"

# Register user
response = requests.post(f"{base_url}/api/auth/register", json={
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
})
token = response.json()["access_token"]

# Create task
headers = {"Authorization": f"Bearer {token}"}
task_response = requests.post(f"{base_url}/api/tasks", 
    headers=headers,
    json={
        "title": "Python API Test",
        "description": "Testing API with Python",
        "priority": "medium"
    }
)
print(task_response.json())
Using JavaScript/Axios
Copyconst axios = require('axios');

const baseURL = 'http://localhost:8000';

// Register user and get token
const registerUser = async () => {
  const response = await axios.post(`${baseURL}/api/auth/register`, {
    username: 'testuser',
    email: 'test@example.com',
    password: 'testpass123'
  });
  return response.data.access_token;
};

// Create task
const createTask = async (token) => {
  const response = await axios.post(`${baseURL}/api/tasks`, {
    title: 'JavaScript API Test',
    description: 'Testing API with JavaScript',
    priority: 'high'
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

// Usage
registerUser()
  .then(token => createTask(token))
  .then(task => console.log('Created task:', task))
  .catch(error => console.error('Error:', error));
🚨 Error Handling
Standard Error Response Format
Copy{
  "detail": "Error message describing what went wrong"
}
HTTP Status Codes
Status	Meaning	Example
200	OK	Request successful
201	Created	Resource created successfully
204	No Content	Resource deleted successfully
400	Bad Request	Username already exists
401	Unauthorized	Invalid credentials/token
404	Not Found	Task not found
422	Unprocessable Entity	Invalid input data
500	Internal Server Error	Server error
🔒 Security Considerations
Authentication Security
Password Hashing: bcrypt with salt rounds
JWT Tokens: HS256 algorithm with configurable secret
Token Expiration: 24-hour token lifetime
Input Validation: Comprehensive validation on all endpoints
API Security
CORS Configuration: Properly configured for frontend integration
SQL Injection Prevention: SQLAlchemy ORM usage
Request Validation: Pydantic models for all requests
Error Handling: Secure error messages without sensitive data
📈 Performance Metrics
Health Check: < 50ms response time
Authentication: < 200ms response time
Task Operations: < 150ms response time
Database Queries: < 100ms response time
📚 Additional Resources
Interactive Documentation
Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc
OpenAPI Schema: http://localhost:8000/openapi.json
Development Tools
FastAPI Documentation: https://fastapi.tiangolo.com/
JWT Debugger: https://jwt.io/
API Testing: Use the built-in Swagger UI for interactive testing
Support
GitHub Repository: https://github.com/abdi76/devops-task-manager
Issues: Submit issues and feature requests via GitHub
📞 Contact
Abdi76 - DevOps Engineer
📧 Email: your-email@example.com
💼 LinkedIn: linkedin.com/in/abdi76
🔗 GitHub: github.com/abdi76

Last Updated: January 15, 2024
API Version: v1.0.0
FastAPI Version: 0.104.1

🎉 Phase 1 API Complete! Professional REST API with automatic documentation, comprehensive validation, and enterprise-grade security practices. Ready for Phase 2 cloud deployment!
