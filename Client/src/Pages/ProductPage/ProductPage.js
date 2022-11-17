import React from "react";
import styled from "styled-components/macro";
import {
  COLORS,
  WEIGHTS,
  CORNERS
} from "../../Components/UIComponents/Constants";
import Select from "../../Components/Select";
import Spacer from "../../Components/Spacer";
import ProductSidebar from "../../Components/ProductSidebar";
import ProductGrid from "../ProductGrid";
import SearchProducts from "../ProductGrid/SearchProducts";
import { Outlet, useSearchParams } from "react-router-dom";
import Button from "../../Components/UIComponents/Button";
import { useQuery, useQueryClient } from "react-query";
import {fetchBrands,fetchCategories,fetchProducts} from "../../lib/productAPI";

// Please add signal function to the product page functionality
const ProductPage = () => {
  const queryClient = useQueryClient();
  const [buttonInformation, setButtonInformation] = React.useState("none");

  // this is our searchParams functionality which is amazing
  let   [searchParams,setSearchParams]  = useSearchParams();
  const [currentPage, setCurrentPage ]  = React.useState(1);
  const [categoryIds,setCategoriesId ]  = React.useState([]);
  const [sortId, setSortId           ]  = React.useState("createdAt");

  const [{brand,categoriesList,price }, setState] = React.useState({
    brand: null,
    query: null,
    categoriesList: null,
    price: null
  });

  const query = searchParams.get("query");

  const { data, isLoading, isError, refetch } = useQuery(
    ["products",{
        query,
        price,
        brand,
        categoriesList: categoriesList,
        sort: sortId,
        order: "desc",
        page: currentPage
      }
    ],
    ({signal}) =>
      fetchProducts({
        query,
        price,
        brand,
        categoriesList: categoriesList,
        sort: sortId,
        order: "desc",
        page: currentPage,
      },signal),
    { staleTime: 5000, cacheTime: 10 }
  );
  // you can also check the loading state via   statusQuery.products === "loading"
  React.useEffect(() => {
    if (!brand && categoriesList && categoriesList.length === 0 && !price) {
      setState({ brand: null, categoriesList: null, price: null });
      refetch();
    }
  }, [brand, categoriesList, price]);

  let {
    data     : categories,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories
  } = useQuery("categories", () => {
    return fetchCategories();
  });

  let {
    data: brands,
    isLoading: isLoadingBrands,
    isSuccess: isSuccess
  } = useQuery("brands", () => {
    return fetchBrands();
  });

  const handleCategory = e => {
    const checkName = e.target.value;
    const categoriesIdList = [...categoryIds];
    const alreadyChecked = categoriesIdList.indexOf(checkName);
    if (alreadyChecked === -1) {
      categoriesIdList.push(checkName);
    } else {
      categoriesIdList.splice(alreadyChecked, 1);
    }
    setCategoriesId(categoriesIdList);
    setState({
      query: null,
      brand: null,
      price: null,
      categoriesList: categoriesIdList
    });
  };

  const handleBrand = e => {
    e.preventDefault();
    setState({
      query: null,
      price: null,
      categoriesList: null,
      brand: e.target.value
    });
  };
    const handlePrice = price => {
    setState({
      query: null,
      brand: null,
      categoriesList: null,
      price: price
    });
  };

  const handleSearch = event => {
    event.preventDefault();
    const query = event.target.value;
    setSearchParams({ query });
  };

  const helpers = () => ({
    none: "Please Pick a reading option !",
    listing: "Your page information will be layed out in different way",
    infinite: "Your page information will processed through scrolling",
    pagination: "Your page information will be processed through pagination"
  });


  return (
    <>
      <Wrapper>
        <MainColumn>
          <Header>
            <SearchProducts
              onChange={handleSearch}
              isLoading={isLoading}
              isError={isError}
              // value={query && query}
            />
            <WrapperInformation>
              <h1>Products</h1>
            </WrapperInformation>
            <Select
              label="Sort"
              value={sortId}
              onChange={ev => setSortId(ev.target.value)}
            >
              <option value="createdAt">Newest Releases</option>
              <option value="sold">Most sold</option>
            </Select>
          </Header>
          <Spacer size={32} />
          <ProductGrid data={data && data.data} isLoading={isLoading} />
          <Pagination>
            <Button
              size="small"
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage(previousValue => previousValue - 1);
              }}
            >
              Previous Page
            </Button>
            <Button
              size="small"
              variant="outline"
              disabled={currentPage >= 10}
              onClick={() => {
                //This is our currentPage functionality which is amazing and awesome
                setCurrentPage(previousValue => previousValue + 1);
              }}
            >
              Next Page
            </Button>
          </Pagination>
        </MainColumn>
        <LeftColumn>
          <Spacer size={12} />
          {/*  */}
          <FilteringProcess typeMessage={helpers()[buttonInformation]}>
            <Button
              onMouseEnter={() => setButtonInformation("infinite")}
              variant="outline"
              size="medium"
            >
              Infinite scrolling
            </Button>
            <Button
              onMouseEnter={() => setButtonInformation("pagination")}
              variant="outline"
              size="medium"
            >
              Pagination
            </Button>
            <Button
              onMouseEnter={() => setButtonInformation("listing")}
              variant="outline"
              size="medium"
            >
              Listing
            </Button>
          </FilteringProcess>
          <Spacer size={32} />
          <ProductSidebar
            isLoadingCategories={isLoadingCategories}
            categories={categories && categories}
            handleCategory={handleCategory}
            handlePrice={handlePrice}
            handleBrand={handleBrand}
            isLoadingBrands={isLoadingBrands}
            brands={brands && brands}
          />
        </LeftColumn>
      </Wrapper>
      <Outlet />
    </>
  );
};

const Pagination = styled.div`
  outline: 3px solid ${COLORS.orange};
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 32px;
  margin-top: 62px;
  background-color: ${COLORS.white};
  border-radius: ${CORNERS.large};
`;
const FilteringProcess = styled.div`
  background: ${COLORS.transparentGray35};
  box-shadow: inset 3px 3px 5px #cbcbcb,
    inset -3px -3px 5px ${COLORS.transparentGray35};
  border-radius: 8px;
  margin-left:auto ;
  margin-right:auto;
  display: flex;
  padding: 1px;
  font-size: 32px;
  padding: 8px;
  justify-content: space-evenly;
  position:relative;
  display:flex;
  flex-direction:column ;
  justify-content:center ;
  align-items:center ;
  border:none;
  transition:0.4s;
  width:200px;
  &:after{
      content:"Pick a reading option !";
        padding: 8px;
      font-size: 1.05rem;
      opacity:0.6;
      transition:0.4s;
      font-weight:bold;
       background: ${COLORS.transparentGray15};
           border-radius: 10px;
           border:none;
          text-align:center;

  };
  &:hover:after {
          opacity:0.9;
    content: "${props =>
      props.typeMessage ? props.typeMessage : "Oh Buttons!"}";
    position: relative;
    font-size: 1rem;
        width:fit-content;
      border:none;
    background: ${COLORS.transparentGray35};
    color:${COLORS.black};
    border-radius: 10px;
    padding: 8px;
    font-weight:bold;
          text-align:center;
  }
`;

const Wrapper = styled.div`
  padding: 69px 289px 69px 69px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 62px;
  transition: 0.8s;
`;

const LeftColumn = styled.div`
  position: sticky;
  top: 0;
  align-self: start;
  flex-basis: 248px;
  border: none;
  margin-right: 42px;
`;

const MainColumn = styled.div`
  flex: 1;
`;

const Header = styled.header`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: baseline;
`;

// This is our wrapperInformation functionality which is amazing and awesome
const WrapperInformation = styled.div`
  background: white;
  padding: 10px;
`;
export default ProductPage;
