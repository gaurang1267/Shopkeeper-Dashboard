import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import AllOrders from "./components/AllOrders";
import Invoice from "./components/Invoice";
import Error from "./pages/Error";
import RootLayout from "./pages/Root";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <FileUpload />,
        index: true,
      },
      {
        path: "/all-orders",
        element: <AllOrders />,
      },
      {
        path: "/orders/:orderId/invoice",
        element: <Invoice />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
