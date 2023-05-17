const HOST='http://localhost:4040/'
export const authorizationHeader=(accessToken:string)=>{
    return {headers:{Authorization:`Bearer ${accessToken}`}}
}
export const multipartHeader = () => {
    return { headers: { 'Content-Type': 'multipart/form-data' } };
}

export const SIGN_IN_URL = `${HOST}auth/sign-in`;
export const SIGN_UP_URL = `${HOST}auth/sign-up`
export const GET_ALL_REVIEWBOARD_LIST_URL=`${HOST}api/board/all-review-board`
export const GET_USER_URL = `${HOST}api/user/`;

export const GET_INTERESTED_FESTIVAL_LIST_URL =`${HOST}api/festival/festival/interested-list`
export const GET_FESTIVAL_REVIEWBOARD_LIST_URL=(festivalNumber:number)=>`${HOST}api/festival/onlyfestival/${festivalNumber}`;
export const GET_FESTIVAL_TYPE_CHECKBOX_LIST_URL = `${HOST}api/festival/type-list`
export const GET_MYREVIEWBOARD_LIST_URL=`${HOST}api/board/my-reviewboard-list`;
export const VALIDATE_USER_ID_URL = `${HOST}api/user/check/userid`
export const VALIDATE_NICKNAME_URL = `${HOST}api/user/check/nickname`
export const VALIDATE_TELNUMBER_URL = `${HOST}api/user/check/telnumber`
export const FILE_UPLOAD_URL=`${HOST}file/upload`
export const GET_ALL_FESTIVAL_LIST = `${HOST}api/festival`

export const GET_ONELINE_REVIEW_URL=(festivalNumber:number)=>`${HOST}api/festival/oneLineReview/${festivalNumber}`
export const GET_ONE_FESTIVAL_URL=(festivalNumber:number)=>`${HOST}api/festival/festival/${festivalNumber}`
export const GET_TOP1_ONELINEREVIEW_URL=`${HOST}api/festival/top1-onelinereview`

export const GET_SEARCH_REVIEWBOARD_LIST=(searchWord:string)=>`${HOST}api/board/search-reviewboard/${searchWord}`
