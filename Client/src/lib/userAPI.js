import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;


export const uploadAvatar = async (uri, config) => {
  return await axios.post(
    `${baseUrl}/uploadAvatar/`,
    { image: uri },
    config
  );
};

export const deleteAvatar = async publicId => {
  return await axios.post(`${baseUrl}/deleteAvatar/`, {
    publicId: publicId
  });
};

export const addFavorite = async (productId, token) => {
  // const id = JSON.stringify(productId);
  return await axios.post(
    `${baseUrl}/user/products/favorites`,{ productId:productId },{ headers: { Authorization: `Bearer ${token}` } }
  );
};
export const removeFavorite = async (id,token) => {
  return await axios.post(`${baseUrl}/user/favorites/${id}`,{
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const contactUs = async ({ data }) => {
  return await axios.post(`${baseUrl}/user/contact`, { data });
};

export const fetchFavorites = async (token) =>
  await axios.get(`${baseUrl}/user/products/favorites`, {
    headers: {token},
  });

export const updateUserPassword = async(token,passwordConfirm) => {
  return await axios.post(`
    ${baseUrl}/user/updatePass`,
    passwordConfirm,
    { headers: { Authorization: `Bearer ${token}` }})
}
