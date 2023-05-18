import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthPage = (): JSX.Element => {
  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      bgImage="https://images.unsplash.com/photo-1517322479358-df90f951f87d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <div className="absolute">
        <Outlet />
      </div>
    </Flex>
  );
};

export default AuthPage;
