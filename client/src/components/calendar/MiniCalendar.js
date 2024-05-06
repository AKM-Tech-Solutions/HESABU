import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { Text, Icon, Box } from "@chakra-ui/react";

// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Header from "components/Header/Header";
// Custom components

export default function MiniCalendar(props) {
  const { selectRange, ...rest } = props;
  const [value, onChange] = useState(new Date());
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
        <Header title="Calendar" />
      </Box>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color="brand.500"></Text>}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
    </Box>
  );
}
