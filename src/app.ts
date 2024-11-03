import express from "express";
import chatRoute from "./controllers/chat.controller";
import rootRoute from "./controllers/root.controller";
import templateRoute from "./controllers/template.controller";

const app = express();

app.use(express.json());
app.use(chatRoute);
app.use(rootRoute);
app.use(templateRoute);

export { app };
