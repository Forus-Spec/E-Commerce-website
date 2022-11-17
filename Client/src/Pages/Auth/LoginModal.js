import "@reach/dialog/styles.css";
import * as React from "react";
import { Dialog } from "@reach/dialog";
import styled from "styled-components";
import Label from "../../Components/UIComponents/Label";
import InputField from "../../Components/UIComponents/InputField";
import Button from "../../Components/UIComponents/Button";
import Icon from "../../Components/Icon";
import useAsync from "../../Hook/useAsync";
import toast, { Toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import { login } from "../../lib/authAPI";
import {
  FONTSIZE,
  CORNERS,
  COLORS
} from "../../Components/UIComponents/Constants";
import { successConfig } from "../../Components/UIComponents/Notification/notification";
import LoginAnimation from "../../Components/Animations/LoginAnimation.json";
import { Player } from "@lottiefiles/react-lottie-player";

const LoginForm = ({
  onSubmit,
  buttonText,
  isLoading = null,
  isSuccess = null,
  isError = null,
  error = null
}) => {
  const playerRef = React.useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    onSubmit({
      email: email.value,
      password: password.value
    });
  }

  React.useLayoutEffect(() => {
    if (isLoading) {
      playerRef.current.play();
    }
  }, [isLoading]);

  return (
    <div>
      <MessageWrapper>
        <h1
          style={{
            borderBottom: `8px solid ${COLORS.gray}`,
            padding: "20px",
            width: "fit-content",
            letterSpacing: "1.7px",
            marginBottom: "5px",
            borderRadius: "8px",
            padding: "3px 8px",
            backgroundImage: `${COLORS.primary}`,
            color: `${COLORS.white}`,
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "flex-start",
            fontSize: `${FONTSIZE.large}rem`
          }}
        >
          Please Log in
          <Player
            src={LoginAnimation}
            speed={1}
            ref={playerRef}
            style={{ height: "88px", width: "88px" }}
          />
        </h1>
      </MessageWrapper>
      <FormGroup onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <InputField
            id="email"
            isSuccess={isSuccess}
            isError={isError}
            placeHolder="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <InputField
            id="password"
            type="password"
            isSuccess={isSuccess}
            isError={isError}
            placeHolder="password"
          />
        </div>
        <a
          style={{
            color: "blue",
            textDecoration: "underline",
            float: "right",
            margin: "9px"
          }}
        >
          Forgot Password
        </a>
        <div style={{ textAlign: "center", position: "relative" }}>
          <Button
            type="submit"
            isLoading={isLoading}
            isSuccess={isSuccess}
            size="long"
          >
            {buttonText}
          </Button>
          {isError && (
            <Error>
              {(error && error.msg) ||
                "Something went wrong with server , try again later"}
              <Icon name="xMark" size={22} style={{ marginTop: "10px" }} />
            </Error>
          )}
        </div>
      </FormGroup>
    </div>
  );
};

const LoginModal = ({ isOpen, setClose }) => {
  const authContext = React.useContext(AuthContext);

  const {
    isError,
    isSuccess,
    isLoading,
    error,
    setData,
    setLoading,
    setReset,
    setError
  } = useAsync();

  const submitCredentials = async credentials => {
    try {
      setLoading();
      const { data } = await login(credentials);
      setData(data);
      authContext.setAuthState(data);
      toast.success(`${data.message}`, successConfig());
      setClose();
    } catch ({ response }) {
      setError(response.data);
    }
  };

  return (
    <div>
      {!isSuccess ? (
        <StyledDialog
          aria-label="Login form"
          isOpen={isOpen}
          onDismiss={setClose}
        >
          <div style={{ float: "right " }}>
            <Icon
              size={32}
              name="xMark"
              style={{
                cursor: "pointer",
                border: "1px solid orange",
                borderRadius: "6px solid red"
              }}
              onClick={setClose}
            />
          </div>
          <LoginForm
            onSubmit={submitCredentials}
            buttonText="Login"
            setClose={setClose}
            isLoading={isLoading}
            isError={isError}
            error={error}
            setReset={setReset}
            isSuccess={isSuccess}
          />
        </StyledDialog>
      ) : (
        setReset()
      )}
    </div>
  );
};

const Error = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin-top: 12px;
  color: ${COLORS.danger};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDialogSuccess = styled(Dialog)`
  width: fit-content;
  border: 1px solid black;
  padding: 8px;
  border-radius: 8px;
  background-color: ${COLORS.black};
`;
const MessageWrapper = styled.div`
  padding: 8px 8px;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  color: ${COLORS.black};
  width: fit-content;
  border-radius: ${CORNERS.normal};
`;
const StyledDialog = styled(Dialog)`
  position: relative;
  border: 1px solid black;
  padding: 42px;
  border-radius: 8px;
  width: max-content;
`;
const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;
export default LoginModal;
{
  /* <pre style={{
              color: "white",
              opacity: 0.6,
              display: "block",
              width: "500px",
              height: "250px",
              padding: "1em",
              overflowX: "auto",
            }}>
              Development only 🔘:
              {JSON.stringify(data, null, 2)}
            </pre> */
}
