import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../UIComponents/Constants";

/**
 * using web api for more classic approach
 * doesn't fit with previous patterns
 */

const Dropzone = ({ setDropFile, children, onUpload }) => {
  const [{ inDropZone, alert }, setInDropZone] = React.useState({
    inDropZone: null,
    alert: null
  });

  const wrapperRef = React.useRef(null);

  const onDragEnter = event => {
    event.preventDefault();
    wrapperRef.current.classList.add("dragover");
    setInDropZone(true);
  };

  const onDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    wrapperRef.current.classList.add("dragover");
    setInDropZone(true);
  };

  const onDragLeave = event => {
    event.preventDefault();
    wrapperRef.current.classList.remove("dragover");
    setInDropZone(false);
  };

  const onDrop = event => {
    event.preventDefault();
    wrapperRef.current.classList.remove("dragover");

    let file =
      event.dataTransfer.files.length > 1
        ? undefined
        : event.dataTransfer.files[0];

    if (!file) {
      setInDropZone({
        inDropZone: false,
        alert: "We are sorry to tell you we only accept one photo"
      });
    } else {
      setDropFile(file);
      onUpload();
    }
  };
  return (
    <>
      <DropzoneComponent
        ref={wrapperRef}
        className="drag"
        inDropZone={inDropZone}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {children}
        <p> {alert ? alert : undefined} </p>
      </DropzoneComponent>
    </>
  );
};

const spin = keyframes`
   100%{
    transform:rotateZ(360deg);
   }
`;

const DropzoneComponent = styled.div.attrs(props => ({
  className: props.className
}))`
  &.drag {
    margin-top: inherit;
    width: inherit;
    height: inherit;
    transition: inherit;
    background-color: inherit;
    border-radius: 50%;
    transition: 0.4s ease-out;
  }
  &.dragover {
    outline: 6px dashed ${COLORS.orange};
    outline-offset: 8px;
    animation: ${spin} 9s linear infinite;
    transition: 0.4s ease-in;
  }
`;

export default Dropzone;
