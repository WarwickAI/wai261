// Import ChakraUI components we want to use
import { Box, Text, Flex } from "@chakra-ui/react";

interface MessageProps {
  contents: string;
  user: string;
  time: Date;
}

// This function is our custom Message component
const Message: React.FC<MessageProps> = (props) => {
  return (
    // Align message left or right dependent on who sent it
    <Box
      alignSelf={props.user === "me" ? "end" : "start"}
      backgroundColor={props.user === "me" ? "blue" : "gray"}
      borderRadius="lg"
      px={2}
      py={1}
      mb={2}
      w={60}
    >
      <Text color="white" fontWeight={800}>
        {props.contents}
      </Text>
      <Flex justifyContent="space-between">
        <Text color="white" size="sm" fontWeight={300}>
          {props.user}
        </Text>
        <Text color="white" fontWeight={300}>
          {props.time.toDateString()} {props.time.toLocaleTimeString()}
        </Text>
      </Flex>
    </Box>
  );
};

// Export this component so that we can import it elsewhere
export default Message;
