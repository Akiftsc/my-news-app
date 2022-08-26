import express from "express";
import pageRouter from "./router/pageRouter.js";

const app = express();
const port = 5000;

//* Template Engine
app.set("view engine", "ejs");

//* Static Files

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Routers

app.use("/", pageRouter);

app.use("*", (req, res) => {
  res.send("<h1>This Page doesnt exist</h1>");
});

app.listen(port, () => {
  console.info(`Server is up while using port ${port}`);
});
