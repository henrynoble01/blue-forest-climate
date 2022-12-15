import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconPlant2,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import { Link, NavLink } from "react-router-dom";

import { Popover, Button, TextInput, Menu, Text } from "@mantine/core";
import React from "react";

function PopoverMenu() {
  return (
    <Popover width={300} trapFocus position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <TextInput label='Name' placeholder='Name' size='xs' />
        <TextInput label='Email' placeholder='john@doe.com' size='xs' mt='xs' />
      </Popover.Dropdown>
    </Popover>
  );
}

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
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Auth</Menu.Label>
        <LocalLink to={"/login"}>
          <Menu.Item icon={<IconSettings size={14} />}>Login</Menu.Item>
        </LocalLink>
        <LocalLink to={"/register"}>
          <Menu.Item icon={<IconMessageCircle size={14} />}>Register</Menu.Item>
        </LocalLink>
        <Menu.Divider />
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
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color='red' icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

const AppHeader = () => {
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
            <IconPlant2 size={35} color='gray' />

            <div className='rounded-full  border-2 border-dashed h-10 w-10 flex justify-center items-center  hover:animate-[spin_3s_linear_infinite] absolute -top-[0.125rem] -left-[0.125rem] right-0 bottom-0 '></div>
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