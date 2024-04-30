import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  AreaChart as ChakraChart,
  AreaChart,
  Area,
  BarChart,
  Bar,
  SimpleGrid,
} from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Reports = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [weeklySales, setWeeklySales] = useState(0);
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [supplierPerformance, setSupplierPerformance] = useState([]);
  const [isOpen, setIsOpen] = useDisclosure();
  const toast = useToast();

  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    // Simulate fetching data from inventory and suppliers API
    const fetchData = async () => {
      const inventoryResponse = await fetch("/api/inventory");
      const inventoryData = await inventoryResponse.json();
      setInventoryData(inventoryData);

      const suppliersResponse = await fetch("/api/suppliers");
      const suppliersData = await suppliersResponse.json();
      setSuppliersData(suppliersData);

      // Calculate weekly sales (example logic)
      const totalSalesThisWeek = inventoryData.reduce(
        (acc, item) => acc + parseFloat(item.price) * parseInt(item.qty),
        0
      );
      setWeeklySales(totalSalesThisWeek);

      // Identify top suppliers (example logic)
      const supplierSalesMap = {};
      inventoryData.forEach((item) => {
        if (supplierSalesMap[item.supplier]) {
          supplierSalesMap[item.supplier] +=
            parseFloat(item.price) * parseInt(item.qty);
        } else {
          supplierSalesMap[item.supplier] =
            parseFloat(item.price) * parseInt(item.qty);
        }
      });
      const topSuppliersArray = Object.entries(supplierSalesMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      setTopSuppliers(topSuppliersArray);

      // Calculate supplier performance (example logic)
      const supplierPerformanceData = suppliersData.map((supplier) => {
        const supplierInventory = inventoryData.filter(
          (item) => item.supplier === supplier.name
        );
        const totalSales = supplierInventory.reduce(
          (acc, item) => acc + parseFloat(item.price) * parseInt(item.qty),
          0
        );
        return {
          name: supplier.name,
          sales: totalSales,
        };
      });
      setSupplierPerformance(supplierPerformanceData);
    };

    fetchData();
  }, []);

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(24);
    doc.text("Inventory and Supplier Report", 20, 20);

    // Add weekly sales
    doc.setFontSize(16);
    doc.text("Weekly Sales:", 20, 40);
    doc.text(`$${weeklySales.toFixed(2)}`, 50, 40);

    // Add top suppliers table
    doc.autoTable({
      startY: 60,
      head: [["Supplier", "Sales"]],
      body: topSuppliers.map((supplier) => [
        supplier[0],
        `$${supplier[1].toFixed(2)}`,
      ]),
    });

    // Add supplier performance table
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [["Supplier", "Sales"]],
      body: supplierPerformance.map((supplier) => [
        supplier.name,
        `$${supplier.sales.toFixed(2)}`,
      ]),
    });
  };
  return (
    <Box pt="10px">
      <Flex justifyContent="space-between" mb="20px">
        <Text fontSize="xl" fontWeight="600" color={textColor}>
          Reports
        </Text>
        <Button onClick={() => setIsOpen(true)}>Download Report</Button>
      </Flex>

      <Box>
        <Text fontSize="lg" fontWeight="500" mb="10px" color={textColor}>
          Weekly Sales
        </Text>
        <Text fontSize="2xl" fontWeight="600" color={textColor}>
          ${weeklySales.toFixed(2)}
        </Text>
      </Box>

      <Box mt="20px">
        <Text fontSize="lg" fontWeight="500" mb="10px" color={textColor}>
          Top Suppliers
        </Text>
        <SimpleGrid columns={2} gap="10px">
          {/* Use AreaChart or BarChart instead of PieChart */}
          <AreaChart width="300px" height="300px" t>
            <Area
              data={[topSuppliers.map((supplier) => supplier[1])]}
              color={["#C8A2C8", "#F0E4EC", "#D3D3D3"]}
              stroke="transparent"
            />
          </AreaChart>

          <VStack alignItems="flex-start">
            {topSuppliers.map((supplier) => (
              <Text key={supplier[0]} color={textColor} mb="5px">
                {supplier[0]} - ${supplier[1].toFixed(2)}
              </Text>
            ))}
          </VStack>
        </SimpleGrid>
      </Box>

      <Box mt="20px">
        <Text fontSize="lg" fontWeight="500" mb="10px" color={textColor}>
          Supplier Performance
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Supplier</Th>
              <Th>Sales</Th>
            </Tr>
          </Thead>
          <Tbody>
            {supplierPerformance.map((supplier) => (
              <Tr key={supplier.name}>
                <Td>{supplier.name}</Td>
                <Td>$${supplier.sales.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download Report (PDF)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Click the button below to download the report as a PDF.</Text>
            <Button mt="10px" onClick={handleDownloadReport}>
              Download Report
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Reports;
