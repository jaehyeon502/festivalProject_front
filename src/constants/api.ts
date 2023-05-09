const HOST='http://localhost:4040/'
export const authorizationHeader=(accessToken:string)=>{
    return {headers:{Authorization:`Bearer ${accessToken}`}}
}

export const SIGN_IN_URL = `${HOST}auth/sign-in`;
export const GET_INTERESTED_FESTIVAL_LIST_URL =`${HOST}api/board/festival/interested-list`
