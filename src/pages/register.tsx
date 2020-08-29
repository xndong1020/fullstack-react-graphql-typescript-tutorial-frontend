import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_USER = `mutation Register($username: String!, $password: String!) {
  register(input: { username: $username, password: $password}) {
    user {
      username
      createdAt
    }
  }
}`;

const register: React.FC<registerProps> = ({}) => {
  const [_result, register] = useMutation(REGISTER_USER);
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const result = await register(values);
          console.log("result", result);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button
                isLoading={isSubmitting}
                variantColor="teal"
                type="submit"
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default register;
