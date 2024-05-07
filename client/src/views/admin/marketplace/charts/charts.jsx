import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineUpload,
  AiOutlineCloseCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import BarChart from "components/charts/BarChart";

// actual data fetching logic
function fetchTransactions() {
  // Simulated some example data for display
  return [
    { id: 1, date: "2024-05-02", category: "Electronics", amount: 100 },
    { id: 2, date: "2024-05-01", category: "Clothing", amount: 50 },
    { id: 3, date: "2024-04-30", category: "Food", amount: 20 },
  ];
}

// Helper function to group transactions by category
function groupTransactions(transactions) {
  return transactions.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});
}

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    amount: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchedTransactions = fetchTransactions();
    setTransactions(fetchedTransactions);
    setCategoriesData(groupTransactions(fetchedTransactions));
  }, []);

  const handleCancelTransaction = (transactionId) => {
    // Implement logic to cancel transaction with id (update data)
    console.log(`Cancelling transaction ${transactionId}`);
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    );
    setTransactions(updatedTransactions);
    setCategoriesData(groupTransactions(updatedTransactions));
  };

  const handleInputChange = (event) => {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddTransaction = (event) => {
    event.preventDefault();
    // Implement logic to add new transaction (update data)
    console.log("Adding new transaction:", newTransaction);
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]); // Generate temporary id
    setNewTransaction({ date: "", category: "", amount: 0 }); // Clear form
    setCategoriesData(groupTransactions([...transactions, newTransaction]));
  };

  const handleBulkUpload = (event) => {
    // Implement logic to process uploaded CSV file (update data)
    const uploadedFile = event.target.files[0];
    console.log("Uploaded CSV file:", uploadedFile);
    // Parse CSV and update transactions and categories data
  };

  return (
    <Box pt={{ base: "base-180", md: "base-80", xl: "base-xl" }}>
      <Box
        justifyContent="space-between"
        display="flex"
        pt={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Heading>Transactions</Heading>
        <HStack spacing={2}>
          <Button onClick={onOpen}>Add Transaction</Button>
          <IconButton icon={<AiOutlineUpload />} onClick={onOpen} />
        </HStack>
      </Box>
      {/* Transaction List */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Category</Th>
            <Th>Amount</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.date}</Td>
              <Td>{transaction.category}</Td>
              <Td>${transaction.amount}</Td>
              <Td isNumeric>
                <IconButton
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  aria-label="Cancel transaction"
                  icon={<AiOutlineCloseCircle />}
                  onClick={() => handleCancelTransaction(transaction.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add Transaction Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="date">
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="category" mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="amount" mt={4}>
              <FormLabel>Amount ($)</FormLabel>
              <Input
                type="number"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTransaction}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={handleOpenModal}>Add Transaction</Button>

      {/* Bulk Upload */}
      <FormControl mt={4}>
        <FormLabel>Bulk Upload Transactions (CSV)</FormLabel>
        <Input type="file" onChange={handleBulkUpload} />
      </FormControl>

      {/* Summary */}
      <Box mt={8}>
        <Heading size="md">Category Summary</Heading>
        <VStack mt={4} spacing={2} align="start">
          {Object.entries(categoriesData).map(([category, total]) => (
            <HStack key={category}>
              <Text>{category}</Text>
              <Text>${total}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Chart */}
      <Box mt={8}>
        <Heading size="md">Category Wise Expenses</Heading>
        <BarChart data={categoriesData} />
      </Box>
    </Box>
  );
};

export default Transactions;
