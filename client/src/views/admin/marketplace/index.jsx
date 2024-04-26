import { useState } from "react";
import { Box, Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Nft6 from "assets/img/nfts/Nft6.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import Header from "components/Header/Header";
import SearchBar from "components/Search";
import AddNewProduct from "views/AddNewProduct";

const Inventory = () => {
  //AddNewProduct button
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Box
        justifyContent="space-between"
        display="flex"
        pt={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Header title="INVENTORY" />
        <SearchBar />
        <Button onClick={handleOpen}>
          Add Product
          {isOpen && <AddNewProduct />}
        </Button>
      </Box>

      <Card p="10px" marginTop="10px">
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify="space-between"
          w="100%"
          px="22px"
          py="18px"
        >
          <Text color={textColor} fontSize="xl" fontWeight="600">
            History
          </Text>
          <Button variant="action">See all</Button>
        </Flex>
        <HistoryItem
          name="Colorful Heaven"
          author="By Mark Benjamin"
          date="30s ago"
          image={Nft5}
          price="0.91 ETH"
        />
        <HistoryItem
          name="Abstract Colors"
          author="By Esthera Jackson"
          date="58s ago"
          image={Nft1}
          price="0.91 ETH"
        />
        <HistoryItem
          name="ETH AI Brain"
          author="By Nick Wilson"
          date="1m ago"
          image={Nft2}
          price="0.91 ETH"
        />
        <HistoryItem
          name="Swipe Circles"
          author="By Peter Will"
          date="1m ago"
          image={Nft4}
          price="0.91 ETH"
        />
        <HistoryItem
          name="Mesh Gradients "
          author="By Will Smith"
          date="2m ago"
          image={Nft3}
          price="0.91 ETH"
        />
        <HistoryItem
          name="3D Cubes Art"
          author="By Manny Gates"
          date="3m ago"
          image={Nft6}
          price="0.91 ETH"
        />{" "}
      </Card>
    </Box>
  );
};

export default Inventory;
