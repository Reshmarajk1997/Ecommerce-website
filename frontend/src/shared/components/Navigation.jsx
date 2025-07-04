// "use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, replace, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
    },
    {
      id: "men",
      name: "Men",
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { user, loginOut, isInitialized } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("Navigation user:", user, "isInitialized:", isInitialized);

  const handleLogout = () => {
    loginOut();
    setOpen(false);
    
    navigate('/login',{replace:true})
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">


            {user ? (
                    <>
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        {user?.userName?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar>

                      {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                      <Button
                        // onClick={() => {
                        //   loginOut();
                        //   navigate("/login");
                        // }}

                        onClick={handleLogout}
                        size="small"
                        variant="text"
                        sx={{ textTransform: "none", color: "gray" }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                    <div className="flow-root">
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                      </div>
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-gray-200"
                      />
                      <div className="flow-root">
                      <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </Link>
                    </div>
                    </>
                  )}

              



              {/* <div className="flow-root">
                <a
                  href="/login"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="/register"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create account
                </a>
              </div> */}

            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img alt="" src="/logo.jpg" className="h-12 w-auto" />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? (
                    <>
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        {user?.userName?.charAt(0)?.toUpperCase() || 
                        user?.email?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar>

                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      <Button
                        onClick={() => {
                          loginOut();
                          navigate("/login");
                        }}
                        size="small"
                        variant="text"
                        sx={{ textTransform: "none", color: "gray" }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign in
                      </Link>
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-gray-200"
                      />
                      <Link
                        to="/register"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Create account
                      </Link>
                    </>
                  )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <Link
                    to="/"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
