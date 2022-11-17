
import { Wrapper } from '../Wrapper';
import React,{useState} from 'react';
import styled from 'styled-components';
import InputField from "../../../Components/UIComponents/InputField";
import Dropdown from '../../../Components/UIComponents/Dropdown/Dropdown';
import MultipleFileUploads from './MultipleFiledUploads';
import { useMutation, useQuery } from 'react-query';
import { createProduct, fetchBrands, fetchCategories } from '../../../lib/productAPI';
import Dropdownz from '../../../Components/UIComponents/Dropdown/Dropdownz';
import { AuthContext } from '../../../Context/AuthContext';
import Button from '../../../Components/UIComponents/Button';
import Label from '../../../Components/UIComponents/Label'
import { COLORS } from '../../../Components/UIComponents/Constants';
import useInput from '../../../Hook/useInput';

const CreateProduct = () => {

  const [brand,setBrand ]        =  React.useState(null);
  const [category,setCategory]   =  React.useState(null);
  const [error,setError ]        =  React.useState("");
  const [imagesId, setImagesId ] =  React.useState([]);

  const auth      = React.useContext(AuthContext);
  const userToken = auth && auth.authState.token;

  const { data: categories, isLoading: isLoadingCategories} = useQuery(["categories"],()=>{
    return fetchCategories();
  });

  const {data:brands, isLoading: isLoadingBrands} =
  useQuery(["brands"],()=>{
    return fetchBrands();
  });

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    const { name, price, description, stock } = event.target.elements

    const productObject = {
        name:name.value,
        price:price.value,
        description:description.value,
        stock:stock.value,
        images:imagesId.map((el)=>el.url),
        category,
        brand
    }
    product.mutate(productObject);
    setTimeout(()=>product.reset(),4900);
  }
  const product = useMutation(["products"],(productData) => {
    return createProduct(productData,userToken)
  },{
    onSuccess: () => { console.log("Product is successfully created");},
    onError  : (error) => {
      setError(error.response.data.msg);
    },
  },)

  const brandsOptions   = brands && brands.data.brands.map((el)=>{
      return { name:el.name,id: el._id }
  })
  const categoryOptions = categories && categories.data.categories.map((el)=>{
    return   { name:el.name,id: el._id }
  })
  // This is our groupCollapsed functionality which is amazing and awesome
  console.groupCollapsed();
  console.log("ImageId",imagesId);
  console.groupEnd();

  return (
    <Wrapper>
      <Form
        onSubmit={onSubmitHandler}>
      <FormInput>
        <Title>Create product</Title>
        <InputField
        htmlFor="name"
        id="name" label="Product name"
        size="medium"
      />
         <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              isSuccess={false}
              isError={false}
              label="message"
              />
          <InputField
              htmlFor="price"
              label ="Product price"
              size="medium"
              id="price"
            />
          <Dropdown
              label="Categories"
              options={categoryOptions}
              setData={setCategory}
              isLoading={isLoadingCategories}
          />
          <Dropdownz
              label="Brands"
              options={brandsOptions}
              setData={setBrand}
              isLoading={isLoadingBrands}
            />
          <InputField
              htmlFor="stock"
              id="stock"
              label="stock"
              type="number"
            />
      </FormInput>
      <ImageInput>
          <div>
            <UploadTitle>Images Uploads</UploadTitle>
            <UploadToolTipMessage>Allowed formats .jpeg, .png,</UploadToolTipMessage>
            <MultipleFileUploads
              setImagesId={setImagesId}
              imagesId={imagesId}
              />
          </div>
          <div>
        <ErrorMessage>  {product.isError   ? error : undefined}</ErrorMessage>
        <SuccessMessage>{product.isSuccess ? "Product created successfully" : undefined}</SuccessMessage>
          <Button
            size="extra"
            variant="outline"
            type="submit">Create product</Button>
          </div>
      </ImageInput>
      </Form>
    </Wrapper>
  )
}
const ErrorMessage = styled.div`
  font-weight:bold;
  border-radius:8px;
  font-size:29px;
  color:white;
  border:1px solid ${COLORS.orange};
  background-color:${COLORS.transparentOrange} ;
  width:fit-content;
  padding:10px;
`

const SuccessMessage = styled.div`
  font-weight:bold;
  border-radius:8px;
  font-size:29px;
  color:white;
  background-color:${COLORS.secondary};
  width:fit-content;
  padding:10px;
`
// This is our ImageInput functionality which is amazing and awesome
const ImageInput = styled.div`
  display:flex;
  flex-direction:column ;
  align-items:baseline ;
  justify-content:space-between ;

`
//This is our great UploadToolTip area functionality
const UploadToolTip = styled.div`
  color: rgb(171, 202, 255);
  cursor: pointer;
  transition: color 300ms ease-in-out;
  &:hover  {
    color: rgb(63, 134, 255);
    opacity: 1;
    visibility: visible;
  }
`
const Textarea = styled.textarea`
  width: 717px;
  font-size:28px;
  padding: 0.5em 2em;
  margin-left:8px;
  height: 250px;
  border-radius: 5px;
  resize: none;
  border:none;
    &:focus {
    box-shadow:  ${props =>
      props.isSuccess
        ? `0px 8px 12px -2px ${COLORS.green}`
        : props.isError
        ? `0px 8px 12px -2px ${COLORS.danger}`
        : `0px 8px 12px -2px ${COLORS.transparentGray15}`};
    transform: scale(1.02, 1.02);
    transition: all 0.4s -0.125s;
    &::placeholder {
      font-weight: 800;
      color: ${COLORS.gray500};
    }
  }
`;
// this is our UploadToolTipMessage functionality which is amazing and awdesome
const UploadToolTipMessage = styled.span`
  margin-bottom:20px;
  min-width: max-content;
  background-color: rgb(255, 255, 255);
  color:  rgb(63, 134, 255);
  border: 1px solid rgb(171, 202, 255);
  padding: 10px;
`

const UploadParagraph = styled.p`
  font-size: 0.9375rem;
  color: rgb(245, 248, 255);
  margin-top: 0;
`
const FormInput = styled.div`
  display:flex;
  flex-direction:column ;
`
//  This is our title functionality which is amazing
const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  letter-spacing: 2px;
  line-height: 2;
  z-index:9 ;
`;

// This is our form functionality which is huge and awesome
const Form = styled.form`
  display:flex;
  gap:180px;
  flex-direction:row ;
  text-align:left;
  width:min-content;
`

const UploadTitle = styled.h1 `
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0.3125rem;
  text-align:center;
`

export default CreateProduct


// const ProductCreate = () => {

//  const [values, setValues] = React.useState(initialState);
//  const [subOptions, setSubOptions] = React.useState([]);
//  const [showSub, setShowSub] = React.useState(false);
//  const [loading, setLoading] = React.useState(false);
//  const [visualSubs, setVisualSubs] = React.useState([]);
//  const [subName, setSubName] = React.useState([]);
//  const { user } = useSelector((state) => ({ ...state }));

//      const queryClient = useQueryClient();
//      const { data, isLoading, isError, isPreviousData } = useQuery(["pcategories"], () => getCategories(user.token).then(res => { setValues({ ...values, categories: res.data },) }))
//      // This is our productCreate functionality
//      const productCreate = useMutation((values) => createProduct(values, user.token), {
//           onSuccess: () => queryClient.invalidateQueries(['products'])
//      });

//      const { data: subCategories, isLoading: subLoading, isError: subError } = useQuery(['subCategories', subName], () => getCategorySubs(subName).then(res => {
//           setSubOptions(res.data.map(d => ({
//                "value": d._id,
//                "label": d.name
//           })))
//      }));

//      const HandleCategoryChange = e => {
//           e.preventDefault();
//           setVisualSubs([]);
//           setSubName(e.target.value);
//           setValues({ ...values, subs: [], category: e.target.value });
//           setShowSub(true);
//      }

//      const handleSubmit = (e) => {
//           e.preventDefault();
//           toast.promise(productCreate.mutateAsync(values), {
//                loading: "Loading...!",
//                success: (data) => `Successfully saved ${data.name}`,
//                error: (err) => `This just happened: ${err}`
//           })
//           setValues({
//                ...values,
//                title: "",
//                description: "",
//                price: "",
//                category: "",
//                subs: [],
//                shipping: "",
//                quantity: "", images: [],
//                colors: ["Pink", "Whip", "Sand", "SugarPlum", "OldMauve", "OldLavender", "Popstar"],
//                brands: ["Chanel", "EsteeLauder", "Dior", "MAC", "Guerlain", "NARS", "YvesSaintLaurent", "Givenchy", "Reveon"],
//                color: "",
//                brand: ""
//           });
//           setVisualSubs([]);
//      }
//      // This is our handleChangeCategory
//      const handleChange = (e) => { setValues({ ...values, [e.target.name]: e.target.value }); }

//      return (
//           <>
//                <div>
//                     <div>
//                          <FileUpload
//                               values={values}
//                               setValues={setValues}
//                               setLoading={setLoading}
//                          />
//                     </div>
//                     <ProductCreateForm
//                          isLoading={subLoading}
//                          handleSubmit={handleSubmit}
//                          handleChange={handleChange}
//                          setValues={setValues}
//                          values={values}
//                          handleCategoryChange={HandleCategoryChange}
//                     />
//           </>
//      )
// }
// export default ProductCreate
