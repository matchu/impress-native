export const CONTAINER_PADDING = 16;
export const THUMBNAIL_SIZE = 48;
export const THUMBNAIL_RIGHT_MARGIN = 16;
export const TEXT_STARTS_AT =
    CONTAINER_PADDING + THUMBNAIL_SIZE + THUMBNAIL_RIGHT_MARGIN;

// https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
