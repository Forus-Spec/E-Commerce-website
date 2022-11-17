import axios from 'axios';

export default async function axiosClient(endpoint,
  {
    dataEndpoint = '',
    data = {},
    token = null,
    type = "GET",
  } = {},
  ...customConfiguration) {

  const methodType = (type) => {
    const types = {
      POST: "post",
      GET: "get",
      PUT: "put",
      DELETE: "delete",
    };
    return types[type];
  };

  const configuration = {
    url: `${process.env.REACT_APP_BASE_URL}/${endpoint}/${dataEndpoint || ''}`,
    method: methodType(type) || "get",
    data: data,
    headers: {
      "Access-Control-Allow-Origin:": "*",
      "Content-type": "Application/JSON",
      "Authorization": `Bearer ${token}`
    }

  }
  console.log("axios configuration", configuration)
  return axios(
    configuration,
    ...customConfiguration
  )
}
