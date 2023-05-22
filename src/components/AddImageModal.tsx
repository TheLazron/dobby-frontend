import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { mutate } from "swr";
import { uploadImageRequest } from "../utils/axiosUtils";
import { useAuth } from "../context/userContext";
import UploadProgressElement from "./ui/uploadProgressElement";

type FormValues = {
  imageName: string;
};

const AddImageModal = () => {
  const { jwtToken } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<string | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data.imageName);

    if (selectedFile) {
      const file = selectedFile;
      const formData = new FormData();
      formData.append("image", file);
      formData.append("fileName", data.imageName);
      console.log(formData);

      await uploadImageRequest(formData, "POST", jwtToken, (percentage) => {
        setUploadProgress(percentage);
      });
      mutate(
        "https://dobby-backend-production-104f.up.railway.app/get-my-images"
      );
      onClose();
      setUploadProgress(0);
    } else {
      setFileUploadError("Upload a valid File");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  return (
    <>
      <Button onClick={onOpen}>+ Add New Image</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent gap={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add New Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex gap={4} direction="column">
                <FormControl>
                  <FormLabel>Image Name</FormLabel>
                  <Input
                    placeholder="Image Name"
                    type="text"
                    {...register("imageName", {
                      required: true,
                    })}
                  />
                  {errors.imageName && (
                    <span className="text-red-300">Enter a valid input</span>
                  )}
                  <Input type="file" onChange={handleFileChange} mt={4} />
                </FormControl>
                <Flex justifyContent={"space-around"} alignItems={"center"}>
                  {uploadProgress ? (
                    <>
                      <Text fontWeight={"bold"}>Progress: </Text>
                      <UploadProgressElement progress={uploadProgress} />
                    </>
                  ) : null}
                </Flex>
                {/* <Text>{fileUploadError ?? ""}</Text> */}
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" disabled={!selectedFile}>
                Upload
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddImageModal;
