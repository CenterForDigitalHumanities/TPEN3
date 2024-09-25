// Import Auth0 library
import 'https://cdn.auth0.com/js/auth0/9.19.0/auth0.min.js'

// Authentication configuration constants
const AUDIENCE = "https://cubap.auth0.com/api/v2/"
const ISSUER_BASE_URL = "cubap.auth0.com"
const CLIENT_ID = "bBugFMWHUo1OhnSZMpYUXxi3Y1UJI7Kl"
const DOMAIN = "cubap.auth0.com"
const origin = "http://localhost:3011/login/"

const webAuth = new auth0.WebAuth({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  audience: AUDIENCE,
  scope:
    "read:roles update:current_user_metadata name nickname picture email profile openid offline_access", 
  redirectUri: origin,   
  responseType: "id_token",
  state: urlToBase64(location.href),
})

// const logout = () => {
//   webAuth.logout({ origin }) 
// }

const login = (custom) =>
  webAuth.authorize(Object.assign({ authParamsMap: { app: "tpen" } }, custom))

// Helper function to get referring page from URL state
const getReferringPage = () => {
    try {
        return b64toUrl(location.hash.split("state=")[1].split("&")[0])
    } catch (err) {
        return ""
    }
}

/**
 * Follows the 'base64url' rules to decode a string.
 * @param {String} base64str from `state` parameter in the hash from Auth0
 * @returns referring URL
 */
function b64toUrl(base64str) {
    return window.atob(base64str.replace(/-/g, "+").replace(/_/g, "/"))
}
/**
 * Follows the 'base64url' rules to encode a string.
 * @param {String} url from `window.location.href`
 * @returns encoded string to pass as `state` to Auth0
 */
function urlToBase64(url) {
    return window.btoa(url).replace(/\//g, "_").replace(/\+/g, "-").replace(/=+$/, "")
}

/**
  * A user from a TPEN Interface at a third party source is trying to login.
  * They have initiated a https://three.t-pen.org/login from their source.
  * https://three.t-pen.org/ needs to perform a checkSession() for the user and follow the flow.
  * Once a token is known, three.t-pen.org will recieve that token and needs to pass it back into the interface it came from.
  * /login?redirectTo= gives the user the option to state where they would like to return.
  * Note this expects URL formatted like...
  
    /login/?redirectTo=https%3A%2F%2Ftranscribonanza.com%2Finterface.html%3FcustomParam%3Dhello%23hashValue

  *
*/
function performLogin(){
  // Know the value for ?redirectTo.  You have this whether the login returned here or is initiated here
  let redir = processRedirect()
  // Know the value from state= after the universal login completes and redirects.  It will contain ?redirectTo which is where you need to go.
  let refer = getReferringPage()
  // Know the ID token returned by a successful login in the universal login widget.  It is in the address bar as ?id_token=
  let idTok = location.hash.includes("id_token=") ? location.hash.split("id_token=")[1].split("&")[0] : ""

  // A login occurred and we came back to this page with the idToken and state
  if(idTok){
    // We will have refer, which is the decoded ?state=.  
    let referLink = new URL(refer)
    const referQueryString = referLink.search
    const referURLParams = new URLSearchParams(referQueryString)

    // The decoded ?state= contains the ?redirectTo= that we need the value of, which which may also have URL parameters and/or a hash itself
    let redirect = referURLParams.get('redirectTo') ?? origin
    redirect = decodeURI(redirect)
    let redirectLink = new URL(redirect)
    let redirectQueryString = redirectLink.search

    // add idToken= into the redirect link next to any URL parameters it may have already contained
    if(redirectQueryString) redirectQueryString+=`&idToken=${idTok}`
    else redirectQueryString=`?idToken=${idTok}`

    // If the redirect link contains a hash, we would like that hash to appear at the end of the link after the query string(s)
    if(redirectLink.hash) redirectQueryString+=redirectLink.hash

    location.href = redirectLink.origin + redirectLink.pathname + redirectQueryString
    return
  }

  //Determine whether or not we need to login
  webAuth.checkSession({}, (err, result) => {
      if (err) {
          login() // Perform login if not authenticated.
          return
      }
      idTok = result.idToken ?? ""
      if (!idTok){
          console.error("There was missing token information from the login. Reset the cached User")
          // TODO don't need to redirect, but we should let the user know an error occurred.
          alert("The session did not respond with the token information we need.  Try logging in again.")
          return
      }

      // We have an active session and were given an ID token.  We do not need to log in.
      // Redirect to the referring page.  If there is no referring page b/c we didn't need to log in, use the redirect from processRedirect()
      if(!refer) refer = redir
      refer = decodeURI(refer)
      let redirectLink = new URL(refer)
      let redirectQueryString = redirectLink.search

      if(redirectQueryString) redirectQueryString+=`&idToken=${idTok}`
      else redirectQueryString=`?idToken=${idTok}`
      if(redirectLink.hash) redirectQueryString+=redirectLink.hash

      location.href = redirectLink.origin + redirectLink.pathname + redirectQueryString
  })
}

/**
*  Detect and get the value of redirectTo from the origin address /login/?redirectTo=
*  If there is no redirectTo, default to the origin address /login/ for the redirect.
*/
function processRedirect(){
  let link = new URL(window.location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('redirectTo') ?? origin
  redirect = decodeURI(redirect)
  return redirect
}

window.onload = performLogin()