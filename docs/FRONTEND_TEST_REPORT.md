# Frontend Testing Report - MotivateMate

## 1. Test Environment
| Component       | Version    | Details                                    |
| --------------- | ---------- | ------------------------------------------ |
| Application URL | Production | https://motivatemateapp.onrender.com       |
| Browser         | Chrome 146 | OS Windows 11                              |
| Device          | Desktop    | 1920x1080 Resolution                       |
| Backend API     | Production | https://motivatemate-b7wl.onrender.com/api |

## 2. Authentication
| #   | Test Case              | Steps                                                                                           | Expected Result                                  | Actual Result                | Status |
| --- | ---------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------- | ------ |
| 1   | User Registration      | 1. Navigate to `Register here`<br>2. Enter username, email and password<br> 3. Click `Register` | Ridirect to `Dashboard`, Account and Pet Created | Dashboard Loads With New Pet | ✅ Pass |
| 2   | Duplicate Registartion | 1. Try to register with existing username and email<br>2. Submit form                           | Error message displayed                          | `User already exists` error  | ✅ Pass |
| 3   | User Login             | 1. Navigate to `Login`<br>2. Enter Credentials<br>Click `Login`                                 | Redirect to `Dashboard`, User data loaded        | Dashboard Loads correctly    | ✅ Pass |
| 4   | Invalid Login          | 1. Enter wrong password<br>2. Click `Login`                                                     | Error message Displayed                          | `Invalid credentials` error  | ✅ Pass |

## 3. Task Management
 | #   | Test Case                   | Steps                                                                                                                                                         | Expected Result                        | Actual Result                               | Status |
 | --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------- | ------ |
 | 1   | Create task                 | 1. Click `Add Task`<br>2. Fill title "Test Task"<br>3. Select Priority `High`<br>4. Select Difficulty `Hard`<br>5. Select due date <br>6. Click `Create Task` | Task appears in list                   | Task displayed with points worth            | ✅ Pass |
 | 2   | Create Task - Missing Title | 1. Click `Add Task`<br>2. Leave title empty<br>3. Click `Create Task`                                                                                         | Form validation prevents submission    | Error message: `Please fill out this field` | ✅ Pass |
 | 3   | Complete Task               | 1. Click `Done` on a task<br>2. Observe points increase                                                                                                       | User points increase, pet happiness +5 | Points: +100, Pet Happiness increases       | ✅ Pass |
 | 4   | Already completed Task      | N/A                                                                                                                                                           | `Done` button disabled                 | Button disabled/disappears                  | ✅ Pass |
 | 5   | Edit Task                   | 1. Click `Edit` on a task<br>2. Change Priority to `Urgent`<br>3. Save                                                                                        | Task updated with new points worth     | Points updated from 100 to 150              | ✅ Pass |
 | 6   | Delete Task                 | 1. Click on `Delete` on a task<br>2. Confirm Deletion                                                                                                         | Task removed from list                 | Task disappears from Dashboard              | ✅ Pass |

 ## 4. Pet System
| #   | Test Case      | Steps                                                            | Expected Result                                 | Actual Result       | Status |
| --- | -------------- | ---------------------------------------------------------------- | ----------------------------------------------- | ------------------- | ------ |
| 1   | View Pet Stats | 1. Load Dashboard                                                | Visible Hunger, Happiness and Energy bar with % | All bars visible    | ✅ Pass |
| 2   | Use Food Item  | 1. Click **Food** item in inventory<br>2. Observe Hunger stats   | Hunger decreases by item value                  | Hunger: 80  → 50    | ✅ Pass |
| 3   | Use Toy Item   | 1. Click **Toy** item in inventory<br>2. Observe Happiness stats | Happiness increases by item value               | Happiness: 50  → 75 | ✅ Pass |


## 5. Shop Inventory
| #   | Test Case                           | Steps                                            | Expected Result                    | Actual Result                                         | Status |
| --- | ----------------------------------- | ------------------------------------------------ | ---------------------------------- | ----------------------------------------------------- | ------ |
| 1   | Open Shop                           | 1. Click on `Shop` button                        | Modal opens with all items         | 18 items displayed                                    | ✅ Pass |
| 2   | Purchase Item - Enough Points       | 1. Click `Button` on item (20 pts)<br>2. Confirm | Points Deducted, Item in Inventory | User points: -20, Inventory shows item                | ✅ Pass |
| 3   | Purchase Item - Insufficient Points | 1. Scroll to an expensive itme                   | Button disabled                    | Greyed out button, can not purchase item              | ✅ Pass |
| 4   | Purchase Same Item                  | Buy same item once again<br> Same steps as # 2   | Quantity increases to 2            | Inventory shows x2, User points: -20                  | ✅ Pass |
| 5   | View Inventory                      | 1. Open Dashboard<br>2. Check inventory section  | Shows all owned items & quantities | Items displayed with x1, x2, x3 etc.                  | ✅ Pass |
| 6   | Empty Inventory                     | New user with no purchase                        | "Inventory Empty" message          | Dashboard displays `Inventory is empty. Go shopping!` | ✅ Pass |


## 6. Achievements

| #   | Test Case               | Steps                                             | Expected Result              | Actual Result            | Status |
| --- | ----------------------- | ------------------------------------------------- | ---------------------------- | ------------------------ | ------ |
| 1   | Open Achievements Modal | 1. On Dashboard<br>click on `Achievements` button | Modal shows all achievements | 9 Achievements Displayed | ✅ Pass |

## 7. Calendar
| #   | Test Case     | Steps                                      | Expected Result               | Actual Result                    | Status |
| --- | ------------- | ------------------------------------------ | ----------------------------- | -------------------------------- | ------ |
| 1   | View Calendar | 1. On dashboard scroll to calendar section | Show current month with tasks | Task appears on due date         | ✅ Pass |
| 2   | Click Date    | 1. Click on date with tasks                | Shows tasks for that date     | Task list appears below calendar | ✅ Pass |

## 8. Navigation
| #   | Test Case            | Steps                                    | Expected Result            | Actual Result                      | Status                                           |
| --- | -------------------- | ---------------------------------------- | -------------------------- | ---------------------------------- | ------------------------------------------------ |
| 1   | Dashboard            | 1. Login with test user                  | Load dashboard             | Login successful, Dashboard loaded | ✅ Pass                                           |
| 2   | Profile Navigation   | 1. Click on `Profile` button             | Navigate to User profile   | Profile page loads                 | ✅ Pass                                           |
| 3   | Back to Dashboard    | 1. Click on `Back to Dashboard` button   | Navigate back to Dashboard | Dashboard loads                    | ✅ Pass                                           |
| 4   | Logout               | 1. Click `Logout`                        | Back tp Login page         | User logged out                    | User logged out, Login page loads, token cleared | ✅ Pass |
| 5   | Navigate to Register | 1. From login page click `Register here` | Registration Page loads    | Registration Page Loaded           | ✅ Pass                                           |

## 9. Visual Heuristics Testing

| #   | Heuristic        | Test Method                                                                          | Expected                                                                        | Actual                                                                   | Status |
| --- | ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------ |
| 1   | Consistency      | Compare button styles across all pages (Login, Register, Dashboard, Profile, Modals) | Same color, size, hover effect on all primary buttons                           | All buttons use purple theme appropriately                               | ✅ Pass |
| 2   | Feedback         | Click any action button (Create Task, Buy Item, Use Item)                            | Visual response within 1 second (loading state, animation, or immediate change) | All actions show immediate feedback (spinners, animations, stat changes) | ✅ Pass |
| 3   | Affordance       | Hover over clickable elements (buttons, task items, calendar dates)                  | Cursor changes to pointer, visual change (color/shadow)                         | All buttons and clickable cards show pointer cursor and hover effects    | ✅ Pass |
| 4   | Error Prevention | Try to submit forms with missing required fields                                     | Form prevents submission, highlights missing fields                             | "Please fill out this field" tooltip appears; cannot submit empty task   | ✅ Pass |
| 5   | Recovery         | Trigger an error (wrong password, duplicate registration)                            | Clear error message with actionable guidance                                    | "Invalid credentials" and "User already exists" messages displayed       | ✅ Pass |

### Visual Heuristics Summary
| Heuristic        | Status   |
| ---------------- | -------- |
| Consistency      | ✅ Pass   |
| Feedback         | ✅ Pass   |
| Affordance       | ✅ Pass   |
| Error Prevention | ✅ Pass   |
| Recovery         | ✅ Pass   |
| **Success Rate** | **100%** |

## Test Summary
| Category        | Tests Passed | Test Failed | Success  |
| --------------- | ------------ | ----------- | -------- |
| Authentication  | 4            | 0           | 100%     |
| Task Management | 6            | 0           | 100%     |
| Pet  System     | 3            | 0           | 100%     |
| Shop Inventory  | 6            | 0           | 100%     |
| Achievements    | 1            | 0           | 100%     |
| Calendar        | 2            | 0           | 100%     |
| Navigation      | 5            | 0           | 100%     |
| Visual Testing  | 5            | 0           | 100%     |
| **Total**       | **32**       | **0**       | **100%** |


## Final Verdict
```text
╔══════════════════════════════════════════════════════════════╗
║                        TEST SUMMARY                          ║
╠══════════════════════════════════════════════════════════════╣
║  Total Tests:        32                                      ║
║  Passed:             32 (100%)                               ║
║  Failed:             0 (0%)                                  ║
║  UI Status:          Production Ready                        ║
╚══════════════════════════════════════════════════════════════╝
```