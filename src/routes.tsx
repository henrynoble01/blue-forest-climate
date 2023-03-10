import { createBrowserRouter } from "react-router-dom";
// import App from "./App";
import Index from "./pages";
import About from "./pages/about";
import Blog from "./pages/blog";
import Chats from "./pages/chats";
import CreatePost from "./pages/create-post";
import EditPost from "./pages/edit-post";
import Login from "./pages/login";
import MyPosts from "./pages/my-posts";
import Register from "./pages/register";
import Root from "./pages/root";
import ViewPosts from "./pages/view-posts";
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
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "edit-post/:postId",
        element: <EditPost />,
      },
      {
        path: "view-post/:postId",
        element: <ViewPosts />,
      },
    ],
  },
]);
