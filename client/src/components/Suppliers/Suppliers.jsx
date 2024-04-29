import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  ModalFooter,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const storedSuppliers = localStorage.getItem("suppliers");
    if (storedSuppliers) {
      setSuppliers(JSON.parse(storedSuppliers)); // Parse from JSON
    }
  }, []);
  //added to save the data locally
  const handleSaveSuppliers = () => {
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
  };

  const handleAddSupplier = (name, phone, item) => {
    // Basic validation for name and phone number (can be extended)
    if (!name || !phone || !item) {
      toast({
        title: "Error",
        description: "Please enter a name and phone number and item .",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSuppliers([...suppliers, { name, phone, item }]);
    onClose();
  };

  const handleRemoveSupplier = (index) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers.splice(index, 1);
    setSuppliers(updatedSuppliers);
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Box
          justifyContent="space-between"
          display="flex"
          pt={{ base: "130px", md: "80px", xl: "80px" }}
        >
          <Heading>Suppliers</Heading>
          <Button colorScheme="blue" onClick={onOpen}>
            Add Supplier
          </Button>
        </Box>

        <VStack spacing={4} mt={4}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Item Supplied</Th>
                <Th isNumeric></Th> {/* for the button */}
              </Tr>
            </Thead>
            <Tbody>
              {suppliers.map((supplier, index) => (
                <Tr key={index}>
                  <Td>{supplier.name}</Td>
                  <Td>{supplier.phone}</Td>
                  <Td>{supplier.item}</Td>
                  <Td isNumeric>
                    <IconButton
                      icon={<RiDeleteBin6Line />}
                      variant="ghost"
                      aria-label="Delete Supplier"
                      onClick={() => handleRemoveSupplier(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Supplier</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input id="name" placeholder="Enter Supplier Name" />
                  <FormErrorMessage>Name is required.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Input id="phone" placeholder="Enter Phone Number" />
                  <FormErrorMessage>Phone number is required.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="phone">Item Supplied</FormLabel>
                  <Input id="item" placeholder="Item" />
                  <FormErrorMessage>Item is required.</FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>

              <Button
                colorScheme="blue"
                onClick={() => {
                  const name = document.getElementById("name").value;
                  const phone = document.getElementById("phone").value;
                  const item = document.getElementById("item").value;

                  const addedSupplier = handleAddSupplier(name, phone, item);
                  if (addedSupplier) {
                    handleSaveSuppliers();
                    onClose();
                    toast({
                      title: "Success",
                      description: "Supplier added successfully!",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Add Supplier
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Suppliers;
