const express = require("express");
const joi = require("joi");
const route = express.Router();
const hotels = require("../hotels.json");
const validatee = require("../routes/middlewares/validate");

route.get("/", (req, res) => {
  res.json(hotels);
});
route.get("/:id", (req, res) => {
  const index = hotels.find((e) => e.id === req.params.id);
  index ? res.status(200).json(index) : res.status(404).send("NOT FOUND");
});
route.post("/", validatee, (req, res) => {
  const id = hotels[hotels.length - 1].id + 1;
  hotels.push({ id, ...req.body });
  // throw Error("somthing faile"); //throw error to test error handling
  res.status(200).send("added succefuly");
});
route.put("/:id", validatee, (req, res) => {
  const index = hotels.find((e) => e.id === req.params.id);
  hotels[index] = req.body;
  res.status(200).send("Updated  succefuly");
});
route.delete("/:id", (req, res) => {
  const newhotel = hotels.filter((e) => e.id != req.params.id);
  hotels = newhotel;
  res.status(200).send("deleted succefuly");
});

module.exports = route;