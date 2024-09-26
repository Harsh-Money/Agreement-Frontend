import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Stack,
  useTimeout,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EmailInput, NameInput, PasswordInput } from ".";
import { useMutation } from "react-query";
import AuthenticationService from "../../services/authentication.service";
import { useUserStore } from "../../stores/user.store";
import { useRouter } from "next/router";
import OverviewServices from "../../services/overview.service";
import LocalStorageService from "../../services/localstorage.service";
import { useOwnerBasket } from "../../stores/ownerBasket.store";

const LoginSchema = Yup.object({
  name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password is too short"),
});

function Login({ closeModal }) {

  const [user, setUser] = useState("");
  const router = useRouter();
  const currentUrl = router.asPath;
  const toast = useToast();
  const {setUserData, userData, clearUserData, setClientData } = useUserStore((state) => state);
  const { ownerBasket, setOwnerBasket, clearOwnerBasket} = useOwnerBasket((state) => state)


  const { mutate: dataForClientLogin } = useMutation(AuthenticationService.loginClientWithUsername, {
    onSuccess: async (data) => {
      clearUserData();
      LocalStorageService.remove("jwtToken");
      await new Promise((resolve) => {
    // Ensure data is valid
          if (data && data.token) {
            setUserData({ jwtToken: data.token });
            LocalStorageService.set("jwtToken", data.token);
          } else {
            console.error("Invalid data received");
          }
      
        resolve(); 
      });
        toast({
          title: 'Login Successful',
          description: `Driving To Overview.....`,
          status: 'success',
          duration: 2000,
          position: 'top',
          isClosable: true,
        })
        
        router.push('/overview');
  },
  onError: (error) => {
    console.log(error);
    toast({
      title: 'Login un-Successful',
      description: "You are not logedIn now.",
      status: 'error',
      duration: 2000,
      position: 'top',
      isClosable: true,
    })
  }
}
)

const { mutate: dataForOwnerLogin} = useMutation(AuthenticationService.loginOwnerWithUsername, {
  onSuccess: async (data) => {
      clearUserData();
      LocalStorageService.remove("jwtToken");
      await new Promise((resolve) => {
        // Ensure data is valid
              if (data && data.token) {
                console.log(data)
                setUserData({ jwtToken: data.token });
                LocalStorageService.set("jwtToken", data.token);
              } else {
                console.error("Invalid data received");
              }
          
            resolve(); 
          });
            toast({
              title: 'Login Successful',
              description: `Driving To Overview.....`,
              status: 'success',
              duration: 2000,
              position: 'top',
              isClosable: true,
            })
            router.push('/ownerOverview');
  },
  onError: (error) => {
    console.log(error);
    toast({
      title: 'Login un-Successful',
      description: "You are not logedIn now.",
      status: 'error',
      duration: 2000,
      position: 'top',
      isClosable: true,
    })
  }
})

  const handleLogin = async (formdata) => {
    if (user === "CLIENT") {
    setClientData({
      clientName: formdata.name
    });
    const data = {
      name: formdata.name,
      password: formdata.password
    }
    if(LocalStorageService.get('jwtToken')){
    LocalStorageService.remove("jwtToken");
    }
    dataForClientLogin(data);
    closeModal();
  } else if (user === "OWNER") {
    setOwnerBasket({
      ownerName: formdata.name
    });
    const data = {
      name: formdata.name,
      password: formdata.password
  }
  if(LocalStorageService.get('jwtToken')){
    LocalStorageService.remove("jwtToken");
    }
  dataForOwnerLogin(data);
  closeModal();
}
    // Api to check whether user is present or not; use formdata.name, formdata.password
  };

  return (
    <Formik
      initialValues={{
        name: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        handleLogin(values);
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

          <FormControl isInvalid={errors.password && touched.password}>
            <PasswordInput {...getFieldProps("password")} />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <HStack>
            <Button onClick={() => setUser("CLIENT")} 
              bg={user == "CLIENT" ? "yellow.400" : "gray.200"}
              color={"black"}
              >Client</Button>
            <Button onClick={() => setUser("OWNER")}
              bg={user == "OWNER" ? "yellow.400" : "gray.200"}
              color={"black"}
              >Owner</Button>
            </HStack>
          <Stack direction={["column", "row"]} w="full" spacing={5}>
          <Button type="submit" variant="primary" color={"#FFD76F"} bg={"grey"}>
              Login
          </Button>
          </Stack>
        </VStack>
      )}
    </Formik>
  );
}

export default Login;
