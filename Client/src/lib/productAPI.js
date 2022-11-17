import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchProducts = async ({
  query,
  price,
  brand,
  categoriesList,
  page,
  sort,
  order
},signal) => {
  if (!query && !price && !brand && !categoriesList) {
    return await axios.get(
      `${baseUrl}/products?page=${page}&sort=${sort}&order=${order}`,{signal}
    );
  } else if (query) {
    return await axios.get(`${baseUrl}/products/search/${query}`);
  } else if (brand) {
    return await axios.get(`${baseUrl}/products/brand/${brand}`);
  } else if (categoriesList) {
    let string = "";
    for (let i = 0; i < categoriesList.length; i++) {
      string += `categories=${categoriesList[i]}&`;
    }
    return await axios.get(`${baseUrl}/products/category?${string}`);
  } else if (price) {
    return await axios.get(`${baseUrl}/products/price/${price}`);
  }
};

export const listingProducts = async () => {
  return await axios.get(`${baseUrl}/products/filters`);
};

export const fetchCategories = async () => {
  return await axios.get(`${baseUrl}/categories`);
};

export const fetchBrands = async () => {
  return await axios.get(`${baseUrl}/brands`);
};

export const fetchProductDetail = async slug => {
  return await axios.get(`${baseUrl}/product/${slug}`);
};
// export const createCategory =  async data=>{
//   return await await.post(`${baseUrl}/brand`,{data})
// }
// this is our createCategory
export const createCategory = async (data,token)=>{
  return await axios.post(`${baseUrl}/category`,{name:data},{
    headers: { Authorization: `Bearer ${token}` }})
}

// this is our createBrand functionality
export const createBrand = async (data,token)=>{
  return await axios.post(`${baseUrl}/brand`,{name:data},
  { headers: { Authorization: `Bearer ${token}` }})
}

// this is our deleteBrand functionality
export const deleteBrand = async(slug,token)=>{
  return await axios.delete(`${baseUrl}/brand/${slug}`,
  { headers: { Authorization: `Bearer ${token}` }})
}

// Delete category functionality which is amazing and awesome
export const deleteCategory = async(slug,token)=>{
  return await axios.delete(`${baseUrl}/category/${slug}`,
 { headers: { Authorization: `Bearer ${token}` }})
}

// this is our multipleFilesUpload functionality
export const multipleFilesUpload = async(images,token)=>{
  return await axios.post(`${baseUrl}/uploadImages/`,
  {image: images },
  {headers: {
    Authorization: `Bearer ${token}`
    }
  })
}

// fileDelete functionality which is amazing and awesome
export const fileDelete = async(public_id,token)=>{
  return await axios.post(`${baseUrl}/removeImages/`,
  { public_id },
  { headers: {
    Authorization :`Bearer ${token}`
    }
  }
  )
}
export const createProduct = async(data,token)=>{
  return await axios.post(`${baseUrl}/product/`,data,{
    headers:{ Authorization:`Bearer ${token}`}
  })}

export const getCategory = async(categoryId) => {
  console.log("did it pass",categoryId);
  return await axios.get(`${baseUrl}/category/singleCategory/${categoryId}`);
}

export const getBrand = async(brandId) => {
  console.log("did i make it ",brandId);
  return await axios.get(`${baseUrl}/brand/singleBrand/${brandId}`);
}
