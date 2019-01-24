import { css } from 'styled-components'
import * as constants from '../constants'

// Breakpoint viewport sizes and media queries.
//
// Breakpoints are defined as a map of (name: minimum width), order from small to large:
//
//    (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px)
//
// The map defined in the `$grid-breakpoints` global variable is used as the `$breakpoints` argument by default.

// Name of the next breakpoint, or null for the last breakpoint.
//
//    >> breakpoint-next(sm)
//    md
//    >> breakpoint-next(sm, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))
//    md
//    >> breakpoint-next(sm, $breakpoint-names: (xs sm md lg xl))
//    md
// @function breakpoint-next($name, $breakpoints: $grid-breakpoints, $breakpoint-names: map-keys($breakpoints)) {
//     $n: index($breakpoint-names, $name);
// @return if($n < length($breakpoint-names), nth($breakpoint-names, $n + 1), null);
// }
export const breakpointNext = (
    $name,
    $breakpoints = constants.$GRID_BREAKPOINTS,
    $breakpointNames = Object.keys($breakpoints)
) => {
    const $n = $breakpointNames.indexOf($name)
    return $n < $breakpointNames.length ? $breakpointNames[$n + 1] : null
}

// Minimum breakpoint width. Null for the smallest (first) breakpoint.
//
//    >> breakpoint-min(sm, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))
//    576px
// @function breakpoint-min($name, $breakpoints: $grid-breakpoints) {
//     $min: map-get($breakpoints, $name);
// @return if($min != 0, $min, null);
// }
export const breakpointMin = ($name, $breakpoints = constants.$GRID_BREAKPOINTS) => {
    const $min = $breakpoints[$name]
    return $min != 0 ? $min : null
}

// Maximum breakpoint width. Null for the largest (last) breakpoint.
// The maximum value is calculated as the minimum of the next one less 0.02px
// to work around the limitations of `min-` and `max-` prefixes and viewports with fractional widths.
// See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
// Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
// See https://bugs.webkit.org/show_bug.cgi?id=178261
//
//    >> breakpoint-max(sm, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))
//    767.98px
// @function breakpoint-max($name, $breakpoints: $grid-breakpoints) {
//     $next: breakpoint-next($name, $breakpoints);
// @return if($next, breakpoint-min($next, $breakpoints) - .02px, null);
// }
export const breakpointMax = ($name, $breakpoints = constants.$GRID_BREAKPOINTS) => {
    const $next = breakpointNext($name, $breakpoints)
    return $next ? breakpointMin($next, $breakpoints) - 0.02 : null
}

// Media of at most the maximum breakpoint width. No query for the largest breakpoint.
// Makes the @content apply to the given breakpoint and narrower.
// @mixin media-breakpoint-down($name, $breakpoints: $grid-breakpoints) {
//     $max: breakpoint-max($name, $breakpoints);
// @if $max {
//     @media (max-width: $max) {
//         @content;
//         }
//     } @else {
//     @content;
//     }
// }
export const mediaBreakpointDown = (
    $name,
    $breakpoints = constants.$GRID_BREAKPOINTS,
    $content
) => {
    const $max = breakpointMax($name, $breakpoints)
    if ($max) {
        return css`
            @media (max-width: ${$max}px) {
                ${$content};
            }
        `
    } else {
        return css`
            ${$content}
        `
    }
}
// 자주쓰는 media 사이즈 커스텀 mixin
export const mediaBreakpointDownSM = $content =>
    mediaBreakpointDown('$GRID_BREAKPOINTS_SM', undefined, $content)