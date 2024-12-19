import express from "express";
import {
  getAllOrganizations,
  getOrganizationByName,
  createNewOrganization,
  signInOrganization,
  updateOrganization,
  deleteOrganization,
  TokenValid,
  logOutOrganization,
} from "../controllers/organizationController.js";

import verifyToken from "../middleware/auth.js";

const router = express.Router();

// Token validation
router.get("/validateToken", verifyToken, TokenValid);

// Get all organizations
router.get("/", getAllOrganizations);

// Get organization by name
router.get("/:orgName", getOrganizationByName);

// Create new organization
router.post("/signup", createNewOrganization);

// Sign in to organization
router.post("/signIn", signInOrganization);

// Logout
router.post("/logOut", logOutOrganization);

// Update organization
router.patch("/updateOrganization", updateOrganization);

// Delete organization
router.delete("/delete", deleteOrganization);

export default router;
