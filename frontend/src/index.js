import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ModalProvider } from "./store/ModalContext";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import TimesheetIndexPage from "./pages/TimesheetIndexPage";
import TimesheetShowPage from "./pages/TimesheetShowPage";
import axios from "./utils/axiosConfig";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TimesheetIndexPage />,
    loader: () => {
      return axios
        .get("/timesheets")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          throw error;
        });
    },
  },
  {
    path: "timesheets/:id",
    element: <TimesheetShowPage />,
    loader: ({ params }) => {
      return axios
        .get("/timesheets/" + params.id)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          throw error;
        });
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
