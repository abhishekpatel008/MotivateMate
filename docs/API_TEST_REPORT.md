## 1. User Registration

| Field | Value |
|-------|-------|
|Endpoint| POST /api/auth/register|
|Status Code| 201 Created |
| Response Time | 291ms|

### Request:
```text
{
    "username": "post_man",
    "email": "postman@test.com",
    "password": "Password"
}
```

### Response:
```text
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoicG9zdG1hbkB0ZXN0LmNvbSIsImlhdCI6MTc3NTc2ODA5NSwiZXhwIjoxNzc2MzcyODk1fQ.QI_UfdR0FR_MFF2hoUcGN6px4Zg999yU8IG4rRPdNsc",
    "user": {
        "id": 32,
        "username": "post_man",
        "email": "postman@test.com",
        "points": 0,
        "level": 1,
        "streak_days": 0
    },
    "pet": {
        "id": 25,
        "name": "Princess",
        "type": "dog",
        "level": 1,
        "experience": 0,
        "happiness": 50,
        "hunger": 50,
        "energy": 50,
        "last_interaction": "2026-04-10T00:54:55.158Z"
    }
}
```

## 2. User Login
| Field | Value |
|-------|-------|
|Endpoint| POST /api/auth/login|
|Status Code| 200 OK |
| Response Time | 173ms|

### Request:
```text
{
   "identifier" : "post_man",
   "password": "Password"
}
```

### Response:
```text
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoicG9zdG1hbkB0ZXN0LmNvbSIsImlhdCI6MTc3NTc2ODU5NSwiZXhwIjoxNzc2MzczMzk1fQ.m8SgLr7iOFHCx4UjbQN2Nsbjs4UCNcKpn9mXgaH6VhM",
    "user": {
        "id": 32,
        "username": "post_man",
        "email": "postman@test.com",
        "points": 0,
        "level": 1,
        "streak_days": 0
    }
}
```

## 3. Get All Tasks (Protected)

| Field | Value |
|-------|-------|
|Endpoint| GET /api/tasks|
|Header | Bearer {token} |
|Status Code| 200 OK |
| Response Time | 83ms|

### Request:
```text
GET http://localhost:5000/api/tasks
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoicG9zdG1hbkB0ZXN0LmNvbSIsImlhdCI6MTc3NTc2ODU5NSwiZXhwIjoxNzc2MzczMzk1fQ.m8SgLr7iOFHCx4UjbQN2Nsbjs4UCNcKpn9mXgaH6VhM

```

### Response:
```
[]
```
Empty Array with no tasks.

## 4. Create Task
