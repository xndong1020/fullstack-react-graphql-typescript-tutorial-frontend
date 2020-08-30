import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation, RegisterMutation } from "../generated/graphql";
import { OperationResult } from "urql";
import { toErrorMap } from "../utils";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const result: OperationResult<RegisterMutation> = await register(
            values
          );
          if (result.data?.register?.errors) {
            setErrors(toErrorMap(result.data.register.errors));
          } else if (result.data?.register?.user)
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
