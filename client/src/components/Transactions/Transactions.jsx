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
import { AiOutlineUpload, AiOutlineCloseCircle } from "react-icons/ai";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchedTransactions = fetchTransactions();
    setTransactions(fetchedTransactions);
    setCategoriesData(groupTransactions(fetchedTransactions));
  }, []);

  const handleCancelTransaction = (transactionId) => {
    // Implement logic to cancel transaction with id
    console.log(`Cancelling transaction ${transactionId}`);
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
        <Heading>Transactions</Heading>
      </Box>
      <Flex justifyContent="space-between" mb={4}>
        <Button onClick={onOpen}>Add Transactions</Button>
      </Flex>
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
              <Td isNumeric>{transaction.amount}</Td>
              <Td>
                {transaction.cancelled ? (
                  <Text color="gray.400">Cancelled</Text>
                ) : (
                  <IconButton
                    icon={<AiOutlineCloseCircle />}
                    colorScheme="red"
                    size="sm"
                    isDisabled={true} // Disable button after cancellation
                    onClick={() => handleCancelTransaction(transaction.id)}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4}>
        <Heading size="md">Transactions by Category</Heading>
        <BarChart
          type="bar" // Change type to "bar"
          data={{
            labels: Object.keys(categoriesData),
            datasets: [{ data: Object.values(categoriesData) }],
          }}
        />
      </Box>
      {/* Add Transactions Modal */}
      <VStack spacing={4} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <Heading size="md">Bulk Upload Transactions</Heading>
        {/*  bulk upload implementation  */}
        <FormControl>
          <FormLabel htmlFor="upload">Upload CSV</FormLabel>
          <InputGroup>
            <Input type="file" id="upload" />
            <IconButton icon={<AiOutlineUpload />} />
          </InputGroup>
        </FormControl>
        <HStack justifyContent="flex-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue">Upload</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Transactions;
