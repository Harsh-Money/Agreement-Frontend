import { Box, Button, Checkbox, Container, Input, Link, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useOwnerBasket } from "../../stores/ownerBasket.store";
import { useMutation } from "react-query";
import Owner from "../../services/owner.service";
import { useAgreementStore } from "../../stores/agreement.store";
import LocalStorageService from "../../services/localstorage.service";

const OwnerAgreementForm = ({clientName, cloudinaryUrl="www.cloudinary.com", submitClicked}) => {
    const [agreementAccepted, setAgreementAccepted] = useState(false);
    const {setOwnerBasket, ownerBasket, clearOwnerBasket} = useOwnerBasket((state) => state);
    const {AgreementDetails, setAgreementDetails, clearAgreementDetails} = useAgreementStore((state) => state);
    const [isApproved, setIsApproved] = useState(false);
    const [submitClickedForSignature, setSubmitClickedForSignature] = useState(false);

    const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitOfSignature = () => {
    if(inputValue == LocalStorageService.get("jwtToken")){
        setSubmitClickedForSignature(false);
        checkSubmitClick();
    }
    else{
    console.log('Input Value:', inputValue); 
    }
  };

    const toast = useToast();

    const {mutate: setAgreementIdForApproval} = useMutation((id) => Owner.approveAgreementByOwner(id), {
        onSuccess: (data) => {
                setIsApproved(true);
                console.log(data)
                toast({
                    title: 'Successfully approved agreement',
                    description: `Done.....`,
                    status: 'success',
                    duration: 2000,
                    position: 'top',
                    isClosable: true,
                  })
            
        },
        onError: (error) => {
            toast({
                title: 'Didnot approve agreement',
                description: "something went wrong.",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        }
    })

    const checkSubmitClick =() => {
        if (agreementAccepted == true) {
            console.log(ownerBasket)
            console.log(AgreementDetails);
            if(AgreementDetails != null){
                setAgreementIdForApproval(AgreementDetails)
            } else{
                toast({
                    title: 'Didnot got agreement Id',
                    description: "Try again.",
                    status: 'error',
                    duration: 2000,
                    position: 'top',
                    isClosable: true,
                  })
            }
        } else {
            console.log(agreementAccepted)
            alert("Please accept the agreement");
        }
    }

    useEffect(() => {
        if(isApproved == true){
            submitClicked();
        }
    },[isApproved])

    return (
        <Stack>
        <Box ml={5} mt={3}>
            <Text>Client name: <Text display={"inline"}>{clientName}</Text></Text>
            <Text>Cloudinary URL: <Link href={cloudinaryUrl} display={"inline"} isExternal>Link</Link></Text>
            <Checkbox size='md' 
            colorScheme='green' 
            onChange={() => {console.log("checkbox clicked");setAgreementAccepted(!agreementAccepted)}}>
                Checkbox
            </Checkbox>
            <Button onClick={() => setSubmitClickedForSignature(true)}>Submit</Button> 
        </Box>
        {submitClickedForSignature ?
        <Container>
        <Text>Enter the Signature</Text>
        <Input
            placeholder='Enter the Signature'
            value={inputValue}
            onChange={handleInputChange}
        />
    <Button onClick={handleSubmitOfSignature}>Submit</Button>
    </Container> : <></>
    }
        </Stack>
    )
}
export default OwnerAgreementForm;