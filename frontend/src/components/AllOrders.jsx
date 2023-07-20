import React, { useEffect } from "react";
import { useOrdersContext } from "../context/orderContext";
import Loader from "./Loader";
import moment from "moment";
import { Box } from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Link,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ModalDisplay from "./Modal";

const AllOrders = () => {
  const { isLoading, getOrders, openModal, handleModalChange, reducedOrders } =
    useOrdersContext();

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        padding: "50px 50px",
        marginTop: "100px",
      }}
    >
      <Typography variant="h3" sx={{ color: "#102a43" }}>
        Dashboard
      </Typography>
      <TableContainer
        sx={{ maxHeight: "500px", marginTop: "50px", bgcolor: "#d9e2ec" }}
        component={Paper}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Generate Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reducedOrders.map((order) => {
              const { orderID, customer, orderDate, totalAmount } = order;
              return (
                <TableRow
                  key={orderID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Link
                      href="#"
                      color="inherit"
                      onClick={() => handleModalChange(orderID)}
                    >
                      {orderID}
                    </Link>
                  </TableCell>
                  <TableCell>{customer}</TableCell>
                  <TableCell>
                    {moment(orderDate).format("MM-DD-YYYY")}
                  </TableCell>
                  <TableCell>{totalAmount.toFixed(2)}</TableCell>
                  <TableCell align="left">
                    <NavLink to={`/orders/${orderID}/invoice`}>
                      <Button variant="contained">Generate Invoice</Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {openModal && <ModalDisplay />}
    </Box>
  );
};

export default AllOrders;
