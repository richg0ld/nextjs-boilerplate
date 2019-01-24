import { createGlobalStyle, css } from 'styled-components';
import {$BASE_COLOR, $BASE_FONT_SIZE, $BASE_LETTER_SPACING, $BASE_LINE_HEIGHT, $FONT_MALGUN, $FONT_OPEN_SANS} from "../constants";
import { $themeBgDoc } from './theme'

const GlobalStyle = createGlobalStyle`
${css`
// font
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,700);
//맑은고딕 초기화
@font-face {
    font-family: "맑은 고딕";
	src: local("AppleSDGothic"),
	local("Apple SD Gothic Neo"),
	local("AppleGothic"),
    local("맑은 고딕");
}
@font-face {
    font-family: "Malgun Gothic";
	src: local("AppleSDGothic"),
	local("Apple SD Gothic Neo"),
	local("AppleGothic"),
    local("Malgun Gothic");
}
@font-face {
    font-family: "Malgun Gothic";
	src: local("AppleSDGothic"),
	local("Apple SD Gothic Neo"),
	local("AppleGothic"),
    local("Malgun Gothic");
}
@font-face {
    font-family: "돋움";
	src: local("AppleSDGothic"),
	local("Apple SD Gothic Neo"),
	local("AppleGothic"),
    local("돋움");
}
@font-face {
    font-family: "Dotum";
	src: local("AppleSDGothic"),
	local("Apple SD Gothic Neo"),
	local("AppleGothic"),
    local("Dotum");
}
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, main, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {margin:0; padding:0; border:0; word-break: keep-all;}

//
//
//
//
//

ol,
ul,
dl{ list-style: none;}
hr{
	width:100%;
	height:1px;
	margin:0;
	padding:0;
	border:none;
	background-color: #000000;
}
em{
	font-style: normal;
}
mark{
	background-color: transparent;
	font-style: normal;
}
button{
	border:none;
	margin:0;
	padding:0;
	border-radius: 0;
	background-color: transparent;
	cursor: pointer;
	&:hover{ cursor:pointer;}
}
object{
	width:100%;
	vertical-align:top;
}

[lang|=ko]{ font-family: ${$FONT_MALGUN}; }
[lang|=en]{ font-family: ${$FONT_OPEN_SANS}; }
html{
    font-size: ${$BASE_FONT_SIZE}px;
    line-height: ${$BASE_LINE_HEIGHT};
    letter-spacing:${$BASE_LETTER_SPACING}px;
    -webkit-font-smoothing: antialiased;
}
body{
    background-color:${$themeBgDoc};
    color:${$BASE_COLOR};
    font-weight:400;
}

:lang(ko){ font-family: ${$FONT_MALGUN}; }
:lang(en){ font-family: ${$FONT_OPEN_SANS}; }

//
//
//
//
//
//
a{
	color:inherit;
	text-decoration:none;
	&:hover{ text-decoration: none;}
}
//
//
//
//
//

img{
	max-width:100%;
	border: none;
	vertical-align: top;
}
//
//
//
//
//

table{
	border-spacing: 0;
	border-collapse: collapse;
}
caption{font:0/0 a;}
th,
td{}
th{
	font-weight:400;
	text-align:left;
}
td{}

a:focus, 
input:focus, 
select:focus, 
textarea:focus { 
outline: 1px solid -webkit-focus-ring-color; 
outline-offset: -1px; 
}

//
//
//
//
//

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {height:auto;-webkit-appearance:none; margin:0;}
input[type='search'] {-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
input[type='search']::-webkit-search-cancel-button, input[type='search']::-webkit-search-decoration {-webkit-appearance:none;}
input[type="text"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="date"],
input[type="number"],
input[type="email"]{box-sizing:border-box;width:100%;margin:0;padding:0; border:none; }



/*
글로벌 css styled components로 대체 못하는 css들 여기다 작업
*/
.popular-steamers .popular-steamer {
    padding: 0;
    transform: scale(0.7);
    transition: all .3s ease;
    margin: 0 -35px;
}
.popular-steamers .popular-steamer .popular-steamer-media {
    box-shadow: none;
}
.popular-steamers .popular-steamer .popular-steamer-header {
    visibility: hidden;
}
.popular-steamers .popular-steamer .popular-steamer-media-info-play, 
.popular-steamers .popular-steamer .popular-steamer-media-info-data-list, 
.popular-steamers .popular-steamer .popular-steamer-media-info-view {
    display: none;
}
.popular-steamers .slick-center .popular-steamer .popular-steamer-header {
    visibility: visible;
}
.popular-steamers .slick-center .popular-steamer .popular-steamer-media-info-play, 
.popular-steamers .slick-center .popular-steamer .popular-steamer-media-info-data-list,
.popular-steamers .slick-center .popular-steamer .popular-steamer-media-info-view {
    display: block;
}
.popular-steamers .slick-center .popular-steamer .popular-steamer-media-info {
    left: -1px;
    width: 100.2%;
}
.popular-steamers .slick-center .popular-steamer {
    opacity: 1;
    transform: scale(1);
}
.popular-steamers .slick-center .popular-steamer .popular-steamer-media {
    box-shadow: 0 60px 60px 0 rgba(32, 24, 54, 0.72);
}
.common-tooltip strong {
    white-space: pre-wrap;
    color: #ffffff;
    font-family: OpenSans;
    font-size: 11px;
}
.common-tooltip div {
    white-space: pre-wrap;
    color: #9d9d9d;
    font-family: OpenSans;
    font-size: 11px;
}

/* Make clicks pass-through */
#nprogress {
    pointer-events: none;
}

#nprogress .bar {
    background: hotpink;

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px hotpink, 0 0 5px hotpink;
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
}

#nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: hotpink;
    border-left-color: hotpink;
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
    overflow: hidden;
    position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
    position: absolute;
}

@-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

//브라우저 최소사이즈 때 생기는 여백잡는용
html {
  min-width: 1280px;
  @media (max-width: 768px) {
      min-width: auto;
  }
}

`}
`;

export default GlobalStyle;