const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");

/// USER ROUTES ///
router.post("/create", user_controller.create);
router.post("/:id/delete", user_controller.delete);
router.post("/:id/update", user_controller.update);
router.get("/:id", user_controller.detail);
router.get("/", user_controller.list);

module.exports = router;
