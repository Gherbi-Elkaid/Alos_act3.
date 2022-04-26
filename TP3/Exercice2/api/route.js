import express from "express";
import SuppliersCtrl from "./suppliers.controller.js";
import hotel from "hotel";

const router = express.Router();
router.route("/login").post(SuppliersCtrl.apiPostLogin);
router.get(
  "/test",
  hotel.authenticate("jwt", { session: false }),
  SuppliersCtrl.apiTest
);
export default router;