import axios from "axios";

export const getFormInputs = async (id) => {
  try {
    const res = axios.get("/forms/getFormInputs", {
      params: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
