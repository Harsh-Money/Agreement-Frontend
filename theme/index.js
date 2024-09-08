import { Alert, Button, color, extendTheme, Input } from "@chakra-ui/react";
import { style } from "framer-motion/client";


const styles = {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("gray.100", "black")(props),
      },
    }),
  };

const theme = extendTheme({
    // Add your theme config here
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
      },
      color,
      style,
      fonts: {
        heading: `'Gilroy', sans-serif`,
        body: `'Gilroy', sans-serif`,
      },
      components: {
        Button,
        Input,
        Alert: {
          variants: {
            toast: (P) => {
              return {
                container: {
                  ...P.theme.components.Alert.variants.solid(P).container,
                  top: "150px",
                  bg: "green.500",
                },
              };
            },
          },
        },
      },
    });

    export default theme;
