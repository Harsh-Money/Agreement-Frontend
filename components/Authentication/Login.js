import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { EmailInput, PasswordInput } from ".";

const LoginSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short"),
});

function Login({ closeModal }) {
  // const formik = useFormik({
  //     initialValues: {
  //         name: '',
  //       password: '',
  //       email: '',
  //       contact_no: '',
  //       roles: []
  //     },
  //     validationSchema: Yup.object({
  //       firstName: Yup.string()
  //         .max(15, 'Must be 15 characters or less')
  //         .required('Required'),
  //       lastName: Yup.string()
  //         .max(20, 'Must be 20 characters or less')
  //         .required('Required'),
  //       email: Yup.string().email('Invalid email address').required('Required'),
  //     }),
  //     onSubmit: values => {
  //       alert(JSON.stringify(values, null, 3));
  //     },
  //   });

  const handleLogin = async (formdata) => {
    closeModal();
    // Api to check whether user is present or not; use formdata.name, formdata.password
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleSubmit, errors, touched, getFieldProps }) => (
        <VStack
          alignItems={"flex-start"}
          spacing={6}
          as="form"
          onSubmit={handleSubmit}
        >
          <FormControl isInvalid={errors.email && touched.email}>
            <EmailInput {...getFieldProps("email")} />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password && touched.password}>
            <PasswordInput {...getFieldProps("password")} />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <Stack direction={["column", "row"]} w="full" spacing={5}>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Stack>
        </VStack>
      )}
    </Formik>
  );
}

export default Login;
