import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { NavLink } from "react-router";
import { authContext } from "../../contexts/authContext";



export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext)

  function loggedOut() {
    setIsLoggedIn(false)
    localStorage.removeItem("token")
  }

  const menuItems = [
    "Home",
    "Categories",
    "Brands",
    "Cart",
    "WishList",
  ];


  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">FreshCart </p>
        </NavbarBrand>
      </NavbarContent>

      {
        isLoggedIn &&
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink color="foreground" to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>{item}</NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      }



      <NavbarContent justify="end">
        {
          isLoggedIn ?
              <>
          <NavbarItem>
              <Button onPress={loggedOut} as={NavLink} color="danger" to={"/login"} variant="flat">
                Sign Out
              </Button>
            </NavbarItem>
              </>
            :
            <>
              <NavbarItem className="flex">
                <Button as={NavLink} color="primary" to={"/login"} variant="flat">
                  LogIn
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button as={NavLink} color="primary" to={"/register"} variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
        }
        
      </NavbarContent>


      {isLoggedIn &&
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={`${item}-${index}`}>
              <NavLink
                className="w-full"
                color={"foreground"}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                size="lg"
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      }
    </Navbar>
  );
}
