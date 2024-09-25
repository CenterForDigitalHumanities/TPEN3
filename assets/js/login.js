/**
 * @module AuthButton Adds custom element for login/logout of Auth0, based on configuration below.
 * @author cubap
 * 
 * @description This module includes a custom `<button is="auth-button">` element for authentication within 
 * the Gallery of Glosses Project, specifically the data entry interfaces.
 * Notes: 
 * - Include this module and a button[is='auth-button'] element to use. 
 * - Add the `disabled` property on any page that should be available to the public, but knowing the user may be helpful.
 * - This can be made more generic by passing in the constants and parameterizing {app:'glossing'}.
 */

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

const logout = () => {
  webAuth.logout({ origin }) 
}

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
  * 
  /login/?redirectTo=https://transcribonanza.com/interface.html?customParam=hello#ididid
  ^supported at this time
  /login/#ididid?redirectTo=https://transcribonanza.com/interface.html?customParam=hello
  ^unsupported at this time
*/
function performLogin(){
  let redir = processRedirect()
  let refer = getReferringPage()
  let idTok = location.hash.includes("id_token=") ? location.hash.split("id_token=")[1].split("&")[0] : ""

  // A login occurred and we came back to this page with the idToken and state
  if(idTok){
    console.log("We logged in")
    console.log(`redir: ${redir}`)
    console.log(`refer: ${refer}`)

    // We will have a refer to use to redirect.
    let referLink = new URL(refer)
    const referQueryString = referLink.search
    const referURLParams = new URLSearchParams(referQueryString)

    // hmm the URL() does not consider the # to be a part of referLink.search but rather referLink.hash, which is wrong.
    // We can split around the '#', or just accept referLink.hash just happens to do what we want.
    const hackHash = referLink.hash

    // The refer link has a redirect link as a URL parameter itself
    let redirect = referURLParams.get('redirectTo') ?? origin
    let redirectLink = new URL(redirect)
    let redirectQueryString = redirectLink.search

    if(redirectQueryString) redirectQueryString+=`&idToken=${idTok}`
    else redirectQueryString=`?idToken=${idTok}`
    if(hackHash) redirectQueryString+=hackHash

    location.href = redirectLink.origin + redirectLink.pathname + redirectQueryString
    return
  }
  webAuth.checkSession({}, (err, result) => {
      if (err) {
          login() // Perform login if not authenticated.
          return
      }
      idTok = result.idToken ?? ""
      if (!idTok){
          console.error("There was missing token information from the login. Reset the cached User")
          // TODO redirect still with some kind of error?
          // No redirect but let them know an error happened.
          return
      }
      // Redirect to the referring page, or the default page.
      if(!refer) refer = redir
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
function processRedirect(url){
  let link = url ? new URL(url) : new URL(window.location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('redirectTo') ?? origin
  const hash = link.hash
  if(hash) redirect+=hash
  return redirect
}

window.onload = performLogin()