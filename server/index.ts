import * as express from "express";
import { Express } from "express";
import rootRouter from "./routes/routes";

const app: Express = express();

const PORT = process.env.PORT || 5001;

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
