# QUICK START GUIDE - Manual Setup

Follow these steps to get the construction website running on your system.

## Prerequisites

Before you begin, make sure you have:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)
3. **A code editor** (VS Code recommended)

Check your installations:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

---

## Step 1: Start MongoDB

### Windows:
- MongoDB should start automatically after installation
- Or run: `net start MongoDB` in Command Prompt (as Administrator)
- Or start MongoDB Compass and connect to `mongodb://localhost:27017`

### Mac:
```bash
brew services start mongodb-community
```

### Linux:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## Step 2: Setup Backend

Open terminal/command prompt and navigate to your project folder:

```bash
cd construction-website/server
```

### Create environment file:
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Install dependencies:
```bash
npm install
```

### Seed the database with sample data:
```bash
npm run seed
```

You should see: "✅ Database seeded successfully!"

---

## Step 3: Setup Frontend

Open a NEW terminal/command prompt:

```bash
cd construction-website/client
```

### Create environment file:
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Install dependencies:
```bash
npm install
```

---

## Step 4: Start the Application

### Terminal 1 - Start Backend:
```bash
cd construction-website/server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost:27017
```

### Terminal 2 - Start Frontend:
```bash
cd construction-website/client
npm run dev
```

You should see:
```
VITE v5.0.11  ready in 500 ms

➜  Local:   http://localhost:5173/
```

---

## Step 5: Open in Browser

Open your web browser and go to:

**Frontend**: http://localhost:5173

You should see the beautiful Prestige Build construction website!

**Backend API** (optional): http://localhost:5000/api/projects

---

## Troubleshooting

### "MongoDB connection error"
- Make sure MongoDB is running
- Check that port 27017 is not blocked
- Try connecting with MongoDB Compass to verify

### "Port 5000 already in use"
- Close any application using port 5000
- Or change the PORT in `server/.env` file

### "Port 5173 already in use"
- Close any application using port 5173
- Or Vite will suggest an alternative port

### "npm install fails"
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Make sure you have internet connection

### "Module not found errors"
- Make sure you ran `npm install` in BOTH server and client folders
- Try deleting `node_modules` and running `npm install` again

---

## Project Structure

```
construction-website/
├── client/          # Frontend React app
│   ├── src/         # Source code
│   ├── public/      # Static files
│   └── package.json
├── server/          # Backend API
│   ├── src/         # Source code
│   ├── seed.js      # Database seeder
│   └── package.json
├── README.md        # Full documentation
└── DEPLOYMENT.md    # Production deployment guide
```

---

## What's Next?

1. **Customize the content**: Edit the pages in `client/src/pages/`
2. **Change colors**: Modify `client/tailwind.config.js`
3. **Add your projects**: Use the API endpoints or edit `server/seed.js`
4. **Deploy to production**: See `DEPLOYMENT.md` for instructions

---

## Need Help?

- Check `README.md` for detailed documentation
- Check `PROJECT_OVERVIEW.md` for technical details
- Check `DEPLOYMENT.md` for deployment instructions

---

## Default Login Info

This version doesn't have authentication yet. To add admin features, you'll need to:
1. Implement JWT authentication
2. Add admin routes
3. Create an admin dashboard

See the "Future Enhancements" section in README.md

---

**Enjoy building with Prestige Build! 🏗️**
