import DarkModeToggle from './DarkModeToggle';

import {
  Box, Button, FormControl, FormLabel, Input, Text, VStack, Link, Heading, FormErrorMessage
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

const LoginForm = () => {
  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <DarkModeToggle />
      <Heading mb={6} textAlign="center">Login</Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

          const validUser = existingUsers.find(
            user =>
              user.email === values.email.trim() &&
              user.password === values.password.trim()
          );

          if (validUser) {
            alert("Login successful!");
            actions.resetForm();
          } else {
            alert("Invalid email or password.");
          }
          console.log("Entered values:", values);
          console.log("Existing users:", existingUsers);

        }}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing={4}>
              <Field name="email">
                {({ field }) => (
                  <FormControl isInvalid={errors.email && touched.email} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} type="email" placeholder="Enter email" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field }) => (
                  <FormControl isInvalid={errors.password && touched.password} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" placeholder="Enter password" />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button colorScheme="blue" width="full" type="submit">
                Login
              </Button>

              <Text fontSize="sm">
                Don't have an account? <Link as={RouterLink} to="/signup" color="teal.500">Sign Up</Link>
              </Text>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
