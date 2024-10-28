const express = require("express");
const router = express.Router();

const { isLogIn } = require("../middleware/auth")

const { validateSignUp, validateOtp, validateLocation } = require("../validator/validateUser");

const { validateSellAnimal } = require("../validator/validateAnimal");

const { validateUserProfile } = require("../validator/validateUser");

const { handleSignUpUser, handleVarifyOTP, handleLogOutUser, handleGetUserLocation } = require("../controllers/user/userController");

const { handleGetAllUser, handleUpdateName, handleCompleteProfile, handleGetUserProfile } = require("../controllers/user/userProfileController");

const { handleUserPost, handleGetAllPost, handleGetUserPost, handleLikes, handleComment, deletePostComment } = require("../controllers/user/userPostController");

const { handleGetAnimal, handleGetAnimalBreed, handleSellAnimal } = require("../controllers/user/sellAnimalController");

const { handleGetAllAnimal, handleGetNearbyAnimal, handleGetPrimeAnimal } = require("../controllers/user/buyAnimalController");

const { handleGetUserAnimal, handleGetUserPrimeAnimal, handleDeleteAnimal } = require("../controllers/user/userAnimalController");

const { handleGetDoctor, handleExpriencedDoctor } = require("../controllers/admin/doctorController");

const { handleGetAnimalBaby, handleGetAnimalPregnant, handleGetAnimalCalf } = require("../controllers/admin/animalOptionalDataController");

const { handleGetAnimalLactation } = require("../controllers/admin/animalLactationController");

const { handleUserProfileWork, handleUserProfileHusbandry, handleUserProfileUseApp, handleUserProfileEducation } = require("../controllers/admin/userProfileInfoController")






router.post("/sign-up", validateSignUp, handleSignUpUser);

router.post("/varify-otp", validateOtp, handleVarifyOTP);

router.delete("/log-out", isLogIn, handleLogOutUser);

router.post("/user-location", isLogIn, validateLocation, handleGetUserLocation);

router.post("/add-name", isLogIn, handleUpdateName)

router.get("/all-user", isLogIn, handleGetAllUser);

router.put("/update-profile", isLogIn, validateUserProfile, handleCompleteProfile);

router.get("/get-profile", isLogIn, handleGetUserProfile);

router.post("/post-community", isLogIn, handleUserPost);

router.get("/post-like/:id", isLogIn, handleLikes);

router.post("/post-comment/:id", isLogIn, handleComment);

router.post("/comment-delete/:postId/:commentId", isLogIn, deletePostComment);

router.get("/all-posts", isLogIn, handleGetAllPost);

router.get("/user-posts", isLogIn, handleGetUserPost);

router.get("/animal-breed", isLogIn, handleGetAnimalBreed);

router.get("/animal-category", isLogIn, handleGetAnimal);

router.get("/animal-lactation", isLogIn, handleGetAnimalLactation);

router.get("/get-animal-baby", isLogIn, handleGetAnimalBaby);

router.get("/get-animal-pregnant", isLogIn, handleGetAnimalPregnant);

router.get("/get-animal-calf", isLogIn, handleGetAnimalCalf);

router.post("/sell-animal", isLogIn, validateSellAnimal, handleSellAnimal);

router.get("/your-animal", isLogIn, handleGetUserAnimal);

router.delete("/delete-animal/:animalId", isLogIn, handleDeleteAnimal);

router.get("/nearby-animals", isLogIn, handleGetNearbyAnimal);

router.get("/all-animals", isLogIn, handleGetAllAnimal);

router.get("/categorywise-animal", isLogIn, handleGetPrimeAnimal);

router.get("/user-prime-animal", isLogIn, handleGetUserPrimeAnimal);

router.get("/nearby-doctors", isLogIn, handleGetDoctor);

router.get("/exprienced-doctors", isLogIn, handleExpriencedDoctor);

router.get("/user-work", isLogIn, handleUserProfileWork);

router.get("/animal-husbandry", isLogIn, handleUserProfileHusbandry);

router.get("/use-animal-app", isLogIn, handleUserProfileUseApp);

router.get("/user-education-level", isLogIn, handleUserProfileEducation);


module.exports = router