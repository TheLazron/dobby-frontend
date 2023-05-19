import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#3BC788",
    secondary: "#303030",
    white: "#888888",
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;
