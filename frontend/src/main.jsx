import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { OrdersProvider } from "./context/orderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OrdersProvider>
      <App />
    </OrdersProvider>
  </React.StrictMode>
);
