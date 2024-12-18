import mongoose from "mongoose";
import User from "./models/userModel.js";
import Organization from "./models/organizationModel.js";
import Event from "./models/eventModel.js";
import Comment from "./models/commentModel.js";

// MongoDB connection string
const mongoURI =
  "mongodb+srv://oriarb13690:oriarb13690@cluster0.ys1qc.mongodb.net/linkind?retryWrites=true&w=majority&appName=Cluster0"; // שים לב שהקישור שלך הוא לאותו הפורמט

// Create dummy data
const createDummyData = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    // Clear existing data
    await User.deleteMany({});
    await Organization.deleteMany({});
    await Event.deleteMany({});
    await Comment.deleteMany({});

    // Create users
    const users = await User.insertMany([
      {
        username: "john_doe",
        email: "john@example.com",
        phone: "0521234567",
        password: "password123",
        city: "Tel Aviv",
        age: 28,
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        phone: "0521234568",
        password: "password123",
        city: "Haifa",
        age: 32,
      },
      {
        username: "mike_ross",
        email: "mike@example.com",
        phone: "0521234569",
        password: "password123",
        city: "Jerusalem",
        age: 25,
      },
      {
        username: "sarah_lee",
        email: "sarah@example.com",
        phone: "0521234570",
        password: "password123",
        city: "Beer Sheva",
        age: 29,
      },
      {
        username: "anna_white",
        email: "anna@example.com",
        phone: "0521234571",
        password: "password123",
        city: "Eilat",
        age: 26,
      },
    ]);

    // Create friendships
    users[0].friends.push(users[1]._id, users[2]._id);
    users[1].friends.push(users[0]._id, users[3]._id);
    users[2].friends.push(users[0]._id, users[4]._id);
    await Promise.all(users.map((user) => user.save()));

    // Create organizations
    const organizations = await Organization.insertMany([
      {
        orgName: "Green Earth",
        email: "info@greenearth.org",
        phone: "0521234572",
        password: "orgpass123",
        city: "Tel Aviv",
      },
      {
        orgName: "Helping Hands",
        email: "info@helpinghands.org",
        phone: "0521234573",
        password: "orgpass123",
        city: "Haifa",
      },
    ]);

    // Create events
    const events = await Event.insertMany([
      {
        evName: "Beach Cleanup",
        details:
          "Join us to clean the beach and make it a better place for everyone.",
        address: "Tel Aviv Beach",
        location: "Tel Aviv",
        capacity: 50,
        organization: organizations[0]._id,
        status: "open",
        startTime: new Date("2024-12-20T09:00:00"),
        endTime: new Date("2024-12-20T12:00:00"),
      },
      {
        evName: "Food Distribution",
        details: "Distribute food to families in need.",
        address: "Haifa Community Center",
        location: "Haifa",
        capacity: 30,
        organization: organizations[1]._id,
        status: "open",
        startTime: new Date("2024-12-22T10:00:00"),
        endTime: new Date("2024-12-22T14:00:00"),
      },
    ]);

    // Add events to organizations
    organizations[0].events.push(events[0]._id);
    organizations[1].events.push(events[1]._id);
    await Promise.all(organizations.map((org) => org.save()));

    // Assign volunteers to events
    events[0].volunteers.push(users[0]._id, users[1]._id);
    events[1].volunteers.push(users[2]._id, users[3]._id);
    await Promise.all(events.map((event) => event.save()));

    // Add events to users
    users[0].events.push(events[0]._id);
    users[1].events.push(events[0]._id);
    users[2].events.push(events[1]._id);
    users[3].events.push(events[1]._id);
    await Promise.all(users.map((user) => user.save()));

    // Create comments for events
    const comments = await Comment.insertMany([
      {
        comContent: "Amazing event! Had a great time helping out.",
        userId: users[0]._id,
        eventId: events[0]._id,
        rating: 5,
      },
      {
        comContent: "Well organized and meaningful.",
        userId: users[1]._id,
        eventId: events[0]._id,
        rating: 4,
      },
      {
        comContent: "Loved being part of this initiative.",
        userId: users[2]._id,
        eventId: events[1]._id,
        rating: 5,
      },
      {
        comContent: "Could be better, but overall great.",
        userId: users[3]._id,
        eventId: events[1]._id,
        rating: 3,
      },
    ]);

    // Add comments to events
    events[0].comments.push(comments[0]._id, comments[1]._id);
    events[1].comments.push(comments[2]._id, comments[3]._id);
    await Promise.all(events.map((event) => event.save()));

    console.log("Dummy data created successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating dummy data:", error);
    mongoose.connection.close();
  }
};

createDummyData();
