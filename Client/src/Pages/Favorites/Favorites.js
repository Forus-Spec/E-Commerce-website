import React from "react";
import { useQuery, useMutation } from "react-query";
import { fetchFavorites } from "../../lib/userAPI";
import { AuthContext } from "../../Context/AuthContext";
import ProductItem from "./ProductItem";
const Favorites = () => {
  const userInfo   = React.useContext(AuthContext);
  const userToken  = userInfo && userInfo.token

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error } = useQuery(["wishlist"],()=> fetchFavorites(userToken));

  const favorites = data && data.data.wishlist;

  console.log(favorites && favorites);

  return (
    <div>
    {favorites && favorites.map((el)=>(
      <ProductItem
       name={el.name}
       category={el.category}
       brand={el.brand}
      />
    ))}
  </div>);
};

export default Favorites;
