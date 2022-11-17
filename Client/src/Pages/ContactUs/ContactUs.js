import React from "react";
import styled from "styled-components";
import InputField from "../../Components/UIComponents/InputField";
import Button from "../../Components/UIComponents/Button";
import Select from "react-select";
import Label from "../../Components/UIComponents/Label";
import { COLORS } from "../../Components/UIComponents/Constants";
import axiosClient from "../../lib/axiosClient";
import {
  errorConfig,
  successConfig
} from "../../Components/UIComponents/Notification/notification";

import toast from "react-hot-toast";
import FieldShell from "../../Components/UIComponents/InputField/FieldShell";
import { AuthContext } from "../../Context/AuthContext";
import { contactUs } from "../../lib/userAPI";

const options = [
  { value: "chocolate", label: "chocolate" },
  { value: "strawberry", label: "strawberry" },
  { value: "Vanilla", label: "Vanilla" }
];

const style = {
  control: (base, state) => ({
    ...base,
    border: "2px solid #B4B4B4",
    outline: "3px solid green",
    outlineOffset: "3px",
    width: "1230px",
    height: "55px"
  })
};
const ContactUs = () => {
  const { authState } = React.useContext(AuthContext);
  const fullName =(authState.token && authState.userInfo.firstName + " " + authState.userInfo.lastName) ||false;

  const email = (authState.token && authState.userInfo.email) || false;

  const [contact, setContact] = React.useState({
    name: "",
    email: "",
    orderNo: "",
    message: ""
  });

  const [feedBack, setFeedBack] = React.useState({
    status: "idle",
    message: null,
    error: null
  });

  const { status, message, error } = feedBack;

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
      [name]: value
    });
  };
  // notifySuccess
  const handleSubmit = async e => {
    e.preventDefault();
    setFeedBack({
      status: "pending",
      message: ""
    });
    await contactUs(`message`, contact)
      .then(res => {
        toast.success(`${res.data.message}`, successConfig());
        setFeedBack({
          status: "resolved",
          message: res.message
        });
      })
      .catch(error => {
        if (error.message === "Request failed with status code 429") {
          toast.error(`${error.response.data}`, errorConfig());
        } else if (error.message === "Network Error") {
          toast.error(
            `Something went wrong with server try again later`,
            errorConfig()
          );
        } else {
          toast.error(`${error.response.data.msg}`, errorConfig());
        }
        setFeedBack({
          status: "rejected",
          error: error
        });
      });
    setContact({
      data: {
        name: "",
        email: "",
        oderNo: "",
        message: ""
      }
    });
  };
  return (
    <>
      <Wrapper>
        <div></div>
        <Header>
          <Title></Title>
          <Aside>
            Do you Have any questions or concerns ? contact us by filling out
            the form below Don't forget to also check out our FAQ pages which is
            amazing and awesome !
          </Aside>
        </Header>
        <Form onSubmit={handleSubmit}>
          <InputField
            size="large"
            disabled={(fullName && true) || false}
            value={fullName || contact.name}
            label="Your Name"
            name="name"
            onChange={handleChange}
          ></InputField>
          <InputField
            size="large"
            disabled={(email && true) || false}
            value={email || contact.email}
            label="Your Email Address"
            name="email"
            onChange={handleChange}
          ></InputField>
          <InputField
            size="large"
            value={contact.orderNo}
            label="Order"
            name="orderNo"
            onChange={handleChange}
          ></InputField>
          <FieldShell size="large" label="inquiry">
            <Select styles={style} options={options} />
          </FieldShell>
          <FieldShell size="large" label="inquiry">
            <Textarea
              isSuccess={true}
              label="message"
              name="message"
              placeholder="Express !"
              value={contact.message}
              onChange={handleChange}
              isError={true}
            ></Textarea>
          </FieldShell>
          <Button isLoading={status === "pending"} size="extra">
            Submit
          </Button>
        </Form>
        {status === "pending" && <p>Thank you !</p>}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  margin-top: 72px;
`;

const Header = styled.header`
  display: block;
  text-align: center;
  width: 800px;
  margin-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 60px;
`;

const Textarea = styled.textarea`
  outline: ${props =>
  props.isSuccess ? `3px solid ${COLORS.green}` : props.isError ? `3px solid ${COLORS.red}`: `3px solid ${COLORS.gray}`};
  outline-offset: 3px;
  min-width: 1232px;
  height: 250px;
  border: 1px solid ${COLORS.gray};
  border-radius: 5px;
  resize: none;
`;

const Aside = styled.aside`
  padding: 20px;
  font-size: 1.2rem;
  font-style: italic;
  color: ${COLORS.gray};
  letter-spacing: 1px;
  font-weight: bold;
  border-radius: 4px;
  border: 4px ridge ${COLORS.gray300};
  outline: 8px ridge ${COLORS.gray700};
  background-color: ${COLORS.white};
  outline-offset: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 29px;
`;

export default ContactUs;
