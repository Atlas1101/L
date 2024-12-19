import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import JWT from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/AUTH.js";
import Event from "../models/eventModel.js";

const JWT_EXPIRATION = { expiresIn: "1h" };

//token validation
export const TokenValid = (req, res) => {
  try {
    console.log("aaa");
    res.status(200).send({
      username: req.user,
    });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later.",
    });
  }
};

//create user
export const createNewUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { username, email, password, img, bio, city, phone, age } = req.body;

    if (!username || !password || !email || !city || !age || !phone) {
      console.log(
        "Missing required fields: username, password, phone, email, city, or age."
      );
      return res.status(400).send({
        error: "email, username, password, city, phone, and age are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    });

    console.log("Existing User Check:", existingUser);

    if (existingUser) {
      console.log("Username, email, or phone already exists");
      return res
        .status(400)
        .json({ message: "Username, email, or phone already exists" });
    }

    console.log("Hashing password...");
    const hashedPassword = await hashPassword(password);

    console.log("Creating new user...");
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      bio,
      city,
      phone,
      age,
    });

    console.log("Saving new user to database...");
    await newUser.save();

    console.log("User registered successfully:", newUser);
    res.status(201).send({
      status: "success",
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("Error during user creation:", error);
    res.status(500).send(error);
  }
};

//sign in
export const singInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).send({ error: "email and password is required" });
  }
  try {
    const foundUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!foundUser) {
      return res.status(404).send({ error: "Email or username not found." });
    }

    const isAuth = await comparePassword(password, foundUser.password);
    if (!isAuth) {
      return res.status(401).send({ error: "Invalid password." });
    }

    const { _id, username, email, createdAt } = foundUser;
    const filteredUser = { _id, username, email, createdAt };

    const token = JWT.sign(filteredUser, process.env.JWT_KEY, JWT_EXPIRATION);

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.status(200).send({
      message: "Authentication successful",
      isAuth: true,
      username: username,
      _id: _id,
    });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong. Please try again later.",
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("friends", "username img")
      .populate("events", "evName hours");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message, error.stack);
    res.status(500).json({ error: "Unknown server error." });
  }
};

// Get a specific user by username
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    })
      .populate("friends", "username img")
      .populate("events", "evName hours");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Get a specific user's friends by username
export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    }).populate("friends", "username email img phone");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Add a friend
export const sendFriendRequest = async (req, res) => {
  const { userId, targetUserId } = req.body;
  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User or target user not found." });
    }
    if (user.friends.includes(targetUser._id)) {
      return res.status(400).json({ message: "Already friends." });
    }

    user.friends.push(targetUser._id);
    await user.save();

    targetUser.friends.push(user._id);
    await targetUser.save();

    res.status(200).json({ message: "Friend request sent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Remove a friend
export const removeFriend = async (req, res) => {
  const { userId, targetUserId } = req.body;
  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User or target user not found." });
    }

    if (!user.friends.includes(targetUser._id)) {
      return res.status(400).json({ message: "Not friends." });
    }

    user.friends = user.friends.filter(
      (friendId) => friendId.toString() !== targetUser._id.toString()
    );
    await user.save();

    targetUser.friends = targetUser.friends.filter(
      (friendId) => friendId.toString() !== user._id.toString()
    );
    await targetUser.save();

    res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  const {
    userId,
    newUsername,
    newEmail,
    newImg,
    newBio,
    newCity,
    newPhone,
    newAge,
  } = req.body;
  const updateData = {};

  if (newUsername) updateData.username = newUsername;
  if (newEmail) updateData.email = newEmail;
  if (newImg) updateData.img = newImg;
  if (newBio) updateData.bio = newBio;
  if (newCity) updateData.city = newCity;
  if (newPhone) updateData.phone = newPhone;
  if (newAge) updateData.age = newAge;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(201).send({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// Join an event
export const joinEvent = async (req, res) => {
  try {
    const { eventId, username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Check if user is already a volunteer
    if (event.volunteers.includes(user._id)) {
      return res.status(400).json({ message: "User is already in the event." });
    }

    // Add user to event and event to user
    event.volunteers.push(user._id);
    user.events.push(event._id);

    await event.save();
    await user.save();

    res.status(200).json({ message: "User joined the event successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

// Leave an event
export const leaveEvent = async (req, res) => {
  try {
    const { eventId, username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Check if user is part of the event
    if (!event.volunteers.includes(user._id)) {
      return res.status(400).json({ message: "User is not in the event." });
    }

    // Remove user from event and event from user
    event.volunteers = event.volunteers.filter(
      (volunteerId) => volunteerId.toString() !== user._id.toString()
    );
    user.events = user.events.filter(
      (userEventId) => userEventId.toString() !== event._id.toString()
    );

    await event.save();
    await user.save();

    res.status(200).json({ message: "User left the event successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { userId } = req.body; // Make sure you get the userId from the request body

  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the user is authorized to delete this user (or add your own logic here)
    if (userToDelete._id.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You are not authorized to delete this user." });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error." });
  }
};