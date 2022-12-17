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

import { Menu, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../infrastructure/persistence/firebase";

// Spinning Border https://codepen.io/MauriciAbad/pen/WNrpmPr

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

function OverlayMenu({
  children,
  userObj,
}: {
  children: React.ReactNode;
  userObj?: User;
}) {
  // const [user] = useLocalStorage<Partial<User>>({
  //   key: "user",
  //   defaultValue: JSON.parse(localStorage.getItem("user")!),
  // });

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        {!userObj ? (
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
  const [user, setUser] = useLocalStorage<Partial<User>>({
    key: "user",
    defaultValue: JSON.parse(localStorage.getItem("user")!),
  });

  const [userObj, setUserObj] = useState<User>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserObj(user);
    } else {
      // setLogin({ isUserLoggedIn: false });
      // User is signed out
      // ...
    }
  });

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
        <OverlayMenu userObj={userObj}>
          <div className='relative cursor-pointer '>
            {/* <div className='rotating-border rotating-border--google'> */}
            <div className='rotating-border rotating-border--black-white  rotating-border--reverse flex justify-center items-center  '>
              {userObj?.photoURL ? (
                <img
                  width={30}
                  height={30}
                  src={userObj?.photoURL}
                  alt=''
                  className='rounded-full'
                />
              ) : (
                <IconPlant2 size={30} color='gray' className='rounded-full' />
              )}
            </div>
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
