import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Grid,
  theme,
  Input,
  Button,
  IconButton,
  HStack,
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
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";

import Header from "components/Header/Header";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
          {suppliers.map((supplier, index) => (
            <Grid key={index} templateColumns="repeat(3, 1fr)" gap={4}>
              <Box>{supplier.name}</Box>

              <Box gap={6}>{supplier.phone}</Box>
              <Box>{supplier.item}</Box>
              <IconButton
                icon={<RiDeleteBin6Line />}
                variant="ghost"
                onClick={() => handleRemoveSupplier(index)}
              />
            </Grid>
          ))}
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
                onClick={() =>
                  handleAddSupplier(
                    document.getElementById("name").value,
                    document.getElementById("phone").value,
                    document.getElementById("item").value
                  )
                }
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
