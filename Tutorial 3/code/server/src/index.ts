import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

interface MessageObject {
  contents: string;
  user: string;
  time: Date;
}

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

var messages: MessageObject[] = [];

// Test route at localhost:5000
app.get("/", (_, res) => {
  res.status(200).send("Hello WAI261");
});

// Get messages
app.get("/messages", (_, res) => {
  res.status(200).send(messages);
});

// Add message
app.post("/addMessage", (req, res) => {
  console.log(req.body);

  // Create new message from info sent
  const newMessage: MessageObject = {
    contents: req.body.contents,
    user: req.body.user,
    time: new Date(req.body.time),
  };

  // Add this new message
  messages.push(newMessage);

  // Request (not waited for to finish) to get AI response to message
  axios
    .post(
      "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
      {
        inputs: req.body.contents,
      },
      {
        headers: {
          Authorization: "Bearer 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",
        },
      }
    )
    .then((response) => {
      try {
        // Get emotion labels
        const labels = response.data[0];
        console.log(labels);

        // Extract the most confident/highest scored label
        const maxLabel = labels.reduce((prev: any, curr: any) => {
          return prev.score > curr.score ? prev : curr;
        });

        console.log(maxLabel);

        // Create the new message from the "AI"
        let aiMessage: MessageObject = {
          contents: "Your message was " + maxLabel.label,
          user: "AI",
          time: new Date(),
        };
        // Add message
        messages.push(aiMessage);
      } catch (e) {
        console.log(e);
      }
    });

  // Send updated messages back (not guaranteed to include new AI message tho)
  res.status(200).send(messages);
});

app.listen(port, () => console.log(`Running on port ${port}`));
