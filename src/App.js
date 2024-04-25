import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./components/Layout";
import LiveTracking from "./components/LiveTrracking/index.js";
import Dashboard from "./components/Dashboard/index.js";
import SingleTracking from "./components/Singletrack/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/LiveTracking",
        element: <LiveTracking />,
      },
      {
        path: "/tacking/:id",
        element: <SingleTracking />,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <Toaster />

      <ConfigProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
