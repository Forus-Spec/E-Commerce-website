import {
  INTERNAL_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED
} from "../Utils/statusCodes.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  //  This is our great error functionality
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || INTERNAL_ERROR,
    msg: err.message || "Something went totally wrong ! ⚠️ , try again later !"
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = INTERNAL_ERROR;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if (err.type === "entity.parse.failed") {
    console.log(err);
    defaultError.statusCode = BAD_REQUEST;
    defaultError.msg =
      "it seems your input did not match what's intended to match";
  }
  if (err.name === "CastError") {
    defaultError.msg = `No item found with id : ${err.value}`;
    defaultError.statusCode = NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  if (err.name === "TokenExpiredError") {
    defaultError.statusCode = UNAUTHORIZED;
    defaultError.msg = "your token has been expired please re-authenticate";
  }
  res.status(defaultError.statusCode).json({
    msg: defaultError.msg
  });
  console.log(err);
};

export default errorHandlerMiddleware;
