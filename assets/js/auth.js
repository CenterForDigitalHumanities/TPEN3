// Import Auth0 library
import 'https://cdn.auth0.com/js/auth0/9.19.0/auth0.min.js'

// Authentication configuration constants
const AUDIENCE = "https://cubap.auth0.com/api/v2/"
const ISSUER_BASE_URL = "cubap.auth0.com"
const CLIENT_ID = "bBugFMWHUo1OhnSZMpYUXxi3Y1UJI7Kl"
const DOMAIN = "cubap.auth0.com"
const origin = location.origin + location.pathname
const logoutCallback = location.origin +"/callback/"

const webAuth = new auth0.WebAuth({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  audience: AUDIENCE,
  scope: "read:roles update:current_user_metadata name nickname picture email profile openid offline_access",
  redirectUri: origin,
  responseType: "id_token token",
  state: urlToBase64(location.href)
})

const login = (custom) =>
  webAuth.authorize(Object.assign({ authParamsMap: { app: "tpen" } }, custom))

// Helper function to get referring page from URL state
const getReferringPage = () => {
  try {
    return b64toUrl(location.hash.split("state=")[1].split("&")[0])
  } 
  catch (err) {
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
 *  Detect and get the value of returnTo from the origin address /login/?returnTo=
 *  If there is no returnTo, default to the origin address /login/ for the redirect.
 */
function processRedirect() {
  let link = new URL(window.location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('returnTo') ?? origin
  redirect = decodeURI(redirect)
  return redirect
}

/**
  * A user from a TPEN Interface at a third party source is trying to login.
  * They have initiated a https://three.t-pen.org/login from their source.
  * https://three.t-pen.org/ needs to perform a checkSession() for the user and follow the flow.
  * Once a token is known, three.t-pen.org will recieve that token and needs to pass it back into the interface it came from.
  * /login?returnTo= gives the user the option to state where they would like to return.
  * Note this expects URL formatted like...
  
    /login/?returnTo=https%3A%2F%2Ftranscribonanza.com%2Finterface.html%3FcustomParam%3Dhello%23hashValue

  *
*/
export function performLoginAndRedirect() {
  // Know the value for ?returnTo.  You have this whether the login returned here or is initiated here, if provided.
  let redir = processRedirect()
  // Know the value from state= after the universal login completes and redirects.  It will contain ?returnTo (if provided) which is where you need to go.
  let refer = getReferringPage()
  // Know the ID Token returned by a successful login in the universal login widget.  It is in the address bar as ?id_token=
  let idTok = location.hash.includes("id_token=") ? location.hash.split("id_token=")[1].split("&")[0] : ""
  // Know the Access Token returned by a successful login in the universal login widget.  It is in the address bar as ?access_token=
  let accessTok = location.hash.includes("access_token=") ? location.hash.split("access_token=")[1].split("&")[0] : ""

  if (idTok) {
    /**
     * A login occurred and we came back to this page with the idToken, accessToken, and state.
     * getReferringPage() processed the state into the URL used during login.
     * ex. after it is processed - https://three.t-pen.org/login/?returnTo=https://transcribonanza.com/interface.html
     * We will have refer, which is that decoded ?state=.  
     */
    let referLink = new URL(refer)
    const referQueryString = referLink.search
    const referURLParams = new URLSearchParams(referQueryString)
    // If there was no ?returnTo, they don't want to redirect.
    const wantsToRedirect = referURLParams.has('returnTo')

    // The decoded ?state= contains the ?returnTo= that we need the value of, which which may also have URL parameters and/or a hash itself
    let redirect = referURLParams.get('returnTo') ?? origin
    redirect = decodeURI(redirect)
    let redirectLink = new URL(redirect)
    let redirectQueryString = redirectLink.search

    // add idToken= into the redirect link next to any URL parameters it may have already contained
    if (redirectQueryString) redirectQueryString += `&idToken=${idTok}`
    else redirectQueryString = `?idToken=${idTok}`

    // If the redirect link contains a hash, we would like that hash to appear at the end of the link after the query string(s)
    if (redirectLink.hash) redirectQueryString += redirectLink.hash

    if(wantsToRedirect)
      location.href = redirectLink.origin + redirectLink.pathname + redirectQueryString
    else{
      // We will still let you see the Token you ended up by adding it to your address bar.
      window.history.replaceState({}, "", location.origin + location.pathname + redirectQueryString)
      alert("Please provide a ?returnTo= parameter when using this login.")
      setTimeout(() => {
        location.href = location.origin
      }, "5000")
    } 
    return
  }

  // Determine whether or not we need to use universal login.
  webAuth.checkSession({}, (err, result) => {
    if (err) {
      login() // Perform login if not authenticated.
      return
    }
    idTok = result.idToken ?? ""
    accessTok = result.accessToken ?? ""
    if (!idTok) {
      console.error("There was missing token information from the login. Reset the cached User")
      alert("The session did not respond with the token information we need.  Try logging in again.")
      return
    }
    /**
     * We have an active session and were given an ID token.  We do not need to use universal login.
     * Redirect using the refer info.  If there is no referring page b/c we didn't need to log in, use the redirect from processRedirect()
     * If we end up referring to the origin because no ?returnTo was involved, then we don't want to redirect.
     */
    if (!refer) refer = redir
    refer = decodeURI(refer)
    const wantsToRedirect = (refer !== origin)
    let redirectLink = new URL(refer)
    let redirectQueryString = redirectLink.search

    if (redirectQueryString) redirectQueryString += `&idToken=${idTok}`
    else redirectQueryString = `?idToken=${idTok}`
    if (redirectLink.hash) redirectQueryString += redirectLink.hash

    if (wantsToRedirect)
      location.href = redirectLink.origin + redirectLink.pathname + redirectQueryString
    else{
      // We will still let you see the Token you ended up by adding it to your address bar.
      window.history.replaceState({}, "", location.origin + location.pathname + redirectQueryString)
      alert("Please provide a ?returnTo= parameter when using this login.")
      setTimeout(() => {
        location.href = location.origin
      }, "5000")  
    }
      
    return
  })
}

/**
  * A user from a TPEN Interface at a third party source is trying to logout.
  * They have initiated a https://three.t-pen.org/logout from their source.
  * Once the logout is complete they will redirect to https://three.t-pen.org/callback
  * /logout?returnTo= gives the user the option to state where they would like to return.
  * Note this must redirect to https://three.t-pen.org/callback but can pass forward the ?returnTo already provided.
  * Note this expects URL formatted like...

    /logout/?returnTo=https%3A%2F%2Ftranscribonanza.com%2Finterface.html%3FcustomParam%3Dhello%23hashValue

  *
*/
export function performLogout() {
  const redir = processRedirect()
  const callback = logoutCallback + `?returnTo=${encodeURIComponent(redir)}`
  // Ex. https://three.t-pen.org/callback/?returnTo=https%3A%2F%2Ftranscribonanza.com%2Finterface.html%3FcustomParam%3Dhello%23hashValue
  webAuth.logout({
    returnTo: callback
  })
}
