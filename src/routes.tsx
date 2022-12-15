import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import Index from "./pages";
import About from "./pages/about";
import Blog from "./pages/blog";
import Chats from "./pages/chats";
import Login from "./pages/login";
import MyPosts from "./pages/my-posts";
import Root from "./pages/root";
// import Root from "./pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "chats",
        element: <Chats />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
    ],
  },
]);
