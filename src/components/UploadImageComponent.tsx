import React, { useState } from "react";
import { Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import UploadProgressElement from "./ui/uploadProgressElement";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJ1c2VySWQiOiI2NDY2NjQ2ZmU5OTM0NjQ0MTMyNDM4ODciLCJpYXQiOjE2ODQ0NDc0MzcsImV4cCI6MTY4NDQ0OTIzN30.Bgh4XvyeOeF1fwvpltdHJhQ98vFKjdjM3o3_E_UR9zQ";
const UploadImageComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageName, setImageName] = useState<string>("");
  const [fileUploadError, setFileUploadError] = useState<string | null>();

  const handleFileSelect = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting

    if (selectedFile) {
      const file = selectedFile;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("fileName", imageName);

      try {
        await axios.post("http://localhost:3700/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setUploadProgress(percentage);
          },
        });
        console.log("Upload complete");
      } catch (error) {
        console.error(error); // Handle any errors
      }
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
      <FormControl isRequired>
        <form onSubmit={handleFileSelect}>
          <Flex direction="column">
            <Input type="file" onChange={handleFileChange} mb={4} />
            <Input
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
          </Flex>

          <Button type="submit" colorScheme="blue" disabled={!selectedFile}>
            Upload
          </Button>
          {uploadProgress && (
            <UploadProgressElement progress={uploadProgress} />
          )}
          {selectedFile && (
            <Input
              value={selectedFile.name}
              isReadOnly
              mt={4}
              variant="filled"
            />
          )}
        </form>
      </FormControl>
      <Text>{fileUploadError ?? ""}</Text>
    </>
  );
};

export default UploadImageComponent;
