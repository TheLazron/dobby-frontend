import axios, { AxiosResponse, AxiosError } from "axios";

const makeAxiosPostRequest = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    console.log(error);

    throw error;
  }
};

const makeAuthenticatedRequest = async (
  url: string,
  data: any,
  method: string,
  token: string
) => {
  try {
    console.log("axios Token", token);

    const response = await axios({
      method: method,
      url,
      data: data,
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);

    throw error;
  }
};

const uploadImageRequest = async (
  data: any,
  method: string,
  token: string,
  progressCallback: (percentage: number) => void
) => {
  await axios({
    method,
    url: "https://dobby-backend-production-104f.up.railway.app/upload-image",
    data,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total!
      );
      progressCallback(percentage);
    },
  });
};
export { makeAxiosPostRequest, makeAuthenticatedRequest, uploadImageRequest };
