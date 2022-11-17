import React from "react";
import { Wrapper } from "../Wrapper";
import InputField from "../../../Components/UIComponents/InputField";
import styled from "styled-components";
import { FormWrapper } from "../FormWrapper";
import { COLORS } from "../../../Components/UIComponents/Constants";
import Dropdown from "../../../Components/UIComponents/Dropdown/Dropdown";
import Button from "../../../Components/UIComponents/Button";
import locationOptions from "../../../static/locationOptions.json";
import FileUpload from "../../../Components/FileUpload/Fileupload";
const Profile = () => {
  const result = locationOptions.map(el => el.country);

  const [country, setCountry] = React.useState(null);
  const [city, setCity] = React.useState(null);

  let data = locationOptions.filter(el => el.country === country);

  data = data[0] && data[0].cities.map(el => el.name);

  return (
    <Wrapper>
      <FormWrapper>
        <Title>Update your profile</Title>
        <Aside>
          Please make sure you fill the form with your update credentials
        </Aside>
        <FileUpload
          handleUpload={() => {
            return "hello";
          }}
        />
        <InputField size="large" label="First name" type="text" />
        <InputField size="large" label="Last name"  type="text" />
        <Dropdown
            label="Country"
            options={result}
            setData={setCountry}
        />
        <div>
          <Dropdown
            label="City"
            disabled={!country}
            options={data && data}
            setData={setCity}
          />
        </div>
        <InputField
          size="large"
          label="Phone"
        />
        <Button
          size="long">Submit</Button>
      </FormWrapper>
    </Wrapper>
  );
};

const Title = styled.h1`
  color: ${COLORS.black};
  font-size: 1.8rem;
`;

const Aside = styled.aside`
  color: ${COLORS.gray};
  font-weight: bold;
`;

export default Profile;
