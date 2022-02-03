import * as React from "react";

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

// This function is the root of our App
function App() {
  return (
    <ChakraProvider>
      <Center>
        <Box w="md" boxShadow="5px 5px 15px 4px rgba(0,0,0,0.2)" p={6} m={6}>
          <Heading mb={4} textAlign="center">
            WAI261 ChatBot
          </Heading>
          <Flex flexDirection="column" w="full" mb={4}>
            <Message />
            <Message />
            <Message />
            <Message />
          </Flex>
          <Flex>
            <Input
              placeholder="Enter Message..."
              onChange={(e) => console.log(e.target.value)}
            />
            <Button
              backgroundColor="blue"
              color="white"
              ml={2}
              onClick={() => console.log("Button Clicked")}
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
