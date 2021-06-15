import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(categoriesRoutes);
app.use(specificationsRoutes);

app.use(express.json());

app.listen(3333, () => console.log("Server running!"));
