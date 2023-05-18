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
      bgImage="https://images.unsplash.com/photo-1678981432720-c6784ffbb4af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80"
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
