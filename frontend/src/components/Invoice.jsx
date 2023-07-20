import React, { useState } from "react";
import { Box, Typography, Stack, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useOrdersContext } from "../context/orderContext";
import moment from "moment";
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
import LoadingButton from "@mui/lab/LoadingButton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const { orderId } = useParams();
  const { reducedOrders, orders } = useOrdersContext();
  const [loader, setLoader] = useState(false);
  let orderDate, orderName, totalAmount;
  reducedOrders.find((o) =>
    o.orderID === orderId ? (orderDate = o.orderDate) : null
  );
  reducedOrders.find((o) =>
    o.orderID === orderId ? (orderName = o.customer) : null
  );
  reducedOrders.find((o) =>
    o.orderID === orderId ? (totalAmount = o.totalAmount) : null
  );

  const handleDownload = () => {
    const capture = document.querySelector(".invoice-container");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("invoice.pdf");
    });
  };

  return (
    <>
      <Box
        sx={{
          padding: "50px 50px",
          marginTop: "100px",
        }}
        className="invoice-container"
      >
        <Typography variant="h3" sx={{ color: "#102a43" }}>
          Invoice
        </Typography>
        <Stack direction="column" spacing={2} mt={5}>
          <Typography variant="body1" sx={{ color: "#102a43" }}>
            Invoice No. : {orderId}
          </Typography>
          <Typography variant="body1" sx={{ color: "#102a43" }}>
            Invoice Date: {moment(orderDate).format("MM-DD-YYYY")}
          </Typography>
          <Typography variant="body1" sx={{ color: "#102a43" }}>
            Due Date : 03-28-2019
          </Typography>
        </Stack>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            marginTop: "30px",
            gap: "30px",
          }}
        >
          <Container
            sx={{
              backgroundColor: "#bfdbfe",
              borderRadius: "5px",
              width: "40%",
              padding: "20px 20px",
            }}
          >
            <Typography variant="h5" sx={{ color: "#102a43" }}>
              Billed By
            </Typography>
            <Typography variant="h6" sx={{ color: "#102a43" }}>
              Blaine Cottrell
            </Typography>
            <Typography variant="body1" sx={{ color: "#102a43" }}>
              55 Esk Street, Invercargill 9810, United Sates of America
            </Typography>
          </Container>
          <Container
            sx={{
              backgroundColor: "#bfdbfe",
              borderRadius: "5px",
              width: "40%",
              padding: "20px 20px",
            }}
          >
            <Typography variant="h5" sx={{ color: "#102a43" }}>
              Billed To
            </Typography>
            <Typography variant="h6" sx={{ color: "#102a43" }}>
              {orderName}
            </Typography>
            <Typography variant="body1" sx={{ color: "#102a43" }}>
              United Sates of America
            </Typography>
          </Container>
        </Box>
        <TableContainer
          sx={{ maxHeight: "500px", marginTop: "50px", bgcolor: "#d9e2ec" }}
          component={Paper}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const { orderID, itemName, quantity, unitPrice, totalAmount } =
                  order;
                if (orderID === orderId) {
                  return (
                    <TableRow
                      key={orderID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{itemName}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>${unitPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        ${(quantity * unitPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h4"
          sx={{ color: "#102a43", marginTop: 3, textAlign: "right" }}
        >
          Total Amount(USD) : ${totalAmount.toFixed(2)}
        </Typography>
      </Box>
      <LoadingButton
        variant="contained"
        sx={{
          display: "block",
          margin: "0 0 0 auto",
        }}
        type="submit"
        loading={loader}
        onClick={handleDownload}
      >
        Download Invoice
      </LoadingButton>
    </>
  );
};

export default Invoice;
