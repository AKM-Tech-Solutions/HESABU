import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

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
  Toast,
  VStack,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import "./index.css";
import Card from "components/card/Card.js";

import Header from "components/Header/Header";
import SearchBar from "components/Search";

Chart.register(...registerables);

const Inventory = () => {
  // Inventory data
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  const toast = useToast();

  //handle local storage
  useEffect(() => {
    const storedInventory = localStorage.getItem("inventory");
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
  }, []);

  // Save data to localStorage whenever inventory change
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]); //  only runs when inventory change

  const handleSaveInventory = () => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  };

  const handleAddInventory = (date, name, price, qty) => {
    // Basic validation for name and phone number (can be extended)
    if (!date || !name || !price || !qty) {
      toast({
        title: "Error",
        description: "Please enter date, name , price and quantity .",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUsers([...users, { date, name, price, qty }]);
    onClose();
    handleSaveInventory();
  };

  // Add product modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // New product data
  const [newProduct, setNewProduct] = useState({
    date: "",
    name: "",
    price: "",
    qty: "",
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

  // Chart Data - Calculate total quantity per date
  const chartData = {
    labels: inventory
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date ascending
      .map((item) => item.date),
    datasets: [
      {
        label: "Total Quantity",
        data: inventory
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date ascending
          .reduce((acc, item) => {
            const existingIndex = acc.findIndex((d) => d.date === item.date);
            if (existingIndex !== -1) {
              acc[existingIndex].quantity += item.qty;
            } else {
              acc.push({ date: item.date, quantity: item.qty });
            }
            return acc;
          }, [])
          .map((item) => item.quantity),
        backgroundColor: "#6AD2FF",
        borderColor: "#6AD2FF",
        borderWidth: 1,
      },
    ],
  };

  const InventoryCharts = ({ chartData }) => {
    return (
      <Card>
        <Bar data={chartData} />
      </Card>
    );
  };

  return (
    <Box
      pt={
        window.innerWidth < 768
          ? "base-180"
          : window.innerWidth < 1200
          ? "base-80"
          : "base-xl"
      }
    >
      {" "}
      <Box
        justifyContent="space-between"
        display="flex"
        pt={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Header title=" MY INVENTORY" color={textColor} />
        <SearchBar />
        <Button colorScheme="teal" onClick={onOpen}>
          Add Product
        </Button>
      </Box>
      <Box p="4">
        <Box mt="4">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inventory.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.date}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.qty}</Td>
                  <Td>{item.total}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {/* Modal for adding new product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={newProduct.date}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  value={newProduct.qty}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, qty: e.target.value })
                  }
                />
              </FormControl>
              <Button onClick={handleTotal}>Calculate Total</Button>
              <Text>Total: {newProduct.total}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveProduct}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card>
        <InventoryCharts chartData={chartData} />
      </Card>
    </Box>
  );
};

export default Inventory;
