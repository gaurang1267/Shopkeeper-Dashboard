import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useOrdersContext } from "../context/orderContext";
import { Button } from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalDisplay = () => {
  const { closeModal, openModal, orders, order_id } = useOrdersContext();
  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Order Details
        </Typography>
        <TableContainer
          sx={{ maxHeight: "300px", marginTop: "50px", bgcolor: "#d9e2ec" }}
          component={Paper}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const { orderID, itemName, quantity, unitPrice } = order;
                if (orderID === order_id) {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{itemName}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>{unitPrice}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={closeModal}
          sx={{ marginTop: "20px" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalDisplay;
