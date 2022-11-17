import React from "react";
import Button from "../../Components/UIComponents/Button";
import InputField from "../../Components/UIComponents/InputField";
import styled from "styled-components";
import Select from "react-select";
import { COLORS, CORNERS } from "../../Components/UIComponents/Constants";
import locationOptions from "../../static/locationOptions.json";
import { useForm, Controller } from "react-hook-form";
import FieldShell from "../../Components/UIComponents/InputField/FieldShell";
import ReactSelectStyle from "../../Components/UIComponents/ReactSelectStyle";
import {
  checkEmail,
  checkPhone,
  register as authRegister
} from "../../lib/authAPI";
import useAsync from "../../Hook/useAsync";
import awesomeDebouncePromise from "awesome-debounce-promise";
import FileUpload from "../../Components/FileUpload";

const RegisterPage = ({ setSuccessHeader }) => {
  const [{ country, cities, city, disabled }, setLocation] = React.useState({
    disabled: true,
    country: null,
    cities: [],
    city: null
  });

  const {
    isLoading,
    isSuccess,
    isError,
    run,
    data: userInformations
  } = useAsync();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, dirtyFields, isValidating, isSubmitted }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      image: "",
      country: "",
      city: ""
    }
  });

  const scrollToTop = (value = 0) => {
    window.scrollTo({
      top: value,
      behavior: "smooth"
    });
  };

  const handleCountryChange = data => {
    setLocation({
      disabled: false,
      country: data,
      cities: data.cities,
      city: null
    });
    setValue("country", data.country);
  };

  const handleCityChange = city => {
    setLocation(location => ({
      ...location,
      city: city
    }));
    setValue("city", city.name);
  };

  const handleImageUrl = url => setValue("image", url);

  const firstNameValidation = register("firstName", {
    required: "Name is required.",
    minLength: {
      value: 2,
      message: "Your name length doesn't feel right"
    },
    maxLength: {
      value: 32,
      message: "Too much for a name"
    }
  });

  const lastNameValidation = register("lastName", {
    required: "lastName is required.",
    minLength: { value: 2, message: "Your name length doesn't feel right" },
    maxLength: { value: 32, message: "Too much for a name" }
  });

  const emailValidation = register("email", {
    required: "Email is required.",
    pattern: {
      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message:
        "email should be valid email follows @ and your domain name . email password"
    },
    validate: awesomeDebouncePromise(
      async value => {
        try {
          const result = await checkEmail(value);
          return result.data.data;
        } catch (error) {
          return "Email already exists";
        }
      },
      700,
      { onlyResolvesLast: true }
    )
  });

  const phoneValidation = register("phone", {
    required: "phone number is required",
    valueAsNumber: true,
    pattern: { value: /^[0-9]+$/, message: "only numbers are valid" },
    validate: awesomeDebouncePromise(
      async value => {
        try {
          const result = await checkPhone(value);
          return result.data.data;
        } catch (error) {
          return "Phone already exists";
        }
      },
      400,
      { onlyResolvesLast: true }
    )
  });

  const passwordValidation = register("password", {
    deps: ["passwordConfirm"],
    required: "Password is required.",
    minLength: {
      value: 6,
      message:
        "For security purposes we appreciate that your password should be more than 6 characters !"
    }
  });

  const passwordConfirmValidation = register("passwordConfirm", {
    deps: ["password"],
    required: "i would be Pleased if  confirm your  password",
    validate: value => {
      const { password } = getValues();
      return password === value || "Password should match!";
    }
  });
  React.useEffect(() => {
    if (isSuccess) {
      scrollToTop(100);
      setSuccessHeader(true);
    }
  }, [isSuccess]);
  const onSubmit = async data => {
    console.log(data);
    run(authRegister(data));
  };

  React.useEffect(() => {
    const preventDefault = e => e.preventDefault();
    document.addEventListener("dragover", preventDefault);
    document.addEventListener("drop", preventDefault);
    return () => {
      document.removeEventListener("dragover", preventDefault);
      document.removeEventListener("drop", preventDefault);
    };
  }, []);

  return (
    <>
      {!isSuccess ? (
        <FormWrapper isLoading={isLoading} onSubmit={handleSubmit(onSubmit)}>
          <>
            <FileUpload
              handleUpload={handleImageUrl}
              values={getValues()}
              setValue={setValue}
            />
            <AlignItems>
              <InputField
                htmlFor="firstName"
                type="text"
                name="firstName"
                id="firstName"
                label="First name"
                size="medium"
                error={errors.firstName}
                isError={errors.firstName}
                isSuccess={dirtyFields.firstName && !errors.firstName}
                errorMessage={errors.firstName && errors.firstName.message}
                register={firstNameValidation}
              />
              <InputField
                htmlFor="lastName"
                type="text"
                name="lastName"
                id="lastName"
                label="Last name"
                size="medium"
                error={errors.lastName}
                isError={errors.lastName}
                isSuccess={dirtyFields.lastName && !errors.lastName}
                errorMessage={errors.lastName && errors.lastName.message}
                register={lastNameValidation}
              />
            </AlignItems>
            <InputField
              htmlFor="email"
              type="email"
              size="large"
              name="email"
              label="E mail"
              id="email"
              register={emailValidation}
              isLoading={isValidating}
              error={errors.email}
              isError={errors.email}
              successMessage={
                dirtyFields.email && !errors.email && "Valid email"
              }
              isSuccess={dirtyFields.email && !errors.email}
              errorMessage={errors.email && errors.email.message}
            />
            <InputField
              htmlFor="password"
              type="password"
              name="password"
              id="password"
              label="Password"
              size="large"
              register={passwordValidation}
              error={errors.password}
              isError={errors.password}
              isSuccess={!errors.password && dirtyFields.password}
              successMessage={!errors.password && dirtyFields.password}
              errorMessage={errors.password && errors.password.message}
            />
            <InputField
              htmlFor="passwordConfirm"
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              label="Confirm password"
              size="large"
              register={passwordConfirmValidation}
              error={errors.passwordConfirm}
              isError={errors.passwordConfirm}
              isSuccess={!errors.passwordConfirm && dirtyFields.passwordConfirm}
              errorMessage={errors.passwordConfirm && errors.passwordConfirm.message}
            />
            <div>
              <Controller
                name="country"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FieldShell
                    size="large"
                    label="Select country"
                    isSuccess={country && true}
                    isError={!country && errors.country}
                  >
                    <Select
                      {...field}
                      styles={ReactSelectStyle}
                      placeholder="Select-Country"
                      value={country}
                      options={locationOptions}
                      onChange={handleCountryChange}
                      getOptionLabel={e => e.country}
                      getOptionValue={e => e.country}
                    />
                  </FieldShell>
                )}
              />
              {!country && errors.country && (
                <ErrorMessage>Please select country</ErrorMessage>
              )}
              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FieldShell
                    size="large"
                    label="Select City"
                    isSuccess={city && true}
                    isError={!city && errors.city}
                  >
                    <Select
                      {...field}
                      styles={ReactSelectStyle}
                      isDisabled={disabled}
                      placeholder="Select-City"
                      value={city}
                      options={cities}
                      onChange={handleCityChange}
                      getOptionLabel={x => x.name}
                      getOptionValue={x => x.name}
                    />
                  </FieldShell>
                )}
              />
              {(!city && errors.city && (
                <ErrorMessage>Please select City</ErrorMessage>
              )) || <p></p>}
            </div>
            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              id="phone"
              size="large"
              error={errors.phone}
              isError={errors.phone}
              isSuccess={!errors.phone && dirtyFields.phone}
              errorMessage={errors.phone && errors.phone.message}
              register={phoneValidation}
            />
            <br />
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              type="submit"
              size="extra"
            >
              Register
            </Button>
          </>
        </FormWrapper>
      ) : (
        <EmptyWrapper>
          <Title>Thank you for joining us</Title>
        </EmptyWrapper>
      )}
    </>
  );
};
const Title = styled.h1`
  font-weight: bold;
  font-size: 70px;
`;

const ErrorMessage = styled.div`
  text-align: left;
  opacity: 0.9;
  border-radius: ${CORNERS.small};
  margin-top: 10px;
  width: fit-content;
  font-size: 28px;
  background-color: ${COLORS.red};
  color: white;
  padding: 2px 6px;
`;

const EmptyWrapper = styled.form`
  width: fit-content;
  transition: 0.4s;
  display: flex;
  height: 752px;
  box-shadow: 1px 21px 38px -2px rgba(135, 245, 216, 0.43);
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const FormWrapper = styled.form`
  width: fit-content;
  transition: 0.4s;
  box-shadow: ${props =>
    props.isLoading ? "1px 21px 33px 2px rgba(245,176,133,0.48)" : ""};
  opacity: ${props => (props.isLoading ? "0.4" : "1")};
  pointer-events: ${props => (props.isLoading ? "none" : "")};
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const AlignItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default RegisterPage;
