import { Button, Container, FormControl, FormErrorMessage, Input, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { ImageFile, NameInput, PasswordInput } from "../Authentication";
import * as Yup from "yup";
import { useMutation } from "react-query";
import Agreement from "../../services/Agreement.service";
import { useState } from "react";
import { useUserStore } from "../../stores/user.store";
import LocalStorageService from "../../services/localstorage.service";

export default function ClientAgreementForm ({ ownerId, ownerEmail, onClose }) {

    const [agreementName, setAgreementName] = useState(null);
    const {userData, clientData, setClientData} = useUserStore((state) => state);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [submitValue, setSubmitValue] = useState({});
    const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitOfSignature = () => {
    if(inputValue == LocalStorageService.get("jwtToken")){
        setSubmitClicked(false);
        handleLogin(submitValue);
    }
    else{
    console.log('Input Value:', inputValue); 
    }
  };

    const toast = useToast();
    const LoginSchema = Yup.object({
        agreementname: Yup.string()
              .max(30, "Must be 30 characters or less")
              .required("Required"),
      });

    const { mutate: dataRequiredToSendAgreement} = useMutation(Agreement.sendAgreement, {
        onSuccess: (data) => {
            console.log(data);
            toast({
                title: 'AgreementSend...',
                description: `let's wait for aproval...`,
                status: 'success',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
            onClose();
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: 'Agreement not send',
                description: "Try again!!!",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        }
    })

    // Mutation for sending data via API
    const { mutate: setAgreement } = useMutation(Agreement.uploadAgreement, {
        onSuccess: (data) => {
            console.log(data);
            // "agreementName":"First one",
            // "clientId":502 ,
            // "ownerId": 302,
            // "clientEmail":"client@123",
            // "cludinaryUrl":"www.cloudinary.com",
            // "ownerEmail":"owner@123"
            toast({
                title: 'Form submit',
                description: `wait for approval...`,
                status: 'success',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
              
              const sendingAgreementData = {
                agreementName: agreementName,
                clientId: clientData?.id,
                ownerId: ownerId,
                clientEmail: clientData?.clientEmail,
                cludinaryUrl: data?.url,
                ownerEmail: ownerEmail
              }
              dataRequiredToSendAgreement(sendingAgreementData);
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: 'Form not submitted',
                description: "Try again!!!",
                status: 'error',
                duration: 2000,
                position: 'top',
                isClosable: true,
              })
        }
    });

    // Function to handle form submission and construct FormData
    const handleLogin = async (formdata) => {
        console.log("inside handle login: ",formdata)
        setAgreementName(formdata.agreementname)
        const formData = new FormData();
        
        // Append the file and other parameters to FormData
        formData.append("agreementname", formdata.agreementname);
        formData.append("image", formdata.image);

        // Use mutation to send the FormData
        setAgreement(formData);
      };

    return (
        <>
        <Formik
            initialValues={{
                agreementname: "",
                image: null,  // Store the file as null initially
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                setSubmitValue(values);
                setSubmitClicked(true);
                // if (submitClicked)
                // handleLogin(values); // Call handleLogin on submit
            }}
        >
        {({ handleSubmit, errors, touched, getFieldProps, setFieldValue }) => (
            <VStack
                alignItems={"flex-start"}
                spacing={6}
                as="form"
                onSubmit={handleSubmit}
            >
                {/* Input for agreement name */}
                <FormControl isInvalid={errors.agreementname && touched.agreementname}>
                    <NameInput {...getFieldProps("agreementname")} />
                    <FormErrorMessage>{errors.agreementname}</FormErrorMessage>
                </FormControl>

                {/* Input for file upload */}
                <FormControl isInvalid={errors.image && touched.image}>
                    <input
                        id="file"
                        name="image"
                        type="file"
                        onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);  // Update the file in Formik state
                        }}
                    />
                    <FormErrorMessage>{errors.image}</FormErrorMessage>
                </FormControl>

                {/* Submit button */}
                <Stack direction={["column", "row"]} w="full" spacing={5}>
                    <Button type="submit" variant="primary" color={"#FFD76F"} bg={"grey"}>
                        Submit
                    </Button>
                </Stack>
            </VStack>
        )}
        </Formik>

        {submitClicked ?
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
        </>
    );
}