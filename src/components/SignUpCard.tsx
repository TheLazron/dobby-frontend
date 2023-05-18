import { useForm, SubmitHandler } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../context/userContext";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const SignUpCard = () => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUp(data.username, data.email, data.password);
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={"transparent"}
      w={"120"}
      mx={2}
    >
      <Stack spacing={8} maxW={"lg"}>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} px={16} py={12}>
          <Stack spacing={12} max-width="40rem">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-300">This field is required</span>
                )}
              </FormControl>

              <FormControl isRequired id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  })}
                />
                {errors.email && (
                  <span className="text-red-300">Enter a valid input</span>
                )}
              </FormControl>

              <FormControl isRequired id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-300">This field is required</span>
                )}
              </FormControl>

              <Stack spacing={10}>
                <Button
                  bg={"brand.secondary"}
                  color={"white"}
                  _hover={{
                    bg: "brand.secondary",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpCard;
