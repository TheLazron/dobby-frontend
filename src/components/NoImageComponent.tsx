import { Flex, Text } from "@chakra-ui/react";
import { PlusCircle } from "lucide-react";

const NoImageComponent = () => {
  return (
    <Flex justifyContent={"center"} alignItems="center" direction="column">
      <PlusCircle strokeWidth={3} color={"#3BC788"} size={50} />
      <Text color="gray.300" fontWeight={"bold"}>
        Hmm... looks empty, try adding new images!
      </Text>
    </Flex>
  );
};

export default NoImageComponent;
