export const getpagecount=(list:any[],count:number)=>{
    return Math.floor((list.length-1)/count)+1
};