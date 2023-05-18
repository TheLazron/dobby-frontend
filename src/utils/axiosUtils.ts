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
      url: url,
      data: data,
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);

    throw error;
  }
};

export { makeAxiosPostRequest, makeAuthenticatedRequest };
