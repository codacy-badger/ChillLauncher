import { createGlobalStyle } from "styled-components"

const IndexStyle = createGlobalStyle`
  ${props => console.log(props)}
`
export default IndexStyle;
