import Chat from "../models/chatModel.js"; // ייבוא מודל של צ'אט

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // עמותה שמחוברת לצ'אט
    socket.on("join_chat", (organizationId) => {
      socket.join(organizationId); // הצטרפות לחדר של עמותה לפי ID
      console.log(`User joined the chat for organization ${organizationId}`);
    });

    // הודעה חדשה
    socket.on("send_message", async (messageData) => {
      const { organizationId, userId, content } = messageData;

      // שמירה במונגוס
      try {
        let chat = await Chat.findOne({ organization: organizationId });

        if (!chat) {
          chat = new Chat({
            organization: organizationId,
            messages: [],
          });
        }

        chat.messages.push({
          sender: userId,
          content: content,
        });

        await chat.save(); // שמירת ההודעה במונגוס

        // שליחה לכל מי שברשימת הצ'אט של העמותה
        io.to(organizationId).emit("new_message", { sender: userId, content });

      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // התנתקות
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
