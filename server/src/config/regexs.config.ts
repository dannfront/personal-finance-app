
export const regexEmail = /^.+@.+\..+$/

export const regexPassword = /(?=.*[A-Z])(?=.*[\d])(?=.*[\W])/

export const regexValidateExtensionImage = /^image\/(png|jpg|jpeg|gif|bmp|webp)$/

export const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
export const rgbColorRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
export const hslColorRegex = /^hsl\(\d{1,3},\s*([0-9]{1,2}|100)%,\s*([0-9]{1,2}|100)%\)$/;