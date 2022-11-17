import "./App.css";
import React from "react";
import Header from "./Components/Header/Header";
import GlobalStyles from "./Components/GlobalStyles";
import LoginModal from "./Pages/Auth/LoginModal";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import { useToggle } from "./Hook/useToggle";
import useIdle from "./Hook/useIdle";
import Modal from "./Components/UIComponents/Modal/Modal";

import { AuthContext } from "./Context/AuthContext";

function App() {

  const auth = React.useContext(AuthContext);
  const isLoggedIn = Boolean(auth.authState.token);
  const [state, setState] = React.useState(false);
  const { bool, setFalse, setTrue } = useToggle();

  const isIdle = useIdle(20e3);

  React.useEffect(() => {
    if (isIdle && isLoggedIn) {
      console.log("did it pass");
      setState(true);
    }
  });

  const logout = () => {
    auth.logout();
    setState(false);
  };

  const stay = () => {
    setState(false);
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <div>
        <Header setOpen={setTrue} />
        <Footer />
        <LoginModal isOpen={bool} setClose={setFalse} />
        <Modal
          isOpen={state}
          setClose={setFalse}
          stay={stay}
          logout={logout}
          firstName={isLoggedIn ? auth.authState.userInfo.firstName : false}
        />
        <GlobalStyles />
      </div>
    </>
  );
}
export default App;
