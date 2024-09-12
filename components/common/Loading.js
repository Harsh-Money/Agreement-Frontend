import { Center, CircularProgress } from "@chakra-ui/react";

function Loading() {
    return (
        <Center width={"full"} height={'full'}>
      <CircularProgress isIndeterminate color='#FFD76F' />
    </Center>
    )
}

export default Loading;