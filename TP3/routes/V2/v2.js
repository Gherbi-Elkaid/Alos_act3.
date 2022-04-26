const express = require("express");
const joi = require("joi");
const route = express.Router();
const hotels = require("../hotels.json");
const validatee = require("../routes/middlewares/validate");
const UserController = require ("./Controllers/UserController")
const ReviewController = require ("./Controllers/ReviewController")


//  NEW FEATURE IN V2 :
// reviews

router.get('/hotels/:id/reviews',
    ReviewController.get)

router.post('/hotels/:id/reviews',
    ReviewController.create)

router.delete('reviews/:id',
    ReviewController.delete)



//  NEW FEATURE IN V2 :
// users

route.get('/users',
    UserController.get_all)

route.get('/users/:id',
    UserController.get)

route.get('/users/:id/reviews',
    UserController.get_reviews)

//  ############################
route.get("/", (req, res) => {
  res.json(hotels);
});

// GET DATA BY ID
route.get("/:id", (req, res) => {
  const index = hotels.find((e) => e.id === req.params.id);
  index ? res.status(200).json(index) : res.status(404).send("NOT FOUND");
});

//  POST DATA TO RECIPES API AND CHECK WITH VALIDATEE MIDDLEWARE
route.post("/", validatee, (req, res) => {
  const id = hotels[hotels.length - 1].id + 1;
  hotels.push({ id, ...req.body });
  // throw Error("somthing faile"); //throw error to test error handling
  res.status(200).send("added succefuly");
});

// MODIFY DATA IN API BY ID
route.put("/:id", validatee, (req, res) => {
  const index = hotels.find((e) => e.id === req.params.id);
  hotels[index] = req.body;
  res.status(200).send("Updated  succefuly");
});

//  DELETE DATA BY ID
route.delete("/:id", (req, res) => {
  const newhotel = hotels.filter((e) => e.id != req.params.id);
	hotels= newhotel;
  res.status(200).send("deleted   succefuly");
});

https: module.exports = route;