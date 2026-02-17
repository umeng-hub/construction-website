import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';
import User from './src/models/User.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/construction-company');
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const createAdminUser = async () => {
  try {
    await connectDB();

    console.log('\n═══════════════════════════════════════════');
    console.log('   Create Admin User for Prestige Build');
    console.log('═══════════════════════════════════════════\n');

    const username = await question('Enter username (min 3 characters): ');
    const email = await question('Enter email: ');
    const password = await question('Enter password (min 6 characters): ');

    // Validate input
    if (username.length < 3) {
      console.error('\n❌ Username must be at least 3 characters');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('\n❌ Password must be at least 6 characters');
      process.exit(1);
    }

    if (!email.includes('@')) {
      console.error('\n❌ Please enter a valid email');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.error('\n❌ User already exists with this email or username');
      process.exit(1);
    }

    // Create user
    const user = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: 'admin',
      isActive: true
    });

    await user.save();

    console.log('\n✅ Admin user created successfully!');
    console.log('\n📋 User Details:');
    console.log(`   Username: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log('\n🔐 You can now login at: http://localhost:5173/login');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

createAdminUser();
