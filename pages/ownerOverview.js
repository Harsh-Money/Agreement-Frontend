import { Box, Button, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Mutation, useMutation } from "react-query";
import Agreement from "../services/Agreement.service";
import Owner from "../services/owner.service";
import { useOwnerBasket } from "../stores/ownerBasket.store";
import CardContainer from "../components/common/CardContainer";
import ModalContainer from "../components/common/ModalContainer";
import Loading from "../components/common/Loading";
import { useAgreementStore } from "../stores/agreement.store";
import LocalStorageService from "../services/localstorage.service";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function OwnerOverview() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const {setOwnerBasket, ownerBasket, clearOwnerBasket} = useOwnerBasket((state) => state);
    const {AgreementDetails, setAgreementDetails, clearAgreementDetails} = useAgreementStore((state) => state);

    const [ownerId, setOwnerId] = useState({ id: null });
    const [ownerAgreementDetails, setOwnerAgreementDetails] = useState({ agreementid: null,
                                                                         clientname: null,
                                                                         cloudinaryurl: null      
                                                                         });
    const [agreementsWithOwner, setAgreementsWithOwner] = useState({ data: null});
    
    const copySignature = () => {
        navigator.clipboard.writeText(LocalStorageService.get("jwtToken"))
        .then(() => {
            toast({
                title: 'Signature copied to clipboard',
                description: `Done...`,
                status: 'success',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
          })
          .catch((err) => {
            toast({
                title: 'Signature not copied, try again...',
                description: "Fault...",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
          });
    }

    const {mutate:setNameOfOwner} = useMutation(Owner.getByName, {
        onSuccess: (data) => {
            console.log("owner-data: ",data);
            setOwnerBasket({
                id: data?.id,
                name: data?.name,
            })
            setOwnerId({
                id: data?.id,
            })
            toast({
                title: 'Got Id of Owner',
                description: `set id of owner.....`,
                status: 'success',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
              setOwnerIDForAgreement(data.id)
        },
        onError: (error) => {
            toast({
                title: 'Didnot got Owner data',
                description: "something went wrong.",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        }
    })

    const {mutate: setOwnerIDForAgreement, isLoading} = useMutation((id) => Agreement.getAllAgreementOfOwner(id), {
        onSuccess: (data) => {
            setOwnerBasket({
                data: data
            })
            setAgreementsWithOwner({
                data: data
                })
            console.log(data)
            toast({
                title: 'Successfully Got data of all agreement',
                description: `Done.....`,
                status: 'success',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        },
        onError: (error) => {
            toast({
                title: 'Didnot got Owner agreement data',
                description: "something went wrong.",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        }
    })

    

    const cardClicked = async(agreementId, clientName, cloudinaryUrl) => {
        console.log("card container clicked: ", agreementId, clientName, cloudinaryUrl);
        setOwnerAgreementDetails({
            agreementId: agreementId,
            clientname: clientName,
            cloudinaryurl: cloudinaryUrl
        })
        setAgreementDetails(agreementId);
        setTimeout(() => {
            setOwnerAgreementDetails(prevDetails => {
                console.log(prevDetails); 
                if (prevDetails.cloudinaryurl != null) {
                    onOpen();
                }
                return prevDetails;
            });
        }, 3000);
        

    }
    const isSubmit = () => {
        console.log("ownerId: ",ownerId);
        onClose();
        setOwnerIDForAgreement(ownerId?.id)
    }

    useEffect(() => {
        const ownerName = {
            name: ownerBasket.ownerName
        }
        setNameOfOwner(ownerName);
    },[])

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box>
            <Text fontWeight={"bold"} fontSize={"x-large"} color={"white"}>Agreements</Text>
            <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton isActive={isOpen} as={Button} rightIcon={<HamburgerIcon />}>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => copySignature()}>Copy Signature</MenuItem>
                    </MenuList>
                    </>
                )}
                </Menu>
            <SimpleGrid columns={3} spacing={4}>
            {agreementsWithOwner.data && (agreementsWithOwner.data).length > 0 ? (
                (agreementsWithOwner.data).map((agreement, index) => (
                    <Box key={agreement.id} mt={4} p={4} borderWidth="1px" borderRadius="lg">
                        <CardContainer name={agreement?.name} status={agreement.status} 
                        handleCardClicked={() => cardClicked(agreement.id, agreement.clientProfile.name, agreement.cloudinaryUrl)} 
                        />
                    </Box>
                ))
            ) : (
                <Text>No owner data available</Text>
            )}
        </SimpleGrid>
        {ownerAgreementDetails.cloudinaryurl && (
            <ModalContainer 
            ownerId={null} 
            ownerEmail={null}  
            isOpen={isOpen} 
            onClose={onClose} 
            isOwner={true} 
            clientName={ownerAgreementDetails.clientname} 
            cloudinaryUrl={ownerAgreementDetails.cloudinaryurl} 
            isSubmit={isSubmit} />
        )}
        

        </Box>
    )
}