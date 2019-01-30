import theme from 'styled-theming';

//공통
export const $themeCommon = {
    //state
    plus : '#2bb015',
    minus : '#bb200f',
    record :'#2887ff',
};

export const $themeColor = theme('theme', {
    light: "#31313c",
    dark: "#ffffff"
});

export const $themeColor2 = theme('theme', {
    light: "#ffffff",
    dark: "#31313c"
});

export const $themeBgDoc = theme('theme', {
    light: "#f0f0f0",
    dark: "#1c1c1f"
});
export const $themeFont = theme('theme', {
    light: "#43e4e6",
    dark: "#dee623"
});
export const $themeBg = theme('theme', {
    light: "#1318f0",
    dark: "#e66e01"
});