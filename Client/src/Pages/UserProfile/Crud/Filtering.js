// This is our import React.useRef()
import React,{forwardRef} from "react";
import styled,{css, keyframes} from "styled-components";
import Button from "../../../Components/UIComponents/Button";
import InputField from "../../../Components/UIComponents/InputField";
import {useQueryClient, useMutation,useQuery} from 'react-query';
import Icon from "../../../Components/Icon";
import { createCategory, createBrand, fetchBrands, deleteCategory, deleteBrand,fetchCategories,} from "../../../lib/productAPI";
import { AuthContext } from "../../../Context/AuthContext";
import { COLORS } from "../../../Components/UIComponents/Constants";
import { LoadingAnimation } from "../../../Components/UIComponents/Spinners/LoadingAnimation";

const Filtering = () => {

  const queryClient = useQueryClient();
  const auth        = React.useContext(AuthContext);
  const userToken   = auth.authState && auth.authState.token;
  const scrollingReference = React.useRef(null);

  const [{
  errorMessage,
  successMessage},setFeedback]= React.useState({errorMessage:null,successMessage:null})
  let {
    data      : categories,
    isLoading : isLoadingCategories,
  } = useQuery(["categories"], () => {
    return fetchCategories();
  });

  let {
    data     : brands,
    isLoading: isLoadingBrands,
  } = useQuery(["brands"], () => {
    return fetchBrands();
  });

  const addCategory = useMutation((category) => createCategory(category,userToken)
  ,{
    onMutate:(res) => {
      const oldCategory = queryClient.getQueryData(["categories",categories]);
      queryClient.setQueryData(["categories",categories],
      (data) => ({...data,res}));
      return function rollback(){
        queryClient.setQueryData(["categories",categories],(data)=> ({
          ...data,
          res:oldCategory
        }));
      }
    },
    onError:(error,variables,rollback)=>{
      rollback();
    },
    onSuccess:(data,variables,rollback)=>{
      rollback();
      queryClient.setQueryData(["categories",categories],data)
    }
  })
  const addBrand = useMutation((brand)=>{
    return createBrand(brand,userToken);
  },{
    onSuccess:() => {
      queryClient.invalidateQueries(["brands"],{exact:true})
    },
    onError:()=>{}
  })
  const removeBrand = useMutation((brandSlug) => {
    return deleteBrand(brandSlug,userToken);
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(["brands"],{exact:true})
    },
    onError:()=>{
    }
  })
  const removeCategory = useMutation((categorySlug)=>{
    return deleteCategory(categorySlug,userToken)
  },
  {
    onSuccess:() => queryClient.invalidateQueries(["categories"],{exact:true})
   ,onError:()=>{}
  })
  // these are our awesome categories functionality
  console.log(categories && categories);

  return (
    <>
    <Wrapper>
      <Section>
        <Title>Brands(Pending UI)</Title>
        <SubWrapper onSubmit={event=>{
            event.preventDefault();
            if(addBrand.isLoading) return;
            const name = event.target.brand.value
            addBrand.mutate(name,userToken)
            setTimeout(()=>{
              addBrand.reset();
            },1500)
          }}>
          <InputField
            placeHolder="add new brand"
            size="small"
            type="text"
            id="brand"
          />
          <Button
              isLoading={addBrand.isLoading}
              type="submit"
              variant="circular"
              size="normal"
             >
            Submit
          </Button>
        </SubWrapper>
        <ScrollableContent
           isDeleting = {removeBrand.isLoading}
           removeHandler={removeBrand}
           flash={addBrand.isSuccess}
           ref={brands && scrollingReference}
           isLoading={isLoadingBrands}
           data ={brands && brands.data.brands}
           isSuccess={addBrand.isSuccess}
        />
      </Section>
        <Title>Feedback</Title>
         <Box>
          {addBrand.isSuccess       ? "Brand successfully Created" : addCategory.isSuccess ? "Category Successfully Created":""}
          {addBrand.isError         ? addBrand.error    && addBrand.error.response.data.msg.toUpperCase() + "❌" : ""}
          {addCategory.isError      ? addCategory.error && addCategory.error.response.data.msg.toUpperCase()+"❌" : ""}
          {removeBrand.isSuccess    ? "Brand Successfully Removed" : removeCategory.isSuccess ? "Category Successfully Removed":""}
          </Box>
      <Section>
        <Title>Category (Optimistic UI)</Title>
        <SubWrapper onSubmit={event => {
           event.preventDefault();
           if(addCategory.isLoading) return;
           const name = event.target.category.value
           addCategory.mutate(name)
            // setTimeout(()=>{
            //   addCategory.reset();
            // },1500)
        }}
        >
          <InputField
            size="small"
            id="category"
            placeHolder="add new category"
          />
          <Button
            isLoading={addCategory.isLoading}
            variant="circular"
            size="normal"
            type="submit">
            Submit
          </Button>
        </SubWrapper>
        <ScrollableContent
            isDeleting={removeCategory.isLoading}
            isLoading={isLoadingCategories}
            removeHandler={removeCategory}
            flash={addCategory.isSuccess}
            data={categories && categories.data.categories}
            isSuccess={addCategory.isSuccess}
        />
      </Section>
    </Wrapper>
    </>
  );
};


const ScrollableContent = forwardRef((props,ref)=> {
  // This is the greatest thing ever
  console.log("This our props.data functionality",props.data);

  return (
    <Container ref={ref} >
      <ScrollBox>
        <List>
        {props.isLoading && <LoadingAnimation/>}
        {props.data && props.data.map((el,index)=>(
         <Item flash={index === props.data.length -1 && props.flash}>
            {el.name}
            <Sub>
               <Button isLoading={props.removeHandler.isLoading &&props.deletedElement ===el.slug } variant="outline" size="extraSmall" onClick={()=>{
                props.removeHandler.mutate(el.slug)
                setTimeout(()=>{
                  props.removeHandler.reset();
                },1000)
              }}>
                <Text>Remove</Text>
                <Icon name="trash" />
              </Button>
              <Button variant="outline" size="extraSmall">
                <Text>Update</Text>
                <Icon name="info" />
              </Button>
            </Sub>
          </Item>
        ))}
        </List>
      </ScrollBox>
    </Container>
  );
});


// This is our Box functionality which is amazing and awesome
const Box = styled.div`
  background-color:${COLORS.azure};
  width:200px;
  height:88px ;
  margin-left:auto;
  margin-right:auto;
  font-weight:bold;
  padding:12px;
  text-align:center;
  border-radius:8px;
  font-size:18px;
  margin-top:70px;
  transition:0.4s;
  position:absolute;
`

const SubWrapper = styled.form`
  display: flex;
`;

const blinker = keyframes`
  from {opacity: 1.0;}
  to {opacity: 0.0;}
`



const Item = styled.li`
  margin:8px;
  padding: 16px 8px 16px 8px;
  text-align:center;
  background-image: ${props=> props.flash ? `${COLORS.secondary}` :"rgba(225,225,225,0.2)" };
  box-shadow: 0px 24px 24px rgba(0,0,0,0.4);
  border: 1px solid rgba(225,225,225,0.1);
  outline:${props=> props.isDeleting ? `2px solid red` :"" } ;
  border-radius:16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-weight:bold;
  color:white;
  font-size:23px;
  text-decoration: blink;
  /* ${props => (props.visible ? "0" : "-120px")}; */
	-webkit-animation-name:${props => (props.flash ? css`${blinker}`:"")};
	-webkit-animation-duration: 0.6s;
	-webkit-animation-iteration-count:infinite;
	-webkit-animation-timing-function:ease-in-out;
	-webkit-animation-direction: alternate;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

// This is our container functionality which is amazing and awesome
const Container = styled.div`
  background-color: ${COLORS.black};
  border-radius: 0.5em;
  box-sizing: border-box;
  height: 490px;
  overflow: auto;
  outline:${props=>props.isDeleting ? "8px solid red":""};
  outline-offset: ${props=>props.isDeleting ? "11 px": ""};
  transition:0.4s ease-in-out ;
`;

// This is our scrollBox functionality which is amazing and awesome
const ScrollBox = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  display:relative;
  background: white;
  height: 1250px;
  width: 1740px;
  border: 1px solid black;
  border-radius: 8px;
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  text-align: center;
  margin: auto 32px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  background: linear-gradient(
    109.6deg,
    rgb(245, 239, 249) 30.1%,
    rgb(207, 211, 236) 100.2%
  );
  box-shadow: -10px -10px 20px -5px #f9fbfd, 10px 10px 20px #b8b6b6;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  letter-spacing: 2px;
  line-height: 2;
  z-index:9 ;
`;
const Text = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
`;
const Sub = styled.div`
  display: flex;
`;
const Section = styled.div``;

export default Filtering;
