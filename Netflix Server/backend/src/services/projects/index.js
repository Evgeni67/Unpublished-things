const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const moviesFilePath = path.join(__dirname, "movies.json");
const reviewsFilePath = path.join(__dirname, "reviews.json");
const myCardFilePath = path.join(__dirname, "myCard.json");
const router = express.Router();

const readFile = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName));
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};

router.get("/", (req, res) => {
  const moviesAsArray = readFile("movies.json");
  res.send(moviesAsArray);
});

router.get("/:identifier", (req, res) => {
  const moviesAsArray = readFile("movies.json");
  const reviewsAsArray = readFile("reviews.json");
  const idFromParams = req.params.identifier;
  const projectt = moviesAsArray.filter(
    (project) => project.id === idFromParams
  );
  const reviews = reviewsAsArray.filter(
    (project) => project._id === idFromParams
  );
  res.send({ projectt, reviews });
});

router.post("/", (req, res) => {
  const moviesAsArray = readFile("movies.json");

  //get the new project from the request's body
  const newProject = req.body;
  newProject.id = uniqid();
  moviesAsArray.push(newProject);
  fs.writeFileSync(moviesFilePath, JSON.stringify(moviesAsArray));
  res.status(201).send(newProject);
});

router.post("/reviews", (req, res) => {
  const moviesAsArray = readFile("reviews.json");

  //get the new project from the request's body
  const newProject = req.body;
  moviesAsArray.push(newProject);
  fs.writeFileSync(reviewsFilePath, JSON.stringify(moviesAsArray));
  res.status(201).send(newProject);
});
router.put("/:id", (req, res) => {
  const moviesAsArray = readFile("movies.json");
  //find the index
  const index = moviesAsArray.findIndex((user) => user.ID === req.params.id);
  const modifiedUser = req.body;
  modifiedUser.id = req.params.id;
  moviesAsArray[index] = modifiedUser;
  fs.writeFileSync(moviesFilePath, JSON.stringify(moviesAsArray));
  res.send("User Modified Succesfully");
});

router.delete("/:id", (req, res) => {
  const moviesAsArray = readFile("movies.json");
  //filter it out
  const newmoviesArray = moviesAsArray.filter(
    (project) => project.id !== req.params.id
  );
  fs.writeFileSync(moviesFilePath, JSON.stringify(newmoviesArray));
  res.send(newmoviesArray);
});

//MY CARD

module.exports = router;
