import { CircularProgress } from "@chakra-ui/react";

interface UploadProgressElementProps {
  progress: number;
}

const UploadProgressElement = ({ progress }: UploadProgressElementProps) => {
  return (
    <CircularProgress value={progress} color="brand.primary"></CircularProgress>
  );
};

export default UploadProgressElement;
