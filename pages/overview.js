import { Box, HStack, SimpleGrid, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import OverviewServices from "../services/overview.service";
import { useOwnerBasket } from "../stores/ownerBasket.store";
import Loading from "../components/common/Loading";
import { useUserStore } from "../stores/user.store";
import { useEffect, useState } from "react";
import CardContainer from "../components/common/CardContainer";
import ModalContainer from "../components/common/ModalContainer";
import Client from "../services/client.service";

export default function Overview() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { ownerBasket, setOwnerBasket } = useOwnerBasket((state) => state);
    const {userData, clientData, setClientData} = useUserStore((state) => state);
    const toast = useToast();
    const [clickedCardDetails, setClickedCardDetails] = useState({ id: null, email: null})

    const cardClicked = (id,email) => {
        console.log("cardClicked")
        setClickedCardDetails({
            id: id,
            email: email
        })
        onOpen()
    }

    const {mutate: clientDataByName} = useMutation(Client.getByName, {
        onSuccess: (data) => {
            setClientData({
                id: data?.id,
                clientName: data?.name,
                clientEmail: data?.email,
            })
            toast({
                title: 'Client Data set',
                description: `Done.....`,
                status: 'success',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        },
        onError: (error) => {
            toast({
                title: 'Client Data not set',
                description: "Fault in setting data.",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })

    }})


    const {mutate: overviewData, isLoading, data} = useMutation(OverviewServices.getOwner, {
        onSuccess: (data) => {
            setOwnerBasket(data);
            const c = {
                name: clientData?.clientName
            }
            console.log(clientData)
            clientDataByName(c)
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
                        handleCardClicked={() => cardClicked(owner.id, owner.email)} 
                        />
                    </Box>
                ))
            ) : (
                <Text>No owner data available</Text>
            )}
        </SimpleGrid>
        
        <ModalContainer ownerId={clickedCardDetails.id} ownerEmail={clickedCardDetails.email}  isOpen={isOpen} onClose={onClose} />

        
        </Box>
    );
}
