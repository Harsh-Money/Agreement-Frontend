import { Button, Center, Container, HStack, Text, VStack } from "@chakra-ui/react";
import UIDrawer from "../common/UIDrawer";
import { useState } from "react";
import AuthForm from "../Authentication";

function FoldOne() {

    const [isOpen, setIsOpen] = useState(false);

    const handleOnClose = () => {
        setIsOpen(false); 
    }


    return (
        <Container maxW={"inherit"} h={"3xl"} >
            <Center maxWidth={"inherit"} h={"xl"} >
                <VStack spacing={"5"}>
                <Text fontSize={"xx-large"} color={"teal.500"} >Welcome To <Text color={"#FFD76F"} display={"inline"}>Marketplace</Text></Text>
                <HStack>
                <Button onClick={() => setIsOpen(true)}>Login</Button>
                <Button onClick={() => setIsOpen(true)}>Register</Button>
                </HStack>
                </VStack>
            </Center>
            <UIDrawer isOpen={isOpen} onClose={handleOnClose}>
                <AuthForm handleOnClose={handleOnClose} />
            </UIDrawer>
        </Container>
    )
}

export default FoldOne;