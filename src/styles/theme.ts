import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#3BC788",
    secondary: "#1C1C1C",
    white: "#666666",
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;
