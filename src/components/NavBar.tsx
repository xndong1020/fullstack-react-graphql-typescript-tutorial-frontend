import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  let isLoggedIn = false;
  const [{ data, fetching }] = useMeQuery();

  if (fetching) return <Box>Loading...</Box>;
  if (data?.me?.user) isLoggedIn = true;

  return (
    <Flex bg="tomato" p={4}>
      {!isLoggedIn && (
        <Box ml={"auto"}>
          <NextLink href="/login">
            <Link color="white" mr={2}>
              Login
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link color="white" mr={2}>
              Register
            </Link>
          </NextLink>
        </Box>
      )}
      {isLoggedIn && (
        <Box ml={"auto"}>
          <span>Welcome! {data.me.user.username}</span>
          <Button variant="link">Logout</Button>
        </Box>
      )}
    </Flex>
  );
};
