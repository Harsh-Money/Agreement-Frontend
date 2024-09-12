import { Button, Center, Container, HStack, Text, VStack } from "@chakra-ui/react";
import UIDrawer from "../common/UIDrawer";
import { useEffect, useState } from "react";
import AuthForm from "../Authentication";

function FoldOne() {

    const [isOpen, setIsOpen] = useState(false);
    
    const [formType, setFormType] = useState("login");

  

    const handleOnClose = () => {
        setIsOpen(false); 
    }


    return (
        <Container maxW={"inherit"} h={"3xl"} >
             <Center maxWidth={"inherit"} h={"xl"} >
                <VStack spacing={"5"}>
                <Text fontSize={"xx-large"} color={"teal.500"} >Welcome To <Text color={"#FFD76F"} display={"inline"}>Marketplace</Text></Text>
                <HStack>
                <Button onClick={() => {setIsOpen(true), setFormType("login")}}>Login</Button>
                <Button onClick={() => {setIsOpen(true), setFormType("signup")}}>Register</Button>
                </HStack>
                </VStack>
            </Center>
           <UIDrawer isOpen={isOpen} onClose={handleOnClose}>
                <AuthForm handleOnClose={handleOnClose} formType={formType} />
            </UIDrawer>
        </Container>
    )
}

export default FoldOne;