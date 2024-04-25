/*!  _   _  ___  ____  ___ ________  _   _   _   _ ___ | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| | |_| | | | | |_) || |  / / | | |  \| | | | | || |
  |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
//  |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

// =========================================================
// * Horizon UI - v1.1.0
// =========================================================

// * Product Page: https://www.horizon-ui.com/
// * Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

// * Designed and Coded by Simmmple

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// import React from "react";

// // Chakra imports
// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Link,
//   Text,
//   useColorModeValue,
//   SimpleGrid,
// } from "@chakra-ui/react";

// // Custom components
// import Banner from "views/admin/marketplace/components/Banner";
// import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
// import HistoryItem from "views/admin/marketplace/components/HistoryItem";
// import NFT from "components/card/NFT";
// import Card from "components/card/Card.js";

// // Assets
// import Nft1 from "assets/img/nfts/Nft1.png";
// import Nft2 from "assets/img/nfts/Nft2.png";
// import Nft3 from "assets/img/nfts/Nft3.png";
// import Nft4 from "assets/img/nfts/Nft4.png";
// import Nft5 from "assets/img/nfts/Nft5.png";
// import Nft6 from "assets/img/nfts/Nft6.png";
// import Avatar1 from "assets/img/avatars/avatar1.png";
// import Avatar2 from "assets/img/avatars/avatar2.png";
// import Avatar3 from "assets/img/avatars/avatar3.png";
// import Avatar4 from "assets/img/avatars/avatar4.png";
// import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
// import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

// export default function Marketplace() {
//   // Chakra Color Mode
//   const textColor = useColorModeValue("secondaryGray.900", "white");
//   const textColorBrand = useColorModeValue("brand.500", "white");
//   return (
//     <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
//       {/* Main Fields */}
//       <Grid
//         mb='20px'
//         gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
//         gap={{ base: "20px", xl: "20px" }}
//         display={{ base: "block", xl: "grid" }}>
//         <Flex
//           flexDirection='column'
//           gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
//           <Banner />
//           <Flex direction='column'>
//             <Flex
//               mt='45px'
//               mb='20px'
//               justifyContent='space-between'
//               direction={{ base: "column", md: "row" }}
//               align={{ base: "start", md: "center" }}>
//               <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
//                 Trending NFTs
//               </Text>
//               <Flex
//                 align='center'
//                 me='20px'
//                 ms={{ base: "24px", md: "0px" }}
//                 mt={{ base: "20px", md: "0px" }}>
//                 <Link
//                   color={textColorBrand}
//                   fontWeight='500'
//                   me={{ base: "34px", md: "44px" }}
//                   to='#art'>
//                   Art
//                 </Link>
//                 <Link
//                   color={textColorBrand}
//                   fontWeight='500'
//                   me={{ base: "34px", md: "44px" }}
//                   to='#music'>
//                   Music
//                 </Link>
//                 <Link
//                   color={textColorBrand}
//                   fontWeight='500'
//                   me={{ base: "34px", md: "44px" }}
//                   to='#collectibles'>
//                   Collectibles
//                 </Link>
//                 <Link color={textColorBrand} fontWeight='500' to='#sports'>
//                   Sports
//                 </Link>
//               </Flex>
//             </Flex>
//             <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
//               <NFT
//                 name='Abstract Colors'
//                 author='By Esthera Jackson'
//                 bidders={[
//                   Avatar1,
//                   Avatar2,
//                   Avatar3,
//                   Avatar4,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                 ]}
//                 image={Nft1}
//                 currentbid='0.91 ETH'
//                 download='#'
//               />
//               <NFT
//                 name='ETH AI Brain'
//                 author='By Nick Wilson'
//                 bidders={[
//                   Avatar1,
//                   Avatar2,
//                   Avatar3,
//                   Avatar4,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                 ]}
//                 image={Nft2}
//                 currentbid='0.91 ETH'
//                 download='#'
//               />
//               <NFT
//                 name='Mesh Gradients '
//                 author='By Will Smith'
//                 bidders={[
//                   Avatar1,
//                   Avatar2,
//                   Avatar3,
//                   Avatar4,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                 ]}
//                 image={Nft3}
//                 currentbid='0.91 ETH'
//                 download='#'
//               />
//             </SimpleGrid>
//             <Text
//               mt='45px'
//               mb='36px'
//               color={textColor}
//               fontSize='2xl'
//               ms='24px'
//               fontWeight='700'>
//               Recently Added
//             </Text>
//             <SimpleGrid
//               columns={{ base: 1, md: 3 }}
//               gap='20px'
//               mb={{ base: "20px", xl: "0px" }}>
//               <NFT
//                 name='Swipe Circles'
//                 author='By Peter Will'
//                 bidders={[
//                   Avatar1,
//                   Avatar2,
//                   Avatar3,
//                   Avatar4,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                 ]}
//                 image={Nft4}
//                 currentbid='0.91 ETH'
//                 download='#'
//               />
//               <NFT
//                 name='Colorful Heaven'
//                 author='By Mark Benjamin'
//                 bidders={[
//                   Avatar1,
//                   Avatar2,
//                   Avatar3,
//                   Avatar4,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                 ]}
//                 image={Nft5}
//                 currentbid='0.91 ETH'
//                 download='#'
//               />
//               <NFT
//                 name='3D Cubes Art'
//                 author='By Manny Gates'
//                 bidders={[
//                   Avatar1,
//                   Avatar2,
//                   Avatar3,
//                   Avatar4,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                 ]}
//                 image={Nft6}
//                 currentbid='0.91 ETH'
//                 download='#'
//               />
//             </SimpleGrid>
//           </Flex>
//         </Flex>
//         <Flex
//           flexDirection='column'
//           gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
//           <Card px='0px' mb='20px'>
//             <TableTopCreators
//               tableData={tableDataTopCreators}
//               columnsData={tableColumnsTopCreators}
//             />
//           </Card>
//           <Card p='0px'>
//             <Flex
//               align={{ sm: "flex-start", lg: "center" }}
//               justify='space-between'
//               w='100%'
//               px='22px'
//               py='18px'>
//               <Text color={textColor} fontSize='xl' fontWeight='600'>
//                 History
//               </Text>
//               <Button variant='action'>See all</Button>
//             </Flex>

//             <HistoryItem
//               name='Colorful Heaven'
//               author='By Mark Benjamin'
//               date='30s ago'
//               image={Nft5}
//               price='0.91 ETH'
//             />
//             <HistoryItem
//               name='Abstract Colors'
//               author='By Esthera Jackson'
//               date='58s ago'
//               image={Nft1}
//               price='0.91 ETH'
//             />
//             <HistoryItem
//               name='ETH AI Brain'
//               author='By Nick Wilson'
//               date='1m ago'
//               image={Nft2}
//               price='0.91 ETH'
//             />
//             <HistoryItem
//               name='Swipe Circles'
//               author='By Peter Will'
//               date='1m ago'
//               image={Nft4}
//               price='0.91 ETH'
//             />
//             <HistoryItem
//               name='Mesh Gradients '
//               author='By Will Smith'
//               date='2m ago'
//               image={Nft3}
//               price='0.91 ETH'
//             />
//             <HistoryItem
//               name='3D Cubes Art'
//               author='By Manny Gates'
//               date='3m ago'
//               image={Nft6}
//               price='0.91 ETH'
//             />
//           </Card>
//         </Flex>
//       </Grid>
//       {/* Add Product */}
//     </Box>
//   );
// }
import { useState } from "react";
import { Box, Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Nft6 from "assets/img/nfts/Nft6.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [users] = useState([]);
  const [name, setName] = useState();

  const [sum, setSum] = useState();

  function Calculation() {
    users.push({ date, name, qty, price, sum });

    const total = users.reduce((total, user) => {
      total += Number(user.sum);
      return total;
    }, 0);

    setTotal(total);

    setName(""); //the input fields are cleared
    setQty("");
    setPrice("");
    setSum("");
    setDate("");
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
  };
  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      calculateTotal(newPrice, qty);
    }
  };

  // Event handler for quantity selection
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
      calculateTotal(price, newQuantity);
    }
  };

  // Calculate the total based on price and quantity
  const calculateTotal = (price, qty) => {
    const newTotal = price * qty;
    setSum(newTotal);
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Card p="0px">
        <div className="container-fluid text-center ">
          <div className="row">
            <div className="col-sm-8">
              <table className="table table-bordered text-[20px] text-black ">
                <h3
                  align="left"
                  className="text-[36px] text-white font-semibold"
                >
                  {" "}
                  New Stock{" "}
                </h3>
                <tr>
                  <th>Date</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Option</th>
                </tr>
                <tr className="gap-3">
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date"
                      value={date.toLocaleString()}
                      onChange={handleDateChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Item Name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Price"
                      value={price}
                      onChange={handlePriceChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Qty"
                      value={qty}
                      onChange={handleQuantityChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={sum}
                      className="form-control"
                      placeholder="Enter Total"
                      id="total_cost"
                      name="total_cost"
                      disabled
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={Calculation}
                      style={{
                        backgroundColor: "rgb(99, 99, 252)",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <span style={{ color: "white" }}>Add</span>
                    </button>
                  </td>
                </tr>
              </table>
              <h3 align="left"> Products </h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Item Name</th>

                    <th>Price</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.name}</td>
                      <td>{row.price}</td>

                      <td>{row.qty}</td>
                      <td>{row.sum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-sm-4">
              <div className="form-group" align="left">
                <h3>Total</h3>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Total"
                  required
                  disabled
                  value={total}
                />
                <br />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={refreshPage}
                  style={{
                    backgroundColor: "rgb(99, 99, 252)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <span style={{ color: "white" }}>Export</span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
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
        <HistoryItem
          name="Colorful Heaven"
          author="By Mark Benjamin"
          date="30s ago"
          image={Nft5}
          price="0.91 ETH"
        />
        <HistoryItem
          name="Abstract Colors"
          author="By Esthera Jackson"
          date="58s ago"
          image={Nft1}
          price="0.91 ETH"
        />
        <HistoryItem
          name="ETH AI Brain"
          author="By Nick Wilson"
          date="1m ago"
          image={Nft2}
          price="0.91 ETH"
        />
        <HistoryItem
          name="Swipe Circles"
          author="By Peter Will"
          date="1m ago"
          image={Nft4}
          price="0.91 ETH"
        />
        <HistoryItem
          name="Mesh Gradients "
          author="By Will Smith"
          date="2m ago"
          image={Nft3}
          price="0.91 ETH"
        />
        <HistoryItem
          name="3D Cubes Art"
          author="By Manny Gates"
          date="3m ago"
          image={Nft6}
          price="0.91 ETH"
        />{" "}
      </Card>
    </Box>
  );
}

export default Inventory;
