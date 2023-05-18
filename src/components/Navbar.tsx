/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, To } from "react-router-dom";
import { useAuth } from "../context/userContext";

interface NavItem {
  label: string;
  variant?: "ghost" | "solid" | "link" | "outline" | "solid" | "unstyled";
  href?: To;
  styles?: {
    bg?: string;
    color?: string;
  };
}

let navlink: any;

const Navbar = () => {
  const NAV_ITEMS: Array<NavItem> = [
    { label: "Blog", href: "/home", variant: "ghost" },
    {
      label: "Sign Up",
      href: "/auth/signup",
      styles: { bg: "brand.secondary", color: "white" },
    },
    { label: "Sign In", href: "/auth/login", variant: "ghost" },
  ];

  const { getCurrentUser, signOut } = useAuth();
  const loggedUser = getCurrentUser();

  const navItems = loggedUser
    ? [
        ...NAV_ITEMS.filter(
          (item) => item.label !== "Sign Up" && item.label !== "Sign In"
        ),
        {
          label: "My Profile",
          href: "/my-profile/",
          variant: "ghost",
          styles: { bg: "brand.secondary", color: "white" },
        },
      ]
    : NAV_ITEMS;

  navlink = navItems;

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1.2, md: 1 }}
          justify={{ base: "start", md: "start" }}
        >
          <Heading
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Heading>

          <Flex display={{ base: "none", md: "flex" }} ml={10}></Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          display={{ base: "none", md: "flex" }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {navItems.map((navItem) => (
            <div key={navItem.label}>
              <NavLink to={navItem.href!}>
                <Button
                  bg={navItem.styles?.bg ?? ""}
                  color={navItem.styles?.color ?? ""}
                  fontSize="sm"
                  fontWeight={400}
                  variant={navItem.variant}
                >
                  {navItem.label}
                </Button>
              </NavLink>
            </div>
          ))}
          {loggedUser ? (
            <Button onClick={signOut} colorScheme="blackAlpha">
              Sign Out
            </Button>
          ) : null}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {navlink.map((navItem: any) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={NavLink}
        to={href!}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

export default Navbar;
