import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
} from "@chakra-ui/react";

interface UploadProgressElementProps {
  progress: number;
}

const UploadProgressElement = ({ progress }: UploadProgressElementProps) => {
  return (
    <CircularProgress value={progress} color="brand.primary">
      <CircularProgressLabel>{progress}</CircularProgressLabel>
    </CircularProgress>
  );
};

export default UploadProgressElement;
