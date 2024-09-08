import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Stack,
    VStack,
  } from "@chakra-ui/react";
  import * as Yup from "yup";
  import { Formik, useFormik } from "formik";
  import { EmailInput, NameInput, PasswordInput } from ".";
  
  function Signup({showLogin}) {
      const handleFormSubmit = async (formData) => {
      // Api to check whether user is present or not; use formdata.name, formdata.password
      showLogin();
    };
  
    const SignUpSchema = Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short"),
    });
  
    return (
      // Formik is defined
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          referral_code: "",
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
  
            <FormControl
              isInvalid={errors.confirm_password && touched.confirm_password}
            >
              <PasswordInput
                confirmPassword
                {...getFieldProps("confirm_password")}
              />
              <FormErrorMessage>{errors.confirm_password}</FormErrorMessage>
            </FormControl>
            {/* <FormControl isInvalid={errors.referral_code && touched.referral_code}>
              <ReferralIdInput referralId={referralCodeFromUrl} referralCodefromUrlExist={referralCodefromUrlExist} />
              <FormErrorMessage>{errors.referral_code}</FormErrorMessage>
            </FormControl> */}
            <Stack direction={["column", "row"]} w="full" spacing={5}>
              <Button type="submit" variant="primary" >
                Register
              </Button>
              </Stack>
          </VStack> 
        )}
      </Formik>
    );
  }
  
  export default Signup;
  