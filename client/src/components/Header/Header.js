import { Box, Heading, Text } from "@chakra-ui/react";

const Header = ({ title }) => {
  return (
    <Box mb="30px">
      <Heading as="h2" size="md" color="black.100" fontWeight="bold" mb="5px">
        {title}
      </Heading>
    </Box>
  );
};

export default Header;
