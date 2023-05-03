export const tmp = "";

export const getPageCount = (list: any[], count: number) => 
    Math.floor((list.length - 1) / count) + 1;