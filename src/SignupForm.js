import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    VStack,
    Link,
    Heading,
    FormErrorMessage,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DarkModeToggle from './DarkModeToggle';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignupForm = () => {
    const formBg = useColorModeValue('white', 'gray.700');

    return (
        <Box
            bg={formBg}
            maxW="md"
            mx="auto"
            mt={20}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
        >
            <DarkModeToggle />
            <Heading mb={6} textAlign="center">
                Sign Up
            </Heading>

            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
                    const isEmailExist = existingUsers.find(user => user.email === values.email);

                    if (isEmailExist) {
                        alert('User already exists with this email.');
                    } else {
                        existingUsers.push(values);
                        localStorage.setItem('users', JSON.stringify(existingUsers));
                        alert('Account created successfully!');
                        actions.resetForm();
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <VStack spacing={4}>
                            <Field name="name">
                                {({ field }) => (
                                    <FormControl isInvalid={errors.name && touched.name} isRequired>
                                        <FormLabel>Full Name</FormLabel>
                                        <Input {...field} type="text" placeholder="Enter your name" />
                                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="email">
                                {({ field }) => (
                                    <FormControl isInvalid={errors.email && touched.email} isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input {...field} type="email" placeholder="Enter your email" />
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="password">
                                {({ field }) => (
                                    <FormControl isInvalid={errors.password && touched.password} isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input {...field} type="password" placeholder="Enter your password" />
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Button colorScheme="teal" width="full" type="submit">
                                Create Account
                            </Button>

                            <Text fontSize="sm">
                                Already have an account?{' '}
                                <Link as={RouterLink} to="/" color="blue.500">
                                    Login
                                </Link>
                            </Text>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default SignupForm;
