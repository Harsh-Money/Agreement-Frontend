import { createElement, useState } from "react";
import LoginForm from "./Login";
import { Box, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { AddIcon, EmailIcon, UnlockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Login from "./Login";
import Signup from "./SignUpForm";

export const NameInput = (fieldProps) => {
    return (
      <InputGroup size={"lg"}>
        <InputLeftElement pointerEvents="none">
          <AddIcon />
        </InputLeftElement>
        <Input
          pl={12}
          type="text"
          name="name"
          placeholder="Name"
          _focusVisible={{
            borderColor: "primary.500",
          }}
          {...fieldProps}
        />
      </InputGroup>
    );
  };
  
  export const EmailInput = (fieldProps) => {
    return (
      <InputGroup size={"lg"}>
        <InputLeftElement pointerEvents="none">
          <EmailIcon />
        </InputLeftElement>
        <Input
          pl={12}
          type="email"
          name="email"
          placeholder="Email"
          _focusVisible={{
            borderColor: "primary.500",
          }}
          {...fieldProps}
        />
      </InputGroup>
    );
  };
  
  export const PasswordInput = (fieldProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const { confirmPassword, ...rest } = fieldProps;
    return (
      <InputGroup size={"lg"}>
        <InputLeftElement pointerEvents="none">
          <UnlockIcon />
        </InputLeftElement>
        <Input
          pl={12}
          type={`${showPassword ? "text" : "password"}`}
          name="password"
          placeholder={`${confirmPassword ? "Confirm" : ""} Password`}
          bg="black"
          _focusVisible={{
            borderColor: "primary.500",
          }}
          {...rest}
        />
        <InputRightElement  mr={"2"} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 
          (<><ViewIcon /></>):(<><ViewOffIcon /></>)}
        </InputRightElement>
      </InputGroup>
    );
  };

const AuthForm = ({ formType = "login", handleOnClose}) => {

    const [form, setForm] = useState(formType);

    const handleAccountClick = () => {
      if (form === "login") {
        setForm("signup");
      } else {
        setForm("login");
      }
    };
    const FormConfig = {
      login: {
        heading: "Login", 
        account_text: "create an account",
        component: Login,
        props: {},
      },
      signup: {
        heading: "Register", 
        account_text: "login to existing account",
        component: Signup,
        props: {
          showLogin: () => setForm("login"),
        },
      },
    };
    return (
      <Box>
        <VStack alignItems={"flex-start"}>
          <Heading> {FormConfig[form].heading} </Heading>
          <Text>
            or{" "}
            <Text
              as="span"
              color="primary.500"
              borderBottom={"1px"}
              cursor="pointer"
              onClick={handleAccountClick}
            >
              {FormConfig[form].account_text}
            </Text>
          </Text>
        </VStack>
        <Box mt={10}>
          {createElement(FormConfig[form].component, {
            closeModal: handleOnClose,
            ...FormConfig[form].props,
          })}
        </Box>
      </Box>
    );
  };

  export default AuthForm;

