export const imgUrlRegEx = (url: string) => url.match(/\.(jpeg|jpg|gif|png)$/);
export const validateTextRegEx = (url: string) => /(http(s?)):\/\//i.test(url);
