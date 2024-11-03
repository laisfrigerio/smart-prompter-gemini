import express from "express";
import categoryRoute from "./controllers/category.controller";
import chatRoute from "./controllers/chat.controller";
import rootRoute from "./controllers/root.controller";
import templateRoute from "./controllers/template.controller";

const app = express();

app.use(express.json());
app.use(categoryRoute);
app.use(chatRoute);
app.use(rootRoute);
app.use(templateRoute);

export { app };
