import { Flex, Input, InputGroup, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Image } from "../types/imageType";
import ImageCard from "./ui/ImageCard";
import { format } from "date-fns";
import useSWR from "swr";
import { useState } from "react";
import { makeAuthenticatedRequest } from "../utils/axiosUtils";
import { useAuth } from "../context/userContext";

interface ImageGridComponentProps {
  images: Image[];
}

const ImageGridComponent = ({ images }: ImageGridComponentProps) => {
  const { jwtToken } = useAuth();

  const [searchText, setSearchText] = useState("");
  console.log("images inside image Grid", images);

  const { data: searchData, isValidating } = useSWR(
    `http://localhost:3700/search-images?searchString=${searchText}`,
    (url) =>
      makeAuthenticatedRequest(url, {}, "POST", jwtToken).then(
        (res) => res.data
      )
  );

  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} direction="column">
        <InputGroup my={5}>
          <Input
            placeholder="Search Images"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            pr="4rem"
          />
        </InputGroup>

        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {searchText === "" &&
            images.map((image) => (
              <ImageCard
                key={image.id} // Make sure to provide a unique key for each item in the array
                name={image.name}
                imageUrl={image.imageUrl}
                createdOn={format(new Date(image.createdOn), "d MMMM yyyy")}
              />
            ))}

          {searchText !== "" &&
            searchData &&
            searchData.map((image: Image) => (
              <ImageCard
                key={image.id} // Make sure to provide a unique key for each item in the array
                name={image.name}
                imageUrl={image.imageUrl}
                createdOn={format(new Date(image.createdOn), "d MMMM yyyy")}
              />
            ))}
          {searchText !== "" && isValidating && (
            <Flex justifyContent="center">
              <Spinner size="xl" />
            </Flex>
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default ImageGridComponent;
