import axios from "axios";

export const addFormInput = async (id, inputName, inputVal) => {
  try {
    const res = axios.post("/forms/addFormInput", {
      inputName: inputName,
      inputVal: inputVal,
      id: id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
