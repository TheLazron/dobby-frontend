import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import UserProfileHeader from "../components/UserProfileHeader";
import AddImageModal from "../components/AddImageModal";

const Dashboard = () => {
  return (
    <Flex color="brand.primary" width="100%" direction={"column"}>
      <Box
        height={"15rem"}
        display={"flex"}
        width={"100%"}
        bgImage="https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        backgroundSize="cover"
        backgroundPosition="center"
        alignItems="center"
        pl={20}
      >
        <UserProfileHeader email="dmd" username="dmd" imageCount={4} />
      </Box>
      <Flex mt={5} justifyContent={"space-between"} alignItems="center" mx={20}>
        <Heading color="brand.secondary">My Images</Heading>
        <AddImageModal />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
