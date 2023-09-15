const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  ResetPassword,
  getUserDetails,
  updatePassword,
  UpdateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(ResetPassword);

router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, UpdateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteUser)

module.exports = router;
