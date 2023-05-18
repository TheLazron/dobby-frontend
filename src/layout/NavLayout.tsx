import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Flex } from "@chakra-ui/react";

interface NavLayoutProps {
  children: ReactNode;
}

const NavLayout = ({ children }: NavLayoutProps): JSX.Element => {
  return (
    <Flex direction="column" height="100vh">
      <Navbar />
      <Flex width="100%" flex="1">
        {children}
      </Flex>
    </Flex>
  );
};

export default NavLayout;
