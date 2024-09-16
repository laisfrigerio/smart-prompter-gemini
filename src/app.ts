import express from "express";
import categoryRoute from "./routes/category.route";
import chatRoute from "./routes/chat.route";
import rootRoute from "./routes/root.route";
import templateRoute from "./routes/template.route";

const app = express();
app.use(express.json());
app.use(categoryRoute);
app.use(chatRoute);
app.use(rootRoute);
app.use(templateRoute);

export { app };
