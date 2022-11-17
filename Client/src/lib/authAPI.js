import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const login      = async data => await axios.post(`${baseUrl}/auth/login`, data);
export const register   = async data => await axios.post(`${baseUrl}/auth/register`, data);
export const checkEmail = async data => await axios.post(`${baseUrl}/user/checkEmail`, { email: data });
export const checkPhone = async data => await axios.post(`${baseUrl}/user/checkPhone`, { phone: data });
