import { useEffect, useState } from "react";

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
import axios from "axios";

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

  useEffect(() => {
    axios.get("http://localhost:5000/messages").then((res) => {
      console.log(res);
      setMessages(
        res.data.map((message: any) => {
          return {
            contents: message.contents,
            user: message.user,
            time: new Date(message.time),
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    const messagesRefreshInterval = setInterval(() => {
      axios.get("http://localhost:5000/messages").then((res) => {
        console.log(res);
        setMessages(
          res.data.map((message: any) => {
            return {
              contents: message.contents,
              user: message.user,
              time: new Date(message.time),
            };
          })
        );
      });
    }, 500);
    return () => {
      clearInterval(messagesRefreshInterval);
    };
  }, []);

  // Handle adding a new message and querying hugging face for NLP analysis
  const handleMessages = async () => {
    const res = await axios.post("http://localhost:5000/addMessage", {
      contents: msg,
      user: "me",
      time: new Date(),
    });
    setMessages(
      res.data.map((message: any) => {
        return {
          contents: message.contents,
          user: message.user,
          time: new Date(message.time),
        };
      })
    );
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
