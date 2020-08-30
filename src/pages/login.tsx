import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { OperationResult } from "urql";
import { toErrorMap } from "../utils";
import { useLoginMutation, LoginMutation } from "../generated/graphql";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const [_result, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const result: OperationResult<LoginMutation> = await login(values);

          if (result.data?.login?.errors)
            setErrors(toErrorMap(result.data?.login?.errors));
          else if (result.data?.login?.user)
            // `router` is creatd by using `useRouter()` hook from `"next/router"`
            router.push("/");
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
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default login;
