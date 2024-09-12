import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    HStack,
    Stack,
    Toast,
    useToast,
    VStack,
  } from "@chakra-ui/react";
  import * as Yup from "yup";
  import { Formik, useFormik } from "formik";
  import { ContactNo, EmailInput, NameInput, PasswordInput } from ".";
import { useState } from "react";
import AuthenticationService from "../../services/authentication.service";
import { useMutation } from "react-query";
  
  function Signup({showLogin}) {

    const [user, setUser] = useState("");
    const toast = useToast();

      const handleFormSubmit = async (formData) => {
        console.log(formData," ", user)
        const data = {
            name: formData.name,
            email: formData.email,
            password:formData.password,
            contact_no: formData.contact_no,
            roles: [user]
        }
         getDataForRegistration(data);
        console.log(data)
      // Api to check whether user is present or not; use formdata.name, formdata.password
      // showLogin();
    };

    const { mutate: getDataForRegistration} = useMutation(AuthenticationService.registerClientWithUsername , {
      onSuccess: (data) => {
        console.log(data);
        toast({
          title: 'Register Successful',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2000,
          position: 'top',
          isClosable: true,
        })
        showLogin();
      },
      onError: (error) => {
        toast({
          title: 'Register Un-successful',
          description: "We've created your account for you.",
          status: 'error',
          duration: 2000,
          position: 'top',
          isClosable: true,
        })
        console.log(error)
      }
    })

    
  
    const SignUpSchema = Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password is too short"),
      contact_no: Yup.string()
        .required('Contact number is required')
        .matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits')
    });
  
    return (
      // Formik is defined
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          contact_no: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          // alert(JSON.stringify(values, null, 2));
          handleFormSubmit(values);
        }}
      >
        {({ handleSubmit, errors, touched, getFieldProps }) => (
          <VStack
            alignItems={"flex-start"}
            spacing={6}
            as="form"
            onSubmit={handleSubmit} 
          >
            <FormControl isInvalid={errors.name && touched.name}>
              <NameInput {...getFieldProps("name")} />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email && touched.email}>
              <EmailInput {...getFieldProps("email")} />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
  
            <FormControl isInvalid={errors.password && touched.password}>
              <PasswordInput {...getFieldProps("password")} />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.contact_no && touched.contact_no}>
              <ContactNo {...getFieldProps("contact_no")} />
              <FormErrorMessage>{errors.contact_no}</FormErrorMessage>
            </FormControl>
  
            <HStack>
            <Button onClick={() => setUser("CLIENT")}>Client</Button>
            <Button onClick={() => setUser("OWNER")}>Owner</Button>
            </HStack> 
            <Stack direction={["column", "row"]} w="full" spacing={5}>
              <Button type="submit" variant="primary" color={"#FFD76F"} bg={"grey"}>
                Register
              </Button>
              </Stack>
          </VStack> 
        )}
      </Formik>
    );
  }
  
  export default Signup;
  