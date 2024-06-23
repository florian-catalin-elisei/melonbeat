import axios from "axios";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    const response = await axios.post(`http://localhost:5000/${route}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

const getToken = () => {
  const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  return accessToken;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  try {
    const token = getToken();
    const response = await axios.post(`http://localhost:5000/${route}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const makeAuthenticatedGETRequest = async (route) => {
  try {
    const token = getToken();
    const response = await axios.get(`http://localhost:5000/${route}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const makeAuthenticatedDELETERequest = async (route) => {
  try {
    const token = getToken();
    const response = await axios.delete(`http://localhost:5000/${route}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};

export const makeAuthenticatedPUTRequest = async (route, body) => {
  try {
    const token = getToken();
    const response = await axios.put(`http://localhost:5000/${route}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};
