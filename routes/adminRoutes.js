const express = require("express");
const router = express.Router();


const { validateAnimalCategory, validateAnimalBreed, validateAnimalOptionalData } = require("../validator/validateAnimal");

const { validateDoctor } = require("../validator/validateUser")

const { handleAddAnimalCategory, handleGetAnimalCategory } = require("../controllers/admin/animalCategoryController");

const { handleAddAnimalBreed, handleGetAnimalBreed } = require("../controllers/admin/animalBreedController");

const { handleAnimalLactation, handleGetAnimalLactation } = require("../controllers/admin/animalLactationController");

const { handleAddDoctor } = require("../controllers/admin/doctorController");

const { isLogIn } = require("../middleware/auth");

const { handleAnimalBaby, handleGetAllOptionalData } = require("../controllers/admin/animalOptionalData");



router.post("/animal-category", isLogIn, validateAnimalCategory, handleAddAnimalCategory);

// router.get("/animal-category", handleGetAnimalCategory);

router.post("/animal-breed", isLogIn, validateAnimalBreed, handleAddAnimalBreed);

// router.get("/animal-breed", handleGetAnimalBreed);

router.post("/animal-lactation", isLogIn, validateAnimalBreed, handleAnimalLactation);

router.post("/add-optional-data", isLogIn, validateAnimalOptionalData, handleAnimalBaby);

router.get("/all-optional-data", isLogIn, handleGetAllOptionalData);

router.get("/animal-lactation", isLogIn, handleGetAnimalLactation);

router.post("/add-doctor", isLogIn, validateDoctor, handleAddDoctor);





module.exports = router