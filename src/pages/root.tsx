import { AppShell, Header } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/header";

const Root = () => {
  return (
    <AppShell
      padding='md'
      header={
        <Header height={60} p='xs'>
          <AppHeader />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
      {/* Your application here */}
    </AppShell>
  );
};

export default Root;
