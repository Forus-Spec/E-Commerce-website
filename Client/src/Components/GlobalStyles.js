import { createGlobalStyle } from "styled-components";

import { COLORS, FONTSIZE, FONT } from "./UIComponents/Constants";

const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hahmlet:wght@900&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	   display: block;
}
body {
	line-height: 1;
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;

  -webkit-font-smoothing: antialiased;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

*,*::before,*:after{
   box-sizing:border-box;
   line-height:1.45;
   -webkit-font-smoothing:antialiased;
   -moz-osx-font-smoothing:auto;
}
*{
   margin:0;
}
html, body, #__next {
  background-color: #fffcfc;
  opacity: 1;
  background-image: radial-gradient(#ff8261 2px, transparent 2px), radial-gradient(#ff8261 2px, #fffcfc 2px);
  background-size: 80px 80px;
  background-position: 0 0,40px 40px;
  height: 100%;
}


img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  font-family: 'Poppins', sans-serif;
}

input, button, textarea, select {
  font: inherit;
}

#root {
   /*
      Create a stacking context ,
      without a z-index This ensures
      that all portal content
      (modals and tooltips) will
      float above the Next app
   */
   isolation:isolate
}

body,input,button,select,option{
   font-family:'Open Sans', sans-serif;;
   font-weight:400;
}

h1,h2,h3,h4,h5,h6,strong{
   font-weight  :bold;
}

h1,h2,h3,h4,h5,h6,p{
   text-rendering:optimizeLegibility;
}
p{
   font-size:1.125rem;
}
::selection{
   background-color:${COLORS.orange};
   color:white;
}

@media(orientation:landscape){
   ::-webkit-scrollbar{
      width:14px;
      overflow:hidden ;
      background:${COLORS.black} ;

   }
   ::-webkit-scrollbar-track{
      background-color:transparent;
   }
   ::-webkit-scrollbar-track{
      background-color:transparent;
   }
   ::-webkit-scrollbar-thumb{
      border-radius:6px;
      background-image:${COLORS.primary};
      border:1px solid black;
   }
}
`;

export default GlobalStyles;
