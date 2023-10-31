import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ModalProvider } from "./store/ModalContext";
import "./index.css";

import TimesheetIndexPage from "./pages/TimesheetIndexPage";
import TimesheetShowPage from "./pages/TimesheetShowPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TimesheetIndexPage />,
  },
  {
    path: "timesheets/:id",
    element: <TimesheetShowPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
