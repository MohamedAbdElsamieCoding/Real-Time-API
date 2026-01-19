import express from "express";
import helmet from "helmet";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";

import { errorHandler } from "./middlewares/error-handler";

import authRouter from "./routes/auth.route";
import conversationRouter from "./routes/conversation.route";

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

const swaggerDocument = YAML.load(
  path.join(process.cwd(), "src/docs/swagger.yaml"),
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/conversations", conversationRouter);

app.use(errorHandler);

export default app;
