import app from "./app";
import { connectDB, disconnectDB } from "./config/database";
import { connectRedis, disconnectRedis } from "./config/redis";
import { PORT } from "./config/env";
// import { seedOwners } from "./services/ownerService";

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    // await seedOwners();

    const port = parseInt(PORT || "3000")
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
