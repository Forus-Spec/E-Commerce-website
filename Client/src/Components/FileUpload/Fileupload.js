import React from "react";
import styled, { keyframes, css } from "styled-components";
import Resizer from "react-image-file-resizer";
import { uploadAvatar, deleteAvatar } from "../../lib/userAPI";
import useAsync from "../../Hook/useAsync";
import Icon from "../Icon";
import { COLORS } from "../UIComponents/Constants";
import ProgressBar from "../UIComponents/ProgressBar";
import { Player } from "@lottiefiles/react-lottie-player";
import Dropzone from "./Dropzone";

const FileUpload = ({ handleUpload }) => {
  const [progress, setProgress] = React.useState(0);
  const [dropFile, setDropFile] = React.useState(null);

  // This is our awesome application which is amazing and awesome
  const [{ fileSrc, fileName, fileSize }, setPreImage] = React.useState({
    file: null,
    fileSrc: null,
    fileName: null,
    fileWidth: null,
    fileHeight: null,
    fileSize: undefined
  });

  const {
    run: remove,
    isLoading: imageRemoveLoading,
    isSuccess: removedSuccessfully,
    data: imageRemoved,
    setError: setImageRemoveError,
    isError: isImageRemoveError,
    error: imageRemoveError,
    setReset: setImageRemoveReset
  } = useAsync();

  const {
    run,
    isLoading,
    isSuccess,
    isError,
    setData,
    data,
    setError,
    error,
    setReset
  } = useAsync();

  console.log("file_drop 🌠", dropFile);

  const progressConfig = {
    onUploadProgress: progressEvent => {
      setProgress(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
    }
  };

  const isAllowedType = file =>
    ["image/png", "image/jpeg", "image/svg+xml", "image/avif"].includes(
      file && file.type
    );

  const imagePreview = file => {
    const fileReader = dropFile ? dropFile : file;
    const reader = new FileReader();
    setImageRemoveReset();
    reader.readAsDataURL(fileReader);
    reader.onloadend = function(event) {
      let base64data = reader.result;
      setPreImage({
        file: base64data,
        fileSrc:    event.target.result,
        fileName:   fileReader.name,
        fileWidth:  fileReader.width,
        fileHeight: fileReader.height,
        fileSize:   fileReader.size
      });
    };
  };

  // This is our fileUploadAndResize functionality
  const fileUploadLoadAndResize = e => {
    const file = dropFile ? dropFile : e && e.target && e.target.files[0];
    const fileToUpload = isAllowedType(file) ? file : undefined;
    if (fileToUpload) {
      imagePreview(fileToUpload);
      return Resizer.imageFileResizer(
        fileToUpload,
        720,
        720,
        "JPEG",
        100,
        0,
        uri => run(uploadAvatar(uri, progressConfig)),
        "base64"
      );
    } else {
      if (!e) return;
      setError(
        `image file is ${file.type} !
         please make sure the file type is
         either jpeg or png or avif or svg
        `
      );
    }
  };

  const deleteFile = id => {
    if (id === null || id === undefined) {
      setImageRemoveError("Sorry my Friend, there is no image to delete !");
    } else {
      remove(deleteAvatar(id));
      setReset();
      setPreImage({
        fileSrc: null,
        fileName: null,
        fileSize: null
      });
    }
  };

  React.useEffect(() => {
    handleUpload(data && data.url);
  }, [isSuccess, data]);

  // to avoid rendering the function the first page loads
  const firstUpdate = React.useRef(true);
  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      fileUploadLoadAndResize();
    }
  }, [dropFile]);

  return (
    <>
      <AvatarContainer>
        <AvatarUpload>
          <Label>
            <IconWrapperV1>
              <Icon
                name="camera"
                size={32}
                strokeWidth={2}
                color={COLORS.orange}
              />
              <InputFile
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={fileUploadLoadAndResize}
              />
            </IconWrapperV1>
            <IconWrapperV2>
              <Icon
                onClick={() => deleteFile(data && data.public_id)}
                name="trash"
                size={32}
                strokeWidth={2}
                color={COLORS.danger}
              />
            </IconWrapperV2>
          </Label>
          <AvatarPreview>
            <Dropzone
              setDropFile={setDropFile}
              isMultipleFile={false}
              onUpload={fileUploadLoadAndResize}
            >
              <DefaultImage
                isLoading={isLoading}
                alt={fileName || undefined}
                key={fileSrc || undefined}
                src={fileSrc || undefined}
              />
            </Dropzone>
          </AvatarPreview>
        </AvatarUpload>
        <ImagePreviewInformation>
          <strong style={{ textAlign: "right", width: "fit-content" }}>
            file name : {fileName}
          </strong>
          <strong>file size:{fileSize}</strong>
        </ImagePreviewInformation>
        <ProgressBar value={progress}></ProgressBar>
        <Feedback
          success={isSuccess}
          loading={isLoading}
          isError={isError}
          info={(isLoading && isImageRemoveError) || progress === 100}
        >
          {isSuccess
            ? "Updated successfully ✔️"
            : isError && error
            ? error.message || "Something went wrong check your server"
            : isLoading
            ? "loading..."
            : isLoading && isImageRemoveError
            ? "Please wait in order to delete"
            : isLoading && isImageRemoveError
            ? "Wait for the image to upload"
            : imageRemoved
            ? "Image removed successfully"
            : isImageRemoveError
            ? imageRemoveError.message || imageRemoveError
            : imageRemoveLoading
            ? "Deleting..."
            : undefined}
        </Feedback>
        {/* {isSuccess ? (
          <FeedbackSuccess>Image Updated successfully ✔️</FeedbackSuccess>
        ) : isLoading ? (
          <>
            <FeedbackInfo>
              {progress === 100 ? "Just few seconds..." : "Uploading...⏳"}
            </FeedbackInfo>
            <ProgressBar value={progress} />
          </>
        ) : isError ? (
          <FeedbackError>
            {(error && error.message) ||
              "Something went wrong check your server"}
          </FeedbackError>
        ) : (
          undefined
        )} */}
        {/* {imageRemoved ? (
          <Feedback>Image Deleted successfully ✔️
        ) : isLoading && isImageRemoveError ? (
          <FeedbackInfo>wait this process in order to delete...⏳</FeedbackInfo>
        ) : imageRemoveLoading ? (
          <FeedbackInfo>.Deleting... ⏳</FeedbackInfo>
        ) : isImageRemoveError ? (
          <FeedbackError>
            {imageRemoveError.message || imageRemoveError}
          </FeedbackError>
        ) : (
          undefined
        )} */}
        <Aside>We Recommend that you upload a real photo</Aside>
      </AvatarContainer>
    </>
  );
};

// this is our great progressWrapper functionality which is awesome
const progressWrapper = styled.div`
  padding: 12px;
  height: 300px;
  width: 300px;
`;

const ImagePreviewInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 2px solid ${COLORS.transparentGray15};
  margin-top: 20px;
  border-radius: 8px;
`;

const Feedback = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: white;
  border: none;
  margin-right: auto;
  margin-left: auto;
  border-radius: 32px;
  padding: 6px;
  /* transition: 0.4s; */
  transition: 0.8s;
  margin-top: ${props => (props.success ? "36px" : "40px")};
  width: ${props => (props.success ? "340px" : "400px")};
  padding: ${props => (props.success ? "18px" : "22px")};
  background: ${props =>
    props.success
      ? COLORS.primary
      : props.info
      ? COLORS.azure
      : props.isError
      ? COLORS.danger
      : ""};
`;

const IconWrapperV1 = styled.label`
  padding: 10px;
  border-radius: 5px;
  background-color: ${COLORS.black};
  position: absolute;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  margin: auto;
  &:hover::after {
    width: fit-content;
    padding-left: 6px;
    padding-right: 6px;
    color: ${COLORS.orange};
    border-radius: 8px;
    content: "Upload your photo";
    color: white;
    font-weight: bold;
    letter-spacing: 1.5px;
    background-image: ${COLORS.secondary};
  }
  &:before {
    content: " ";
    display: block;
    position: absolute;
    height: 50px;
    width: 50px;
    background-image: url("");
  }
`;

const IconWrapperV2 = styled.div`
  padding: 10px;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  gap: 20px;
  flex-direction: row-reverse;
  background-color: ${COLORS.black};
  position: absolute;
  right: 0px;
  justify-content: space-between;
  cursor: pointer;
  margin: auto;
  &:hover::after {
    width: fit-content;
    padding-left: 6px;
    padding-right: 6px;
    color: ${COLORS.white};
    border-radius: 8px;
    content: "Delete your photo";
    font-weight: bold;
    letter-spacing: 1.5px;
    background-image: ${COLORS.primary};
  }
`;

const Label = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-bottom: 1px;
  cursor: pointer;
  font-weight: normal;
`;
const loader = keyframes`
  /* from {
    background-position: -2.8% 0;
  } */

  to {
   background-position: 315px 0, 0 0, 0 190px, 50px 195px;
  }
`;
const DefaultImage = styled.img`
  background-size: 200%;
  border: ${props =>
    props.isLoading
      ? `8px solid ${COLORS.transparentOrange}`
      : `3px ridge ${COLORS.green}`};
  transition: 0.8s;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
  background-size: ${props => (props.isSuccess ? "cover" : "")};
  background-repeat: ${props => (props.isSuccess ? "cover" : "")};
  background-position: ${props => (props.isSuccess ? "center" : "")};
`;

const AvatarContainer = styled.div`
  margin-top: 28px;
  padding: 18px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  text-align: center;
`;

const AvatarContainerTitle = styled.div`
  font-size: 38px;
  font-weight: bold;
  text-align: center;
`;

const Aside = styled.small`
  display: block;
  color: ${COLORS.gray};
  font-size: 1.3rem;
  margin-top: 32px;
`;

export const AvatarPreview = styled.div`
  margin-top: 40px;
  width: 362px;
  height: 362px;
  position: relative;
  background: ${COLORS.transparentGray35};
  border-radius: 100%;
  outline: 2px solid ${COLORS.orange};
  outline-offset: 4px;
  box-shadow: 0 8px 60px -8px hsl(210, 14%, 80%);
`;

const AvatarUpload = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`;

const InputFile = styled.input`
  display: none;
  width: 100px;
`;

export default FileUpload;
