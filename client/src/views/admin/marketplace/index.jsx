import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";

import Header from "components/Header/Header";
import SearchBar from "components/Search";

const Inventory = () => {
  // Inventory data
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  const toast = useToast();

  const handleAddInventory = (date, name, price, qty) => {
    // Basic validation for name and phone number (can be extended)
    if (!date || !name || !price || !qty) {
      toast({
        title: "Error",
        description: "Please enter date, name , price and quantity.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUsers([...users, { date, name, price, qty }]);
    onClose();
  };

  // Add product modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // New product data
  const [newProduct, setNewProduct] = useState({
    date: "",
    name: "",
    price: "",
    qty: "",
    sum: "",
    total: "",
  });

  const handleChange = (event) => {
    const selectedDate = event.target.value; // Access the Date object directly
    setNewProduct((prev) => ({ ...prev, date: selectedDate }));
  };

  const handleTotal = () => {
    const { price, qty } = newProduct;
    if (price && qty) {
      setNewProduct((prev) => ({
        ...prev,
        total: parseFloat(price) * parseInt(qty),
      }));
    }
  };

  const handleSaveProduct = () => {
    const { date, name, price, qty, total } = newProduct;
    // Update inventory state with the new product data
    setInventory([...inventory, { date, name, price, qty, total }]);
    onClose(); // Close the modal
    setNewProduct({
      date: "",
      name: "",
      price: "",
      qty: "",
      total: "",
    });
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
        <Button onClick={onOpen}>Add Product</Button>
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

        {/* Map through the inventory data to display history items */}
        {inventory.map((item, index) => (
          <HistoryItem
            key={index}
            name={item.name}
            date={item.date}
            image={item.image}
            price={item.price}
            qty={item.qty}
            total={item.sum}
          />
        ))}
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>
              <FormControl>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={newProduct.date}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">Item name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">Price</FormLabel>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  value={newProduct.price}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">Quantity</FormLabel>
                <Input
                  id="qty"
                  type="number"
                  name="qty"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, qty: e.target.value })
                  }
                  value={newProduct.qty}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">Total</FormLabel>
                <Input
                  id="total"
                  type="number"
                  name="total"
                  value={newProduct.total}
                  disabled
                />
              </FormControl>

              <button
                className="btn btn-success"
                type="submit"
                onClick={handleTotal}
                style={{
                  backgroundColor: "rgb(99, 99, 252)",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <span style={{ color: "white" }}>Add</span>
              </button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                // Pass arguments to handleSaveProduct instead of relying on savedData
                const savedData = handleSaveProduct(
                  document.getElementById("date").value,
                  document.getElementById("name").value,
                  document.getElementById("price").value,
                  document.getElementById("qty").value,
                  document.getElementById("total").value
                );
                if (savedData) {
                  // Check if saving was successful (optional)
                  setInventory([...inventory, savedData]); // Update inventory
                }
                handleAddInventory(savedData); // Call handleAddInventory with saved data (if needed)
              }}
            >
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Inventory;
