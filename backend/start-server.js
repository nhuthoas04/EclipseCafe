const { spawn } = require("child_process");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const Drink = require("./models/Drink");

const startServer = async () => {
  try {
    console.log("🔄 Checking database status...");

    // Connect to database
    await connectDB();

    // Check if drinks exist
    const drinkCount = await Drink.countDocuments();
    console.log(`📊 Found ${drinkCount} drinks in database`);

    if (drinkCount === 0) {
      console.log("🔧 Database is empty. Running initialization...");

      // Run init-db.js
      const initProcess = spawn("node", ["init-db.js"], {
        stdio: "inherit",
      });

      await new Promise((resolve, reject) => {
        initProcess.on("close", (code) => {
          if (code === 0) {
            console.log("✅ Database initialization completed successfully!");
            resolve();
          } else {
            console.error("❌ Database initialization failed with code:", code);
            reject(new Error(`Init process exited with code ${code}`));
          }
        });
      });
    } else {
      console.log("✅ Database already has data. Skipping initialization.");
    }

    // Close the connection used for checking
    await mongoose.connection.close();

    // Start the main server
    console.log("🚀 Starting main server...");
    const serverProcess = spawn("node", ["app.js"], {
      stdio: "inherit",
    });

    // Handle server process
    serverProcess.on("close", (code) => {
      console.log(`Server process exited with code ${code}`);
      process.exit(code);
    });
  } catch (error) {
    console.error("❌ Error during startup:", error);
    process.exit(1);
  }
};

// Handle process termination
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

startServer();
