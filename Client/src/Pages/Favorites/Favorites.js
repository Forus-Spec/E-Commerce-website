import React from "react";
import { useQuery, useMutation } from "react-query";
import { fetchFavorites } from "../../lib/userAPI";
import { AuthContext } from "../../Context/AuthContext";
import ProductItem from "./ProductItem";
const Favorites = () => {
  const userInfo   = React.useContext(AuthContext);
  const userToken  = userInfo && userInfo.token

  const {data,isSuccess,isLoading,isError,error } = useQuery(["wishlist"],()=> fetchFavorites(userToken));
  const favorites = data && data.data.wishlist;

  console.log(favorites && favorites);

  return (
    <div>
    {isError    ? <p>Something wrong happened...</p> : undefined}
    {isLoading  ? <p>Loading favorites...</p> : undefined}
    {isSuccess && favorites.map((el)=>(
      <ProductItem
        imageUrl = {el.images[0]}
        name={el.name}
        price={el.price}
        description={el.description}
        categoryId={el.category}
        brandId={el.brand}
      />
    ))}
  </div>
  );
};

export default Favorites;
