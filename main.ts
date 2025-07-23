import "dotenv/config";
import app from "./app";

const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.info(`🚀 Serveur lancé sur http://localhost:${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });