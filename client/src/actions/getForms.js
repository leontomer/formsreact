import axios from "axios";

export const getForms = async () => {
  try {
    const res = axios.get("/forms/getForms");
    return res;
  } catch (error) {
    console.log(error);
  }
};
