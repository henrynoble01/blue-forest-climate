import "./App.css";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <RouterProvider router={router} />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
