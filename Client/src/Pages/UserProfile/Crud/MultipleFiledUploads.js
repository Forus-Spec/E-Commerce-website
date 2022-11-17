import axios from "axios";
import * as React from 'react';
import  styled  from 'styled-components';
import Resizer from 'react-image-file-resizer';
import { AuthContext } from "../../../Context/AuthContext";
import { useMutation } from "react-query";
//  Here is an alternative functionality
// https://dev.to/devinekadeni/how-to-upload-multiple-file-with-progress-bar-reactjs-redux-and-expressjs-4hb3
// this is our fileDelete functionality , multipleFilesUpload
import { fileDelete, multipleFilesUpload } from "../../../lib/productAPI";
import InputField from "../../../Components/UIComponents/InputField";
import { COLORS } from "../../../Components/UIComponents/Constants";
import Button from "../../../Components/UIComponents/Button";

const MultipleFileUploads = ({
  imagesId=null,
  setImagesId,}) => {

  const auth      = React.useContext(AuthContext);
  const userToken = auth.authState && auth.authState.token;

  const fileUploads = useMutation(["images"],(files) => {
    return multipleFilesUpload(files,userToken);
  },{
    onSuccess: (data) => {
      let timeout=3000;
      setImagesId((imagesId)=>[...imagesId,data.data])

    }
  })
  const deleteUpload  = useMutation(["images"],(fileId) => {
    return fileDelete(fileId, userToken)
  },{
    onSuccess: (data) => {
      console.log("delete data",data);
      const filteredImages =  imagesId.filter(({public_id})=> public_id !== data.data)
      console.log(filteredImages);
      setImagesId(filteredImages);
      setTimeout(() => {
            deleteUpload.reset();
      },3000);
    },
  })
  const multipleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      return Resizer.imageFileResizer(file, 720, 720, "JPEG", 100, 0,(uri) => resolve(uri),"base64" )
  })}

  const fileUploadAndResize = async (e) => {
    e.preventDefault();
    let files = e.target.files;
     for (let i = 0 ; i < files.length ; i++) {
      try {
          const result = await multipleFileUpload(files[i]);
          fileUploads.mutate(result);
          let timeout=2000;
          if(files.length>2) timeout=3000;
            setTimeout(() => {
            fileUploads.reset();
        },timeout);
        } catch(error){
      }
     }
  }

  return(
    <>
    <FilesWrapper>
        {imagesId.map((image)=>(
          <>
          <ImagesWrapper>
            <DeleteButton onClick={(e) => {
              e.preventDefault();
              deleteUpload.mutate(image.public_id);
              }}>
              X
            </DeleteButton>
              <Image
                className="image-area"
                key={image.public_id}
                src={image.url}
                alt="uploadedFile"
              />
          </ImagesWrapper>
          </>
        ))}
    </FilesWrapper>
        <FileInput
          id="fileInput"
          type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
        />
        {fileUploads.isLoading  ? <LoadingBox>Loading</LoadingBox>:undefined}
        {fileUploads.isSuccess  ? <SmallBox>Image Updated successfully</SmallBox> : null}
        {deleteUpload.isSuccess ? <SmallBox>Image Deleted successfully</SmallBox> :null}
        {deleteUpload.isLoading ? <LoadingBox>Deleting...</LoadingBox>:undefined}
    </>
  )
}
const LoadingBox = styled.div`
    border:1px solid orange;
    border-radius:8px ;
    padding:10px;
    font-weight:bold;
    font-size:28px;
    background-image:${COLORS.transparentGray15} ;
`

const SmallBox = styled.div`
    border:1px solid orange;
        padding:10px;
    font-weight:bold;
    font-size:28px;
    border-radius:8px ;
    background-image:${COLORS.primary} ;
`
// This is our awesome FilesWrapper functionality which is awesome and huge
const FilesWrapper = styled.div`
  border:8px solid ${COLORS.orange};
  border-radius:8px;
  background-image:${COLORS.azure};
  margin-top:10px;
  width:fit-content;
  display:flex;
  gap:28px;
  width:700px;
  height:300px;
`
// This is our ImagesWrapper functionality which is huge and awesome
const ImagesWrapper = styled.div`
  padding:10px;
  position:relative;
  display:flex;
  flex-direction:row;
  justify-content:space-around ;
  align-items:center ;
`
const Image = styled.img`
    border:1px solid ${COLORS.orange};
    width:280px;
    height:280px;
    padding:20px;
`

const DeleteButton = styled.button`
  position:absolute;
  border-radius:50%;
  padding:2px;
  color:white;
  font-weight:bold;
  width:fit-content;
  cursor:pointer;
  background-color:${COLORS.transparentOrange} ;
  top:-5px;
  left:10px;
`

const UploadArea = styled.div`
    position: relative;
    height: 11.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px dashed blue;
    border-radius: 15px;
    margin-top: 2.1875rem;
    cursor: pointer;
    transition: border-color 300ms ease-in-out;
`

const DropZoneParagraph = styled.p`
    font-size: 0.9375rem;
    color: rgb(196, 195, 196);
    margin: 0;
    margin-top: 0.625rem;
    transition: opacity 300ms ease-in-out;
`

// This is the greatest DropZone image functionality ever which is amazing and awesome
const DropZoneImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.3125rem;
    border-radius: 10px;
    z-index: 1000;
    transition: opacity 300ms ease-in-out;
`

// const FileInput = styled.input`
//     width: 100px;
//     /* background-color:`${COLORS.primary}`; */

// `;

const FileInput = styled.input`
  /* background-image:${COLORS.primary} */
`
//This is our removeImage functionality which is huge and awesome
const RemoveImage = styled.button`
    border-radius: 3em;
    padding: 3px;
    text-decoration: none;
    background: rgb(172, 121, 121);
    border: 1px solid #fff;
    color: rgb(99, 50, 50);
    cursor: pointer;
    &:hover{
        background:#E54E4E;
    }
`
//  This is the greatest Image area functionality
const ImageArea = styled.img`
    position: relative;
    width: 200px;
    height: 200px;
    padding: 8px;
    border-radius: 8px;
`


export default MultipleFileUploads;
