import { Box, HStack, SimpleGrid, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import OverviewServices from "../services/overview.service";
import { useOwnerBasket } from "../stores/ownerBasket.store";
import Loading from "../components/common/Loading";
import { useUserStore } from "../stores/user.store";
import { useEffect, useState } from "react";
import CardContainer from "../components/common/CardContainer";
import ModalContainer from "../components/common/ModalContainer";

export default function Overview() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { ownerBasket, setOwnerBasket } = useOwnerBasket((state) => state);
    const userData = useUserStore((state) => state.userData);
    const toast = useToast();

    const cardClicked = () => {
        console.log("cardClicked")
        onOpen()
    }

    const {mutate: overviewData, isLoading, data} = useMutation(OverviewServices.getOwner, {
        onSuccess: (data) => {
            setOwnerBasket(data);
        },
        onError: (error) => {
            toast({
                title: 'Owner Data !!!...',
                description: "Not got data...",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
            });
        }
      })

      useEffect(() => {
        overviewData();
      },[]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box>
            <Text fontWeight={"bold"} fontSize={"x-large"} color={"white"}>Owner Available of which you can have agreement with, you just need as a photo of agreement , based on your demand.</Text>
            <SimpleGrid columns={3} spacing={4}>
            {data && data.length > 0 ? (
                data.map((owner, index) => (
                    <Box key={owner.id} mt={4} p={4} borderWidth="1px" borderRadius="lg">
                        <CardContainer name={owner?.name} 
                        email={owner.email} 
                        contact_no={owner?.contact_no} 
                        ownershop={owner.ownersShop} 
                        handleCardClicked={cardClicked} 
                        />
                    </Box>
                ))
            ) : (
                <Text>No owner data available</Text>
            )}
        </SimpleGrid>
        
        <ModalContainer isOpen={isOpen} onClose={onClose} />

        
        </Box>
    );
}
