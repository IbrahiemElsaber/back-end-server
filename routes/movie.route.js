const router = require("express").Router();
const { returnUserMovieList, testRouteController, addToUserList } = require("../controllers/movie.controller");
const verify = require("../middlewares/verifyToken");

router.get("/getUsersMovieList/:id", verify, returnUserMovieList);
router.get("/testRoute", verify, testRouteController);
router.put("/addToUserList/:id", verify, addToUserList);

module.exports = router;
