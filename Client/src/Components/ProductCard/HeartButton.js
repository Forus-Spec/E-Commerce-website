import React from "react";
import Tooltip from "@reach/tooltip";
import styled, { keyframes, css } from "styled-components";
import Icon from "../Icon";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { COLORS } from "../UIComponents/Constants";
import { addFavorite, removeFavorite } from "../../lib/userAPI";
import { AuthContext } from "../../Context/AuthContext";
import { favoritesToast } from "../UIComponents/Notification/notification";
import Button from "../UIComponents/Button";

//This is our awesome { addFavorite, removeFavorite }


const HeartButton = ({skeli = false,loading = false,productId = null} = {}) => {

  const isLoading = false;
  const listItem  = false;

  const auth = React.useContext(AuthContext);

  const userToken = auth && auth.authState.token;

  const favorites = useMutation(postId => addFavorite(postId, userToken), {
    onSuccess: (data, variables, context) => {
      toast(`Successfully added to your favorite`, favoritesToast("❤️"));
    },
    onError: (error, variables, context) => {
     toast(`Error Happened which is amazing `, favoritesToast("⚠️"));
    }
  });
  const remove = useMutation(postId => removeFavorite(postId, userToken), {
    onSuccess: (data, variables, context) => {
      toast("Successfully removed to your favorites", favoritesToast("💔"));
    },
    onError: (error, variables, context) => {
      console.log("this is our awesome error message", error.response.data.msg);
      toast("Something went wrong", favoritesToast("⚠️"));
    }
  });

  React.useEffect(() => {
    remove.reset();
    favorites.reset();
  }, [productId]);

  return (
    <>
      {listItem ? (
        <Tooltip
          label="Remove from your favorites"
          style={{
            position: "absolute",
            color: `${COLORS.transparentOrange}`,
            fontWeight: "bold",
            background: `${COLORS.gray}`,
            border: "none",
            borderRadius: "4px",
            padding: "0.5em 0.7em"
          }}
        >
          <Heart onClick={remove.mutate(productId)}>
            <Icon
              active={true}
              hover={true}
              name="heart"
              color={COLORS.transparentOrange}
              size={32}
            ></Icon>
          </Heart>
        </Tooltip>
      ) : (
        <Tooltip
          label="Add to your favorites"
          style={{
            position: "absolute",
            color: `${COLORS.transparentOrange}`,
            fontWeight: "bold",
            background: `${COLORS.gray}`,
            border: "none",
            borderRadius: "4px",
            padding: "0.5em 0.7em"
          }}
        >
          {/* */}
          {!isLoading ? (
            <Heart skeli={loading} onClick={() => favorites.mutate(productId)}>
              {(!loading && (
                <Icon
                  hover={true}
                  name="heart"
                  color={COLORS.transparentOrange}
                  size={32}
                ></Icon>
              )) ||
                undefined}
            </Heart>
          ) : (
            "Loading..."
          )}
        </Tooltip>
      )}
    </>
  );
};

const loader = keyframes`
   /* Hello my name is essayeh fares */
	from {
		background-position: 100% 0%;
	}
	to {
		background-position: -100% 0%;
	}
`;

const Heart = styled.div`
  background: ${props =>
    props.skeli ? "linear-gradient(90deg, #ededed, #ffffff, #ededed)" : ""};
  background-size: ${props => (props.skeli ? " 200% 100%" : "")};
  animation: ${props =>
    props.skeli &&
    css`
      ${loader} 1s infinite reverse
    `};
  height: ${props => (props.skeli ? "50px" : "")};
  width: ${props => (props.skeli ? "50px" : "fit-content")};
  border-radius: 50%;
  position: absolute;
  right: 2px;
  top: 16px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    outline: 1px solid ${COLORS.orange};
    transition: border-color 0.3s ease-in;
  }
`;

export default HeartButton;
