import express from "express";
import { exchangesController } from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(
    exchangesController.fetchStockExhanges
  )

  export default router;