import axios from "axios";

export const getFormFields = async (id) => {
  try {
    const res = axios.get("/forms/getFormFields", {
      params: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
