import {
  Box,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

interface ImageCardProps {
  imageUrl: string;
  createdOn: string;
  name: string;
}

const ImageCard = ({ imageUrl, createdOn, name }: ImageCardProps) => {
  return (
    <Card maxW="md" bgColor="brand.secondary">
      <CardHeader>
        <Flex>
          <Flex
            flex="1"
            gap="4"
            alignItems="center"
            flexWrap="wrap"
            justify="center"
          >
            <Box>
              <Text fontWeight="bold" color="brand.primary">
                {name}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <Image boxSize="25rem" objectFit="cover" src={imageUrl} alt="Chakra UI" />

      <CardFooter
        justify="end"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Text color="brand.white" fontStyle={"oblique"}>
          {createdOn}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
