import Organization from "../models/organizationModel.js";
import JWT from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/AUTH.js";

const JWT_EXPIRATION = { expiresIn: "1h" };

// Validate Token
export const TokenValid = (req, res) => {
  try {
    res.status(200).send({
      orgName: req.organization.orgName,
    });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Get all organizations
export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().populate(
      "events",
      "eventName date"
    );
    if (organizations.length === 0) {
      return res.status(404).json({ message: "No organizations found." });
    }
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

// Get an organization by name
export const getOrganizationByName = async (req, res) => {
  try {
    const organization = await Organization.findOne({
      orgName: req.params.orgName,
    }).populate("events", "eventName date");

    if (!organization) {
      return res.status(404).json({ error: "Organization not found." });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Create a new organization
export const createNewOrganization = async (req, res) => {
  console.log(req.body);
  try {
    const { orgName, email, password, phone, city } = req.body;

    if (!orgName || !password || !email || !city || !phone) {
      return res.status(400).send({
        error: "orgName, email, password, city, and phone are required",
      });
    }

    const existingOrg = await Organization.findOne({
      $or: [{ orgName }, { email }, { phone }],
    });

    if (existingOrg) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newOrg = new Organization({
      orgName,
      email,
      password: hashedPassword,
      phone,
      city,
    });

    await newOrg.save();
    res.status(201).send({
      status: "success",
      message: "Organization registered successfully",
      data: newOrg,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Sign in organization
export const signInOrganization = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!password || !email) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  try {
    const foundOrg = await Organization.findOne({ email: req.body.email });
    console.log(foundOrg);

    if (!foundOrg) {
      return res.status(404).send({ error: "Email or orgName not found." });
    }

    const isAuth = await comparePassword(password, foundOrg.password);
    if (!isAuth) {
      return res.status(401).send({ error: "Invalid password." });
    }

    const { _id, orgName, email, createdAt } = foundOrg;
    const filteredOrg = { _id, orgName, email, createdAt };

    const token = JWT.sign(filteredOrg, process.env.JWT_KEY, JWT_EXPIRATION);

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).send({
      message: "Authentication successful",
      isAuth: true,
      orgName,
      _id,
    });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Logout organization
export const logOutOrganization = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    path: "/login",
  });
  res.status(200).send({
    message: "Successfully logged out.",
  });
};

// Update an organization
export const updateOrganization = async (req, res) => {
  try {
    const { orgId, newOrgName, newEmail, newPhone, newCity, newAbout } = req.body;

    if (!orgId) {
      return res.status(400).json({ error: "Organization ID is required." });
    }

    const updateData = {};
    if (newOrgName) updateData.orgName = newOrgName;
    if (newEmail) updateData.email = newEmail;
    if (newPhone) updateData.phone = newPhone;
    if (newCity) updateData.city = newCity;
    if (newAbout) updateData.about = newAbout;

    const updatedOrg = await Organization.findByIdAndUpdate(orgId, updateData, {
      new: true,
    });

    if (!updatedOrg) {
      return res.status(404).json({ error: "Organization not found." });
    }

    // Update events if the organization name is changed
    if (newOrgName) {
      await Event.updateMany(
        { organization: orgId },
        { $set: { organization: updatedOrg._id } }
      );
    }

    res.status(201).send({
      message: "Organization updated successfully",
      updatedOrg,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete an organization
export const deleteOrganization = async (req, res) => {
  const { orgId } = req.body;

  if (!orgId) {
    return res.status(400).json({ error: "Organization ID is required." });
  }

  try {
    // Delete events
    const events = await Event.find({ organization: orgId });
    await Event.deleteMany({ organization: orgId });

    // Delete comments of the events
    await Comment.deleteMany({
      eventId: { $in: events.map((event) => event._id) },
    });

    // Delete the organization
    const deletedOrg = await Organization.findByIdAndDelete(orgId);

    if (!deletedOrg) {
      return res.status(404).json({ error: "Organization not found." });
    }

    res.status(200).json({
      message: "Organization deleted successfully",
      organization: deletedOrg,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};