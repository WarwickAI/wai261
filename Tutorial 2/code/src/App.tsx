import { useState } from "react";

// Import ChakraUI components we want to use
import {
  ChakraProvider,
  Heading,
  Center,
  Input,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";

// Import our custom Message component that we created
import Message from "./Message";

// Parameters for hugging face
const API_URL =
  "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base";
const HEADERS = new Headers();
HEADERS.append("Authorization", "Bearer <yourAccessToken>");

// Type for each message
interface MessageObject {
  contents: string;
  user: string;
  time: Date;
}

// This function is the root of our App
function App() {
  // Current value in the text input
  const [msg, setMsg] = useState<string>("");
  // Messages currently in the chatbot
  const [messages, setMessages] = useState<MessageObject[]>([]);

  // Handle adding a new message and querying hugging face for NLP analysis
  const handleMessages = async () => {
    // New message generated from user input
    let newMessage: MessageObject = {
      contents: msg,
      user: "me",
      time: new Date(),
    };

    // Send request to Hugging Face for NLP analysis
    const requestInit: RequestInit = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ inputs: msg }),
    };
    const response = await fetch(API_URL, requestInit);
    const json = await response.json();
    console.log(json);

    // In this case, get the list of labels and their scores/confidences
    const inferences = json[0];

    // Extract the most confident/highest scored label
    const maxInference = inferences.reduce((prev: any, curr: any) => {
      return prev.score > curr.score ? prev : curr;
    });

    console.log(maxInference);

    // Create the new message from the "AI"
    let aiMessage: MessageObject = {
      contents: "Your message was " + maxInference.label,
      user: "AI",
      time: new Date(),
    };

    // Modify messages state with these two new messages
    setMessages([...messages, newMessage, aiMessage]);
  };

  return (
    <ChakraProvider>
      <Center>
        <Box w="md" boxShadow="5px 5px 15px 4px rgba(0,0,0,0.2)" p={6} m={6}>
          <Heading mb={4} textAlign="center">
            WAI261 ChatBot
          </Heading>
          <Flex flexDirection="column" w="full" mb={4}>
            {messages.map((message, index) => (
              <Message
                key={index}
                contents={message.contents}
                user={message.user}
                time={message.time}
              />
            ))}
          </Flex>
          <Flex>
            <Input
              placeholder="Enter Message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button
              backgroundColor="blue"
              color="white"
              ml={2}
              onClick={handleMessages}
            >
              Send
            </Button>
          </Flex>
        </Box>
      </Center>
    </ChakraProvider>
  );
}
export default App;
