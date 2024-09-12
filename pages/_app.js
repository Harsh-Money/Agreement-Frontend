import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import theme from "../theme";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }) {

    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      });


  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
