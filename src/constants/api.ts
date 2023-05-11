const HOST='http://localhost:4040/'
export const authorizationHeader=(accessToken:string)=>{
    return {headers:{Authorization:`Bearer ${accessToken}`}}
}

export const SIGN_IN_URL = `${HOST}auth/sign-in`;
export const GET_INTERESTED_FESTIVAL_LIST_URL =`${HOST}api/board/festival/interested-list`
export const GET_FESTIVAL_REVIEWBOARD_LIST_URL=(festivalNumber:number)=>`${HOST}api/board/onlyfestival/${festivalNumber}`;
export const GET_MYREVIEWBOARD_LIST_URL=`${HOST}api/board/my-reviewboard-list`;
