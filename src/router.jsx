import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Index from "./pages/Index.jsx";
import English from "./pages/English.jsx";
import Snowman from "./pages/Snowman.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "english",
        element: <English />,
      },
      {
        path: "",
        element: <Index />,
      },
      {
        path: "snowman",
        element: <Snowman />,
      },
    ],
  },
]);

export default router;
