const HOST='http://localhost:4040/'
export const authorizationHeader=(accessToken:string)=>{
    return {headers:{Authorization:`Bearer ${accessToken}`}}
}

export const SIGN_IN_URL = `${HOST}auth/sign-in`;
export const SIGN_UP_URL = `${HOST}auth/sign-up`
export const GET_INTERESTED_FESTIVAL_LIST_URL = `${HOST}api/board/festival/interested-list`
export const VALIDATE_USER_ID_URL = `${HOST}api/user/check/userid`
export const VALIDATE_NICKNAME_URL = `${HOST}api/user/check/nickname`
export const VALIDATE_TELNUMBER_URL = `${HOST}api/user/check/telnumber`