import { SimpleGrid } from "@chakra-ui/react";
import { Blog } from "../types/imageType";
import ImageCard from "./ui/ImageCard";
import { format } from "date-fns";

interface ImageGridComponentProps {
  images: Blog[];
}

const ImageGridComponent = ({ images }: ImageGridComponentProps) => {
  console.log("images inside image Grid", images);

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {images.map((image) => {
        console.log(image);
        const date = format(new Date(image.createdOn), "d MMMM yyyy");
        return (
          <ImageCard
            name={image.name}
            imageUrl={image.imageUrl}
            createdOn={date}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default ImageGridComponent;
