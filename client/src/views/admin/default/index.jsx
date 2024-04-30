import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import { MdAddTask, MdBarChart } from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import { columnsDataCheck } from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";

import Header from "components/Header/Header";
import Loader from "components/loader/Loader";

export default function UserReports() {
  // //Loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      console.log("Setting loading to false");
      setLoading(false);
    }, 2500);
    return () => clearTimeout(loadingTimer); // Cleanup function
  }, []);
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {loading ? (
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="80px"
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Box
            justifyContent="space-between"
            pt={{ base: "130px", md: "80px", xl: "80px" }}
          >
            <Header title="SALES SUMMARY" />
            <SimpleGrid
              display="flex"
              gap="20px"
              mb="20px"
              padding="10px"
              columns={{ base: 3, md: 2, lg: 4, "2xl": 6 }}
            >
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg={boxBg}
                    icon={
                      <Icon
                        w="32px"
                        h="32px"
                        as={MdBarChart}
                        color={brandColor}
                      />
                    }
                  />
                }
                name="Profit"
                value="$350.4"
              />

              <MiniStatistics growth="+23%" name="Sales" value="$574.34" />

              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                    icon={
                      <Icon w="28px" h="28px" as={MdAddTask} color="white" />
                    }
                  />
                }
                name="Transactions"
                value="154"
              />
            </SimpleGrid>{" "}
          </Box>
          <Box justifyContent="space-between" alignItems="center">
            <Header title="STOCK REPORT" />
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 2 }}
              gap="20px"
              mb="20px"
            >
              <TotalSpent />
              <WeeklyRevenue />
            </SimpleGrid>
            <Box justifyContent="space-between" alignItems="center">
              <Header title="RECENT TRANSACTIONS" />
              <SimpleGrid
                columns={{ base: 1, md: 1, xl: 2 }}
                gap="20px"
                mb="20px"
              >
                <CheckTable
                  columnsData={columnsDataCheck}
                  tableData={tableDataCheck}
                />
                <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
                  <DailyTraffic />
                  <PieCard />
                </SimpleGrid>
              </SimpleGrid>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
