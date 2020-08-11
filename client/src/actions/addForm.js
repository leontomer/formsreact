import axios from "axios";

export const addForm = async (formName, fields) => {
  try {
    const res = axios.post("/forms/addForm", {
      formName: formName,
      fields: fields,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
