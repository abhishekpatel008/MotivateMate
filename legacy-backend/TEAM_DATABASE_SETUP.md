### Prerequesites
* PostgreSQL 17 installed
* Terminal/Powershell access

## Windows

### Step 1: Install PostgreSQL 17

#### Option A: Using winget
```text
# Open powershell as admin
winget install PostgreSQL.PostgreSQL.17
```

#### Option B: Manual Install
* Download from: https://www.postgresql.org/download/windows
* Run the installer
* IMPORTANT: Remember the password you set for the postgres user!
* Keep default port: 5432

### Step 2: Add PostgreSQL to PATH
1. Search "Environment Variables" in windows start menu
2. Click on "Environment Variables"
3. Under "System Variables", find "Path" and click Edit
4. Click New and add: C:\Program Files\PostgreSQL\17\bin
5. Click OK on all windows
6. Restart PowerShell

#### Verify installation:
````text
psql --version
# Should show: psql (PostgreSQL) 17.X
````

## MAC

### Step 1: Install PostgreSQL 17

#### Option A: Using Homebrew

````text
# Install Homebrew first if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PostgreSQL
brew install postgresql@17

# Start PostgreSQL service
brew services start postgresql@17
````

#### Option B: Download Installer
* Download from: https://www.postgresql.org/download/macosx/
* Run the installer
* Remember the password you set for the postgres user!

### Step 2: Add PostgreSQL to PATH (If using installer)
````text
export PATH="/Library/PostgreSQL/17/bin:$PATH"
````
Then run:
````text
source ~/.zshrc
````
#### Verify installation:
````text
psql --version
# Should show: psql (PostgreSQL) 17.X
````

# Common Steps
### Step 3: Clone the repository
````text
git clone https://github.com/ITSC-4155-Senior-Project/MotivateMate.git

cd MotivateMate/backend
````

### Step 4: Create Your Local Database and User

#### Connect as postgres superuser:
````text
psql -U postgres

# Password: postgres
````
#### Then run these SQL commands:
````text
-- Create database
CREATE DATABASE motivatemate_dev;

-- Create app user
CREATE USER motivatemate_user WITH PASSWORD 'your_own_password_here';

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE motivatemate_dev TO motivatemate_user;

-- Exit
\q
````

### Important: Remember the password you chose! You'll need it for your ````.env```` file.

### Step 5: Import Database Schema
````text
# Navigate to backend folder
cd MotivateMate/backend

# Import schema
psql -U motivatemate_user -d motivatemate_dev -f schema.sql
````
Enter Password: ```` your_password_from_above ````.

Expected output:
You should see ```` CREATE TABLE ```` messages for all 7 database tables.

### Step 6: Import Sample Data (Optional)
````text
psql -U motivatemate_user -d motivatemate_dev -f seed.sql
````

### Step 7: Test your connection
````text
# Connect to database
psql -U motivatemate_user -d motivatemate_dev

# List all tables
\dt
````
You should see 7 tables: ```` users, tasks, pets, shop_items, user_inventory, achievements, user_achievements ````.

#### Exit
````text
\q
````
### Step 8: Create ````.env```` file in the ```` backend ```` folder
````text
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret - YOU MUST GENERATE YOUR OWN!

JWT_SECRET=your_generated_secret_here
JWT_EXPIRE=7d

# Database Configuration
DB_NAME=motivatemate_dev
DB_USER=motivatemate_user
DB_PASSWORD=your_chosen_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
````
### Important:
* Never commit ````.env```` to GitHub! It's already in ````.gitignore````.
* Never share your ````JWT_SECRET````.
* Never commit ````.env```` to GitHub.
* Each team member generates their own