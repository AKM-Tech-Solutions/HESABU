import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import * as XLSX from "xlsx";
import Header from "components/Header/Header";

const Reports = ({ salesData }) => {
  const [dailySales, setDailySales] = useState({});
  const [topItems, setTopItems] = useState([]);
  const [exporting, setExporting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (salesData) {
      // Check if salesData exists
      const dailySalesData = {};
      salesData.forEach((sale) => {
        const saleDate = sale.date?.toLocaleDateString(); // Optional chaining
        if (saleDate) {
          if (dailySalesData[saleDate]) {
            dailySalesData[saleDate] += sale.amount;
          } else {
            dailySalesData[saleDate] = sale.amount;
          }
        }
      });
      setDailySales(dailySalesData);

      const itemCounts = salesData.reduce((acc, sale) => {
        acc[sale.item] = (acc[sale.item] || 0) + 1;
        return acc;
      }, {});
      const topItemsList = Object.entries(itemCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Get top 5 items
      setTopItems(topItemsList);
    }
  }, [salesData]);

  const handleExport = () => {
    setExporting(true);
    if (salesData && salesData.length > 0) {
      // Check if salesData exists and has data
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(salesData);
      XLSX.utils.book_append_sheet(wb, ws, "Sales Data");
      XLSX.writeFile(wb, "sales_summary.xlsx");
    } else {
      // Handle the case where there's no data to export (optional)
      console.warn("No data to export");
    }
    setExporting(false);
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
      <Box
        justifyContent="space-between"
        display="flex"
        pt={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Header title="MY REPORTS" />
      </Box>
      <Button onClick={onOpen} isDisabled={exporting}>
        See Daily Sales
      </Button>
      <Stack
        spacing={4}
        ml={2}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        {Object.entries(dailySales).map(([date, amount]) => (
          <Tr key={date}>
            <Td>{date}</Td>
            <Td>{amount}</Td>
          </Tr>
        ))}
      </Stack>
      <br />
      <Button onClick={handleExport} isDisabled={exporting}>
        Export to Excel
      </Button>
      <br />
      <br />
      <h2>Top Selling Items</h2>
      <Table>
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Total Sold</Th>
          </Tr>
        </Thead>
        <Tbody>
          {topItems.map(([item, count]) => (
            <Tr key={item}>
              <Td>{item}</Td>
              <Td>{count}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Reports;
