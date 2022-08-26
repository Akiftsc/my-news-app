import express from "express";
import * as pageController from "../controller/pageController.js";

const router = express.Router();

router.get("/", pageController.getIndexPage);
router.get("/post/:uid", pageController.getPostPage);
router.use("/post/*", (req, res) => {
  res.send("<h1>This Page doesnt exist</h1>");
});

export default router;
