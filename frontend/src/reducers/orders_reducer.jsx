import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  UPLOAD_FILE_BEGIN,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_REDUCED_ORDERS,
} from "./../actions";

const orders_reducer = (state, action) => {
  if (action.type === UPLOAD_FILE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPLOAD_FILE_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === UPLOAD_FILE_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === GET_ORDERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    return { ...state, isLoading: false, orders: action.payload };
  }
  if (action.type === GET_REDUCED_ORDERS) {
    const { orders } = state;
    for (let i = 0; i < orders.length; i++) {
      orders[i].totalAmount = orders[i].quantity * orders[i].unitPrice;
    }

    const output = orders.reduce((accumulator, cur) => {
      let id = cur.orderID;
      let found = accumulator.find((elem) => elem.orderID === id);
      if (found) found.totalAmount += cur.totalAmount;
      else accumulator.push(cur);
      return accumulator;
    }, []);
    return { ...state, isLoading: false, reducedOrders: output };
  }
  if (action.type === GET_ORDERS_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === OPEN_MODAL) {
    return { ...state, order_id: action.payload, openModal: true };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, order_id: "", openModal: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default orders_reducer;
