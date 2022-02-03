// Import ChakraUI components we want to use
import { Box, Text, Flex } from "@chakra-ui/react";

// This function is our custom Message component
function Message() {
  return (
    // Align message left or right dependent on who sent it
    <Box alignSelf="end" backgroundColor="blue" borderRadius="lg" px={2} py={1} mb={2} w={60}>
      <Text color="white" fontWeight={800}>
        Message
      </Text>
      <Flex justifyContent="space-between">
        <Text color="white" size="sm" fontWeight={300}>
          user
        </Text>
        <Text color="white" fontWeight={300}>
          time
        </Text>
      </Flex>
    </Box>
  );
}

// Export this component so that we can import it elsewhere
export default Message;
