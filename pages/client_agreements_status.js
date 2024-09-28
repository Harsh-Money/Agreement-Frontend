import { useRouter } from "next/router";
import { useMutation } from "react-query";
import Agreement from "../services/Agreement.service";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import CardContainer from "../components/common/CardContainer";

function ClientAgreementStatus({ clientId }) {
  const [agreementsWithClient, setAgreementsWithClient] = useState({
    data: null,
  });
  const [cardData, setCardData] = useState({})
  const [cardClickedOfOwner, setIsCardClickedOfOwner] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const route = useRouter();
  const { id } = route.query;

  const { mutate: getAllAgreementOfClientById } = useMutation(
    (id) => Agreement.getAllAgreementOfClient(id),
    {
      onSuccess: (data) => {
        console.log(data);
        // setAgreementsWithClient({
        //   data: data,
        // });
        toast({
          title: "Successfully Got data of all agreement",
          description: `Done.....`,
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Didnot got Client agreement data",
          description: "something went wrong.",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      },
    }
  );

  useEffect(async() => {
    const socket = new WebSocket('ws://localhost:8080/websockets');

    socket.onopen=() => {
        console.log('Connected to the websocket server');
    }
    socket.onmessage = (event) => {
        const body = JSON.parse(event.data);
        setAgreementsWithClient({
            data: body,
          });
        console.log("websocket message: ",body);
    }
    socket.onerror = () => {
        console.log('Error occurred while connecting to the websocket server');
    }
    socket.onclose = () => {
        console.log('Disconnected from the websocket server');
    }

    getAllAgreementOfClientById(id);
  }, []);

  const cardClicked = async (agreementId, ownerName, ownerEmail) => {
    console.log(
      "card container clicked: ",
      agreementId,
      ownerName,
      ownerEmail
    );
    setCardData(
        {
            agreementId: agreementId,
            ownerName: ownerName,
            ownerEmail: ownerEmail
        }
    )
    setIsCardClickedOfOwner(true);
    setTimeout(() => {
        setCardData(prevData => {
            if(prevData != null){
                onOpen();
            }
            return prevData;
        })
    },2000);
    
  };

  if (agreementsWithClient.data == null) {
    return <Loading />;
  }

  return (
    <Box>
      <Text fontWeight={"bold"} fontSize={"x-large"} color={"white"}>
        Agreements
      </Text>
      <SimpleGrid columns={3} spacing={4}>
        {agreementsWithClient.data && agreementsWithClient.data.length > 0 ? (
          agreementsWithClient.data.map((agreement, index) => (
            <Box
              key={agreement.id}
              mt={4}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
            >
              <CardContainer
                name={agreement?.name}
                status={agreement.status}
                handleCardClicked={() =>
                  cardClicked(
                    agreement.id,
                    agreement.ownerProfile.name,
                    agreement.ownerProfile.email
                  )
                }
              />
            </Box>
          ))
        ) : (
          <Text>No owner data available</Text>
        )}
      </SimpleGrid>

      {
        cardClickedOfOwner && (
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Owner Name: {cardData?.ownerName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Agreement Id: {cardData?.agreementId}</Text>
            <Text>Email: {cardData?.ownerEmail}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        )
      }
    </Box>
  );
}

export default ClientAgreementStatus;
