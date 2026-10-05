## 1. User Registration

| Field         | Value                   |
| ------------- | ----------------------- |
| Endpoint      | POST /api/auth/register |
| Status Code   | 201 Created             |
| Response Time | 291ms                   |

### Request:
```text
{
    "username": "post_man",
    "email": "postman@test.com",
    "password": "Password"
}
```
### Result: ✅ Passed

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
### Result: ✅ Passed

## 2. User Login
| Field         | Value                |
| ------------- | -------------------- |
| Endpoint      | POST /api/auth/login |
| Status Code   | 200 OK               |
| Response Time | 173ms                |

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
### Result: ✅  Passed

## 3. Get All Tasks (Protected)

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/tasks                |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 83ms                          |

### Response:
```
[]
```
Empty Array with no tasks.

### Result: ✅  Passed

## 4. Create Task

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/tasks                |
| Header        | Authorization: Bearer {token} |
| Status Code   | 201 Created                   |
| Response Time | 94ms                          |

### Request:
```text
{
  "title": "Complete project report",
  "priority": "high",
  "difficulty": "hard",
  "due_date": "2026-04-14"
}
```

### Response:
```text
{
    "points_earned": 0,
    "id": 42,
    "user_id": 32,
    "title": "Complete project report",
    "description": null,
    "priority": "high",
    "difficulty": "hard",
    "due_date": "2026-04-14T04:00:00.000Z",
    "points_worth": 100,
    "completed": false,
    "updatedAt": "2026-04-10T20:42:23.160Z",
    "createdAt": "2026-04-10T20:42:23.160Z",
    "completed_at": null
}
```
Points Calculation: Priority x Difficulty = Points Worth
| Priority  | Difficulty | Points Worth |
| --------- | ---------- | ------------ |
| High (50) | Hard (2)   | 100          |

### Result: ✅ Passed

## 5. Get A Single Task

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/tasks/42             |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 194ms                         |

### Response:

```text
{
    "id": 42,
    "user_id": 32,
    "title": "Complete project report",
    "description": null,
    "priority": "high",
    "difficulty": "hard",
    "due_date": "2026-04-14T04:00:00.000Z",
    "completed": false,
    "completed_at": null,
    "points_worth": 100,
    "points_earned": 0,
    "createdAt": "2026-04-10T20:42:23.160Z",
    "updatedAt": "2026-04-10T20:42:23.160Z"
}
```
### Result: ✅ Passed

## 6. Complete A Task
| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | POST /api/tasks/42/complete   |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 152ms                         |

### Response:

```text
{
    "success": true,
    "message": "Task completed, points awarded, and pet happiness increased",
    "points_earned": 100,
    "points_worth": 100,
    "total_points": 200,
    "pet_happiness": 55,
    "task": {
        "id": 42,
        "completed": true,
        "points_earned": 100
    }
}
```
### Result: ✅ Passed

## 7. Get Pet

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/pet                  |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 89ms                          |

### Response:
```text
{
    "id": 25,
    "user_id": 32,
    "name": "Princess",
    "type": "dog",
    "level": 1,
    "experience": 0,
    "happiness": 55,
    "hunger": 50,
    "energy": 50,
    "last_interaction": "2026-04-10T22:29:13.848Z",
    "createdAt": "2026-04-10T00:54:55.158Z",
    "updatedAt": "2026-04-10T22:29:13.848Z"
}
```

### Result: ✅ Passed

## 8. Get Shop Items

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/shop/items           |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 76ms                          |

### Response:
```text
[
    {
        "id": 1,
        "name": "Premium Pet Food",
        "description": "Delicious meal",
        "item_type": "food",
        "effect_type": "hunger",
        "effect_value": 30,
        "cost_points": 20,
        "rarity": "common",
        "image_url": null
    },
    {
        "id": 2,
        "name": "Bouncy Ball",
        "description": "Fun toy",
        "item_type": "toy",
        "effect_type": "happiness",
        "effect_value": 25,
        "cost_points": 35,
        "rarity": "uncommon",
        "image_url": null
    },
    {
        "id": 13,
        "name": "Gourmet Feast",
        "description": "A luxurious meal that satisfies hunger completely",
        "item_type": "food",
        "effect_type": "hunger",
        "effect_value": 50,
        "cost_points": 45,
        "rarity": "rare",
        "image_url": null
    },
    {
        "id": 14,
        "name": "Energy Snack",
        "description": "Quick energy boost for your pet",
        "item_type": "food",
        "effect_type": "energy",
        "effect_value": 25,
        "cost_points": 30,
        "rarity": "uncommon",
        "image_url": null
    },
    {
        "id": 15,
        "name": "Healthy Treat",
        "description": "Nutritious snack that boosts happiness",
        "item_type": "food",
        "effect_type": "happiness",
        "effect_value": 20,
        "cost_points": 25,
        "rarity": "common",
        "image_url": null
    },
    {
        "id": 16,
        "name": "Squeaky Mouse",
        "description": "Irresistible toy for cats",
        "item_type": "toy",
        "effect_type": "happiness",
        "effect_value": 30,
        "cost_points": 40,
        "rarity": "uncommon",
        "image_url": null
    },
    {
        "id": 17,
        "name": "Flying Disc",
        "description": "Perfect for active dogs",
        "item_type": "toy",
        "effect_type": "happiness",
        "effect_value": 35,
        "cost_points": 50,
        "rarity": "rare",
        "image_url": null
    },
    {
        "id": 18,
        "name": "Puzzle Feeder",
        "description": "Mental stimulation toy",
        "item_type": "toy",
        "effect_type": "happiness",
        "effect_value": 20,
        "cost_points": 55,
        "rarity": "rare",
        "image_url": null
    },
    {
        "id": 19,
        "name": "Rainbow Scarf",
        "description": "Colorful accessory for any pet",
        "item_type": "accessory",
        "effect_type": "cosmetic",
        "effect_value": 0,
        "cost_points": 60,
        "rarity": "uncommon",
        "image_url": null
    },
    {
        "id": 20,
        "name": "Magic Cape",
        "description": "Makes your pet look heroic",
        "item_type": "accessory",
        "effect_type": "cosmetic",
        "effect_value": 0,
        "cost_points": 120,
        "rarity": "epic",
        "image_url": null
    },
    {
        "id": 21,
        "name": "Sparkly Collar",
        "description": "Shiny accessory that boosts mood",
        "item_type": "accessory",
        "effect_type": "happiness",
        "effect_value": 10,
        "cost_points": 45,
        "rarity": "rare",
        "image_url": null
    },
    {
        "id": 22,
        "name": "Super Elixir",
        "description": "Restores all stats by 20",
        "item_type": "consumable",
        "effect_type": "all",
        "effect_value": 20,
        "cost_points": 80,
        "rarity": "epic",
        "image_url": null
    },
    {
        "id": 23,
        "name": "Happiness Potion",
        "description": "Instantly boosts happiness",
        "item_type": "consumable",
        "effect_type": "happiness",
        "effect_value": 40,
        "cost_points": 50,
        "rarity": "rare",
        "image_url": null
    },
    {
        "id": 24,
        "name": "Energy Drink",
        "description": "Restores 50 energy",
        "item_type": "consumable",
        "effect_type": "energy",
        "effect_value": 50,
        "cost_points": 45,
        "rarity": "uncommon",
        "image_url": null
    },
    {
        "id": 25,
        "name": "Legendary Feast",
        "description": "A meal fit for a champion",
        "item_type": "food",
        "effect_type": "all",
        "effect_value": 40,
        "cost_points": 100,
        "rarity": "legendary",
        "image_url": null
    },
    {
        "id": 26,
        "name": "Laser Pointer",
        "description": "Hours of entertainment",
        "item_type": "toy",
        "effect_type": "happiness",
        "effect_value": 45,
        "cost_points": 65,
        "rarity": "rare",
        "image_url": null
    },
    {
        "id": 27,
        "name": "Golden Crown",
        "description": "Royal accessory",
        "item_type": "accessory",
        "effect_type": "cosmetic",
        "effect_value": 0,
        "cost_points": 200,
        "rarity": "legendary",
        "image_url": null
    },
    {
        "id": 28,
        "name": "Mystery Box",
        "description": "Surprise effect!",
        "item_type": "consumable",
        "effect_type": "random",
        "effect_value": 0,
        "cost_points": 75,
        "rarity": "epic",
        "image_url": null
    }
]
```

### Result: ✅ Passed

## 9. Purchase Item

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/shop/purchase        |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 179ms                         |

### Request:
```text
{"itemId": 1}
```

### Response:
```text
{
    "message": "Item purchased successfully",
    "user": {
        "id": 32,
        "username": "post_man",
        "email": "postman@test.com",
        "password_hash": "$2b$10$2/qgw....",
        "points": 115,
        "level": 1,
        "streak_days": 0,
        "createdAt": "2026-04-10T00:54:55.153Z",
        "updatedAt": "2026-04-10T18:46:32.417Z"
    }
}
```
### Result: ✅ Passed

## 11. Get User inventory

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/shop/inventory       |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 159ms                         |

### Response:
```text
[
    {
        "id": 11,
        "user_id": 32,
        "item_id": 1,
        "quantity": 1,
        "purchased_at": "2026-04-10T22:46:32.423Z",
        "ShopItem": {
            "id": 1,
            "name": "Premium Pet Food",
            "description": "Delicious meal",
            "item_type": "food",
            "effect_type": "hunger",
            "effect_value": 30,
            "cost_points": 20,
            "rarity": "common",
            "image_url": null
        }
    }
]
```

### Result: ✅ Passed

## 12. Get Achievements

| Field         | Value                          |
| ------------- | ------------------------------ |
| Endpoint      | GET /api/achievements/progress |
| Header        | Authorization: Bearer {token}  |
| Status Code   | 200 OK                         |
| Response Time | 159ms                          |

### Response:

```text
[
    {
        "id": 5,
        "name": "First Step",
        "description": "Complete your first task",
        "criteria_type": "tasks_completed",
        "criteria_value": 1,
        "reward_points": 10,
        "badge_image_url": null,
        "earned": true,
        "current_value": 1,
        "progress_percent": 100
    },
    {
        "id": 6,
        "name": "Task Master",
        "description": "Complete 10 tasks",
        "criteria_type": "tasks_completed",
        "criteria_value": 10,
        "reward_points": 50,
        "badge_image_url": null,
        "earned": false,
        "current_value": 1,
        "progress_percent": 10
    },
    {
        "id": 7,
        "name": "Productivity Guru",
        "description": "Complete 50 tasks",
        "criteria_type": "tasks_completed",
        "criteria_value": 50,
        "reward_points": 200,
        "badge_image_url": null,
        "earned": false,
        "current_value": 1,
        "progress_percent": 2
    },
    {
        "id": 8,
        "name": "Point Collector",
        "description": "Earn 100 points",
        "criteria_type": "points_earned",
        "criteria_value": 100,
        "reward_points": 25,
        "badge_image_url": null,
        "earned": true,
        "current_value": 115,
        "progress_percent": 100
    },
    {
        "id": 9,
        "name": "Point Millionaire",
        "description": "Earn 1000 points",
        "criteria_type": "points_earned",
        "criteria_value": 1000,
        "reward_points": 100,
        "badge_image_url": null,
        "earned": false,
        "current_value": 115,
        "progress_percent": 11
    },
    {
        "id": 10,
        "name": "Weekly Warrior",
        "description": "Maintain a 7-day streak",
        "criteria_type": "streak_days",
        "criteria_value": 7,
        "reward_points": 75,
        "badge_image_url": null,
        "earned": false,
        "current_value": 0,
        "progress_percent": 0
    },
    {
        "id": 11,
        "name": "Monthly Champion",
        "description": "Maintain a 30-day streak",
        "criteria_type": "streak_days",
        "criteria_value": 30,
        "reward_points": 200,
        "badge_image_url": null,
        "earned": false,
        "current_value": 0,
        "progress_percent": 0
    },
    {
        "id": 12,
        "name": "Pet Lover",
        "description": "Reach pet level 5",
        "criteria_type": "pet_level",
        "criteria_value": 5,
        "reward_points": 50,
        "badge_image_url": null,
        "earned": false,
        "current_value": 1,
        "progress_percent": 20
    },
    {
        "id": 13,
        "name": "Pet Master",
        "description": "Reach pet level 10",
        "criteria_type": "pet_level",
        "criteria_value": 10,
        "reward_points": 100,
        "badge_image_url": null,
        "earned": false,
        "current_value": 1,
        "progress_percent": 10
    }
]
```

### Result: ✅ Passed

## 13. Get User Achievements

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | GET /api/achievements/user    |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 273ms                         |

### Response:

```text
[
    {
        "id": 5,
        "user_id": 32,
        "achievement_id": 5,
        "earned_at": "2026-04-10T22:29:13.911Z",
        "achievementId": 5,
        "Achievement": {
            "id": 5,
            "name": "First Step",
            "description": "Complete your first task",
            "criteria_type": "tasks_completed",
            "criteria_value": 1,
            "reward_points": 10,
            "badge_image_url": null
        }
    },
    {
        "id": 6,
        "user_id": 32,
        "achievement_id": 8,
        "earned_at": "2026-04-10T22:29:13.919Z",
        "achievementId": 8,
        "Achievement": {
            "id": 8,
            "name": "Point Collector",
            "description": "Earn 100 points",
            "criteria_type": "points_earned",
            "criteria_value": 100,
            "reward_points": 25,
            "badge_image_url": null
        }
    }
]
```

### Result: ✅ Passed

## 14. Use Item on Pet

| Field         | Value                         |
| ------------- | ----------------------------- |
| Endpoint      | POST /api/pet/use-item        |
| Header        | Authorization: Bearer {token} |
| Status Code   | 200 OK                        |
| Response Time | 203ms                         |

### Request:
```text
{"inventoryId": 11}
```

### Response:
```text
{
    "message": "Premium Pet Food used!",
    "pet": {
        "id": 25,
        "user_id": 32,
        "name": "Princess",
        "type": "dog",
        "level": 1,
        "experience": 0,
        "happiness": 55,
        "hunger": 20,
        "energy": 50,
        "last_interaction": "2026-04-10T19:51:30.775Z",
        "createdAt": "2026-04-10T00:54:55.158Z",
        "updatedAt": "2026-04-10T19:51:30.776Z"
    }
}
```

### Result: ✅ Passed

## 15. API Health

| Field         | Value           |
| ------------- | --------------- |
| Endpoint      | GET /api/health |
| Status Code   | 200 OK          |
| Response Time | 70ms            |

### Response:

```
{
    "status": "ok",
    "message": "MotivateMate API is running!"
}
```

### Result: ✅ Passed
