import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/orders_reducer";
import customFetch from "./../utils/customFetch";
import {
  CLOSE_MODAL,
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  GET_REDUCED_ORDERS,
  OPEN_MODAL,
  UPLOAD_FILE_BEGIN,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCESS,
} from "../actions";
import { toast } from "react-toastify";

const OrderContext = React.createContext();

const initialState = {
  isLoading: false,
  orders: [],
  openModal: false,
  order_id: "",
  reducedOrders: [],
};

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const uploadFile = async (formData) => {
    dispatch({ type: UPLOAD_FILE_BEGIN });
    try {
      const response = await customFetch.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: UPLOAD_FILE_SUCCESS });
      toast.success("Upload Successfull!");
    } catch (error) {
      dispatch({ type: UPLOAD_FILE_ERROR });
      toast.error("Upload Failed! Please try again");
      console.log(error);
    }
  };

  const getOrders = async () => {
    dispatch({ type: GET_ORDERS_BEGIN });
    try {
      const { data } = await customFetch.get("/all-orders");
      const { allOrders } = data;
      // console.log(allOrders);
      dispatch({ type: GET_ORDERS_SUCCESS, payload: allOrders });
      dispatch({ type: GET_REDUCED_ORDERS, payload: allOrders });
    } catch (error) {
      dispatch({ type: GET_ORDERS_ERROR });
      toast.error("Fetching Orders failed!");
    }
  };

  const handleModalChange = (id) => {
    dispatch({ type: OPEN_MODAL, payload: id });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <OrderContext.Provider
      value={{ ...state, uploadFile, getOrders, handleModalChange, closeModal }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrdersContext = () => {
  return useContext(OrderContext);
};
