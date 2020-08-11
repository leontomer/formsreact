import axios from "axios";

export const getFormName = async (id) => {
  try {
    const res = axios.get("/forms/getFormName", {
      params: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
