import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";

// import { loggedUser, useAuth } from "../context/userContext";

interface userProfileHeaderProps {
  username: string;
  email: string;
  imageCount: number;
}

const UserProfileHeader = ({
  username,
  email,
  imageCount,
}: userProfileHeaderProps): JSX.Element => {
  //   const { getCurrentUser } = useAuth();
  //   const user: loggedUser = getCurrentUser();

  return (
    <Flex width="100%">
      <Flex alignItems="center" gap={5}>
        <Avatar
          src="https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
          size="xl"
        />
        <Stack spacing={2}>
          <Text as="span" fontWeight="normal" color="white">
            Name:
            {username && (
              <Text
                ml={2}
                as="span"
                fontWeight="medium"
                color="brand.primary"
                fontSize={"lg"}
              >
                {username}
              </Text>
            )}
          </Text>
          <Text as="span" fontWeight="normal" color="white">
            Email:
            {email && (
              <Text
                ml={2}
                as="span"
                fontWeight="medium"
                color="brand.primary"
                fontSize={"lg"}
              >
                {email}
              </Text>
            )}
          </Text>

          <Text as="span" fontWeight="normal" color="white">
            Image Count:
            {email && (
              <Text
                ml={2}
                as="span"
                fontWeight="medium"
                color="brand.primary"
                fontSize={"lg"}
              >
                {imageCount}
              </Text>
            )}
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default UserProfileHeader;
