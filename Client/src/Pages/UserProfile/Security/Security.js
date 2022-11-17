import React from "react";
import Button from "../../../Components/UIComponents/Button";
import InputField from "../../../Components/UIComponents/InputField";
import { COLORS } from "../../../Components/UIComponents/Constants";
import styled from "styled-components";
import { Wrapper } from "../Wrapper";
import { FormWrapper } from "../FormWrapper";
import { AuthContext } from "../../../Context/AuthContext";
import { useMutation } from "react-query";
import { updateUserPassword } from "../../../lib/userAPI";
import toast from "react-hot-toast";

// This is our security functionality which is amazing
const Security = () => {
  // This is the greatest our awesome functionality which is amazing
  const auth = React.useContext(AuthContext);
  const email = auth && auth.authState.userInfo.email;
  const userToken  = auth && auth.authState.token

  const passwordUpdate = useMutation("userPassword",(passwordChange)=> {
    return updateUserPassword(userToken,passwordChange)
  },{
    onSuccess:()=>{
      toast.success("Password will change successfully")
    },
    onError:()=>{
      toast.error("Something went totally wrong")
    }
  })

  // This is our awesome handleSubmit functionality which is huge and awesome
  const handleSubmit  = (event) => {
    event.preventDefault();
    let timer;
    // This is our passwordChange functionality which is huge and awesome
    const passwordChange = {
      oldPassword     :event.target.elements.oldPassword.value,
      newPassword     :event.target.elements.newPassword.value,
      passwordConfirm :event.target.elements.passwordConfirm.value,
      email
    }
    //
    passwordUpdate.mutate(passwordChange);
    setTimeout(() =>passwordUpdate.reset(), 2500);
  }
  const errorMessage =passwordUpdate.error && passwordUpdate.error.response.data.msg


  return (
    <Wrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <Title>Update your password</Title>
        <Aside>
          Please be sure to make your password Complex for you own awesome safety
        </Aside>
        <InputField
          label="Old password"
          type="password"
          placeHolder="old password"
          size="large"
          id="oldPassword"
        />
        <InputField
          label="New password"
          type="password"
          placeHolder="new password"
          size="large"
          id="newPassword"
        />
        <InputField
          label="Confirm password"
          type="password"
          placeholder="confirm password"
          size="large"
          id="passwordConfirm"
        />
        {passwordUpdate.isError ? <ErrorMessage>{errorMessage}</ErrorMessage>: undefined}
        {passwordUpdate.isSuccess?  <SuccessMessage>Successfully updated</SuccessMessage>:undefined}
        <Button
        type="submit"
        size="large"
        isLoading={passwordUpdate.isLoading}>
          Submit
        </Button>
      </FormWrapper>
    </Wrapper>
  );
};
const ErrorMessage = styled.div`
  font-weight:bold;
  float:right;
  border-radius:8px;
  font-size:29px;
  color:white;
  border:1px solid ${COLORS.orange};
  background-color:${COLORS.transparentOrange} ;
  width:fit-content;
  padding:10px;
  text-align:center;
      margin-left:auto;
    margin-right:auto;
    position:absolute ;
    bottom:0;
    right:0;
`


const SuccessMessage = styled.div`
  font-weight:bold;
    margin-left:auto;
    margin-right:auto;
  text-align:center;
  border-radius:8px;
  font-size:29px;
  color:white;
  background-image:${COLORS.secondary};
  width:fit-content;
  padding:10px;
`

const Title = styled.h1`
  color: ${COLORS.black};
  font-size: 1.8rem;
`;

const Aside = styled.aside`
  color: ${COLORS.gray};
  font-weight: bold;
`;

// This is our form functionality

export default Security;
