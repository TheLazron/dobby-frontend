import {
  Button,
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
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create a New Blog</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
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
                <Input type="file" onChange={handleFileChange} mb={4} />
                {uploadProgress && (
                  <UploadProgressElement progress={uploadProgress} />
                )}
              </FormControl>
              <Text>{fileUploadError ?? ""}</Text>
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
