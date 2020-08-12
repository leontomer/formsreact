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
