import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { LabsList } from "./lab-list/LabsList";
import { MainLayout } from "./main/MainLayout";
import { View } from "./main/View";

const App = () => {
  return <Outlet />;
};

const Land = () => {
  return <div>land</div>;
};

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <LabsList />,
      },
      {
        path: ":lab/:hosp",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Land />,
          },
          {
            path: ":viewId",
            element: <View />,
          },
        ],
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
