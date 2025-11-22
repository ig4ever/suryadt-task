import app from "./app";
import { connectDB, disconnectDB } from "./config/database";
import { connectRedis, disconnectRedis } from "./config/redis";
import { PORT } from "./config/env";
import { Owner } from "./models/owner.model";
import { Pet } from "./models/pet.model";
import { Category } from "./models/category.model";
import { User } from "./models/user.model";
import { seedData } from "./scripts/seed";

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    await seedData();

    try {
      await Promise.all([
        Owner.syncIndexes(),
        Pet.syncIndexes(),
        Category.syncIndexes(),
        User.syncIndexes(),
      ]);
      console.log("Indexes synchronized");
    } catch (e) {
      console.warn("Index sync failed:", e);
    }

    const port = parseInt(PORT || "3000");
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });

    const gracefulShutdown = async (): Promise<void> => {
      console.log("Shutting down gracefully...");
      server.close(async () => {
        await disconnectDB();
        await disconnectRedis();
        process.exit(0);
      });
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
