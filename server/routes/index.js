import express from "express";
import {
  register,
  verify,
  login,
  logout,
  addTask,
  removeTask,
  updateTask,
  getMyProfile,
  updateProfile,
  updatePassword,
  forgetPassword,
  resetPassword,
} from "../controllers/User.js";
import { isAuthenticated } from "../middleware/auth.js";

// router is an express.Router() instance
const router = express.Router();

router.post("/register", register);
router.post("/verify", isAuthenticated, verify);
router.post("/login", login);
router.get("/logout", logout);

router.post("/newtask", isAuthenticated, addTask);
router.get("/me", isAuthenticated, getMyProfile);

router
  .route("/task/:taskId")
  .get(isAuthenticated, updateTask)
  .delete(isAuthenticated, removeTask);

router.put("/updateprofile", isAuthenticated, updateProfile);
router.put("/updatepassword", isAuthenticated, updatePassword);

router.post("/forgetpassword", forgetPassword);
router.route("/resetpassword").put(resetPassword);

export default router;
