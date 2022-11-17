import { COLORS } from "./Constants";

 const ReactSelectStyle  = {
  control: (base, state) => ({
    ...base,
    border: '2px solid #B4B4B4',
    outline: `${state.isSuccess ? "3px solid green" : `3px solid ${COLORS.gray}`}`,
    outlineOffset: '3px',
    width: "1210px",
    height: "55px",
  })
}
export default ReactSelectStyle;
