import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserAndTransactionContext } from "./context/UserAndTransactionContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <UserAndTransactionContext>
        <App />
      </UserAndTransactionContext>
    </Router>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import Loading from "./pages/Loading";
// import Home from "./pages/Home";
// import ErrorPage from "./pages/ErrorPage";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />} errorElement={<ErrorPage />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/loading" element={<Loading />} />
//       <Route path="/login" element={<Login />} />
//     </Route>
//   )
// );

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
