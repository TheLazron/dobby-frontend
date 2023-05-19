import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import UserProfileHeader from "../components/UserProfileHeader";
import AddImageModal from "../components/AddImageModal";
import { loggedUser, useAuth } from "../context/userContext";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import DividerComponent from "../components/ui/Divider";
import NoImageComponent from "../components/NoImageComponent";
import ImageGridComponent from "../components/ImageGridComponent";
import { Image } from "../types/imageType";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const { jwtToken } = useAuth();
  const { data, mutate } = useSWR(
    "http://localhost:3700/get-my-images",
    (url) =>
      makeAuthenticatedRequest(url, {}, "GET", jwtToken).then((res) => {
        console.log("swr", data);

        setImages(res.data);
      })
  );

  const { getCurrentUser } = useAuth();
  const user: loggedUser = getCurrentUser();

  if (!user) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w="100%"
        bgColor="brand.secondary"
        color="brand.white"
        fontStyle={"italic"}
      >
        <Heading>Login In Order to Access This Page</Heading>
      </Flex>
    );
  }

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
        <UserProfileHeader
          username={user.name!}
          imageCount={images.length!}
          email={user.email!}
        />
      </Box>
      <Flex mt={5} justifyContent={"space-between"} alignItems="center" mx={20}>
        <Heading color="brand.secondary">My Images</Heading>
        <AddImageModal />
      </Flex>
      <DividerComponent />
      <Flex
        flex="1"
        w="100%"
        justifyContent={"center"}
        alignItems="center"
        mx={2}
      >
        {images.length > 0 ? (
          <ImageGridComponent images={images as Image[]} />
        ) : (
          <NoImageComponent />
        )}
      </Flex>
      <Box mb={10}></Box>
    </Flex>
  );
};

export default Dashboard;
