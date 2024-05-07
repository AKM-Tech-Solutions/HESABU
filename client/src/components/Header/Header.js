import { Box, Heading } from "@chakra-ui/react";

const Header = ({ title }) => {
  return (
    <Box mb="30px">
      <Heading
        as="h2"
        size="md"
        color="black.100"
        fontWeight="bold"
        mb="5px"
        fontSize="xl"
      >
        {title}
      </Heading>
    </Box>
  );
};

export default Header;
