import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Header from "components/Header/Header";

const Transactions = () => {
  //colors and themes
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Box
        justifyContent="space-between"
        display="flex"
        pt={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Header title="TRANSACTIONS" />
      </Box>
    </Box>
  );
};

export default Transactions;
