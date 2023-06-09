const HOST='http://localhost:4040/'
export const authorizationHeader=(accessToken:string)=>{
    return {headers:{Authorization:`Bearer ${accessToken}`}}
}
export const multipartHeader = () => {
    return { headers: { 'Content-Type': 'multipart/form-data' } };
}

//? Auth
export const SIGN_IN_URL = `${HOST}auth/sign-in`;
export const SIGN_UP_URL = `${HOST}auth/sign-up`

//? User
export const GET_USER_URL = `${HOST}api/user/`;
export const VALIDATE_USER_ID_URL = `${HOST}api/user/check/userid`
export const VALIDATE_NICKNAME_URL = `${HOST}api/user/check/nickname`
export const VALIDATE_TELNUMBER_URL = `${HOST}api/user/check/telnumber`
export const PATCH_USER_PROFILE = `${HOST}api/user/profile`

//? Board
export const GET_ALL_REVIEWBOARD_LIST_URL=`${HOST}api/board/all-review-board`
export const POST_REVIEW_BOARD_URL = `${HOST}api/board`;
export const PATCH_REVIEW_BOARD_URL = `${HOST}api/board`;
export const GET_REVIEW_BOARD_URL = (boardNumber : string ) => `${HOST}api/board/${boardNumber}`
export const DELETE_REVIEW_BOARD_URL = (boardNumber : string) => `${HOST}api/board/${boardNumber}`;
export const GET_FESTIVAL_REVIEWBOARD_LIST_URL=(festivalNumber: number)=>`${HOST}api/festival/onlyfestival/${festivalNumber}`;
export const GET_MY_REVIEW_BOARD_LIST_URL = `${HOST}api/board/my-reviewboard-list`
export const POST_REVIEW_BOARD_COMMENT_URL = `${HOST}api/board/post-comment`
export const PATCH_REVIEW_BOARD_COMMENT_URL = `${HOST}api/board/patch-comment`
export const DELETE_REVIEW_BOARD_COMMENT_URL = (commentNumber : number) => `${HOST}api/board/delete-comment/${commentNumber}`
export const POST_REVIEW_BOARD_RECOMMEND_URL = `${HOST}api/board/recommend`
export const GET_SEARCH_REVIEWBOARD_LIST=(searchWord:string)=>`${HOST}api/board/search-reviewboard/${searchWord}`
export const GET_MYREVIEWBOARD_LIST_URL=`${HOST}api/board/my-reviewboard-list`;

//? FreeBoard
export const GET_FREE_BOARD_LIST = `${HOST}api/free-board`
export const GET_FREE_BOARD_URL = (boardNumber: string) => `${HOST}api/free-board/${boardNumber}`
export const POST_FREE_BOARD_URL = `${HOST}api/free-board`;
export const PATCH_FREE_BOARD_URL = `${HOST}api/free-board`;
export const PATCH_FREE_BOARD_COMMENT_URL = `${HOST}api/free-board/comment`;
export const POST_FREE_BOARD_COMMENT_URL = `${HOST}api/free-board/comment`;
export const DELETE_FREE_BOARD = (boardNumber: string) => `${HOST}api/free-board/${boardNumber}`
export const DELETE_FREE_BOARD_COMMENT = (commentNumber : number) => `${HOST}api/free-board/comment/${commentNumber}`
export const GET_SEARCH_FREE_BOARD_LIST_URL = (searchWord : string) => `${HOST}api/free-board/search-free-board/${searchWord}`;
export const FREE_BOARD_RECOMMEND_URL =  `${HOST}api/free-board/recommend`;

//? File
export const FILE_UPLOAD_URL=`${HOST}file/upload`

//? Festival
export const GET_FESTIVAL_TYPE_CHECKBOX_LIST_URL = `${HOST}api/festival/type-list`
export const GET_INTERESTED_FESTIVAL_LIST_URL =`${HOST}api/festival/festival/interested-list`
export const GET_ALL_FESTIVAL_LIST = `${HOST}api/festival`
export const GET_ONELINE_REVIEW_URL=(festivalNumber:number)=>`${HOST}api/festival/oneLineReview/${festivalNumber}`
export const GET_ONE_FESTIVAL_URL=(festivalNumber:number)=>`${HOST}api/festival/festival/${festivalNumber}`
export const GET_TOP1_ONELINEREVIEW_URL=`${HOST}api/festival/top1-onelinereview`
export const GET_FESTIVALNAME_LIST=`${HOST}api/festival/festivalname-list`
export const GET_FESTIVALNAME_SEARCH_LIST=(searchName:string)=>`${HOST}api/festival/namesearch/${searchName}`
export const GET_ONELINE_REVIEW_FESTIVALNAME=(festivalNumber:number)=>`${HOST}api/festival/festivalname/${festivalNumber}`
export const POST_ONE_LINE_COMMENT_REVIEW = `${HOST}api/festival/one-line-review`
