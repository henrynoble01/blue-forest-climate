import {
  IconArrowsLeftRight,
  IconLogout,
  IconMessageCircle,
  IconPhoto,
  IconPlant2,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Popover, Button, TextInput, Menu, Text } from "@mantine/core";
import { useLocalStorage, useSetState } from "@mantine/hooks";
import React, { useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../infrastructure/persistence/firebase";

// Spinning Border https://codepen.io/MauriciAbad/pen/WNrpmPr

// function PopoverMenu() {
//   return (
//     <Popover width={300} trapFocus position='bottom' withArrow shadow='md'>
//       <Popover.Target>
//         <Button>Toggle popover</Button>
//       </Popover.Target>
//       <Popover.Dropdown
//         sx={(theme) => ({
//           background:
//             theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//         })}
//       >
//         <TextInput label='Name' placeholder='Name' size='xs' />
//         <TextInput label='Email' placeholder='john@doe.com' size='xs' mt='xs' />
//       </Popover.Dropdown>
//     </Popover>
//   );
// }

function LocalLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Link to={to} className='text-black no-underline'>
      {children}
    </Link>
  );
}

function OverlayMenu({ children }: { children: React.ReactNode }) {
  const [user] = useLocalStorage<Partial<User>>({
    key: "user",
    defaultValue: JSON.parse(localStorage.getItem("user")!),
  });

  const navigate = useNavigate();

  const [login, setLogin] = useSetState({ isUserLoggedIn: false });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setLogin({ isUserLoggedIn: true });
      // ...
    } else {
      setLogin({ isUserLoggedIn: false });
      // User is signed out
      // ...
    }
  });

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        {!login.isUserLoggedIn ? (
          <>
            <Menu.Label>Auth</Menu.Label>
            <LocalLink to={"/login"}>
              <Menu.Item icon={<IconSettings size={14} />}>Login</Menu.Item>
            </LocalLink>
            <LocalLink to={"/register"}>
              <Menu.Item icon={<IconMessageCircle size={14} />}>
                Register
              </Menu.Item>
            </LocalLink>
            <Menu.Divider />
          </>
        ) : (
          <>
            <Menu.Label>Account</Menu.Label>
            <LocalLink to='/settings'>
              <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            </LocalLink>
            <LocalLink to={"/my-posts"}>
              <Menu.Item icon={<IconPhoto size={14} />}>My Posts</Menu.Item>
            </LocalLink>
            <Menu.Item
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size='xs' color='dimmed'>
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>
            {/* <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              Transfer my data
            </Menu.Item> */}
            <Menu.Item
              color='red'
              icon={<IconLogout size={14} />}
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

const AppHeader = () => {
  const user = auth.currentUser;
  // const [user, setUser] = useLocalStorage<Partial<User>>({
  //   key: "user",
  //   defaultValue: JSON.parse(localStorage.getItem("user")!),
  // });
  // const [login, setLogin] = useSetState({ isUserLoggedIn: false });

  // // useEffect(() => {
  // //   console.log(user);
  // // }, []);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     setLogin({ isUserLoggedIn: true });
  //     // ...
  //   } else {
  //     setLogin({ isUserLoggedIn: false });
  //     // User is signed out
  //     // ...
  //   }
  // });

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center'>
        <div className=''>
          <LocalNavLink url='/'>
            <header className='font-600 text-2xl'>BLUE FOREST</header>
          </LocalNavLink>
        </div>
        <div className=''>
          <div className='flex gap-[0.75rem]'>
            <LocalNavLink url='blog' text='Blog'></LocalNavLink>
            <LocalNavLink url='chats' text='Chats'></LocalNavLink>
            <LocalNavLink url='about' text='About'></LocalNavLink>
          </div>
        </div>
        <OverlayMenu>
          <div className='relative cursor-pointer '>
            {/* <div className='rotating-border rotating-border--google'> */}
            <div className='rotating-border rotating-border--black-white  rotating-border--reverse flex justify-center items-center '>
              {user?.photoURL ? (
                <img
                  width={30}
                  height={30}
                  src={user?.photoURL}
                  alt=''
                  className='rounded-full'
                />
              ) : (
                <IconPlant2 size={30} color='gray' className='rounded-full' />
              )}
            </div>

            {/* <div className='rounded-full  border-2 border-dashed h-10 w-10 flex justify-center items-center  hover:animate-[spin_3s_linear_infinite] absolute -top-[0.125rem] -left-[0.125rem] right-0 bottom-0 '></div> */}
          </div>
        </OverlayMenu>
      </div>
    </div>
  );
};

const LocalNavLink = ({
  text,
  url,
  children,
}: {
  text?: string;
  url: string;
  children?: React.ReactNode;
}) => {
  return (
    <NavLink
      to={url}
      className='no-underline font-600 hover:border-b-blue hover:text-blue border-b-3  border-transparent   transition-all duration-300  '
    >
      {children ? children : text}
    </NavLink>
  );
};

export default AppHeader;
