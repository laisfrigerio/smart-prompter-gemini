import { app } from "./app";

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Acesse a documentação em http://localhost:${port}/api-docs`);
});
