window.onload = redirectUser()

/**
 *  Detect and get the value of returnTo from the origin address /callback/?returnTo=
 *  If there is no returnTo, default to the origin homepage.
 *  Note that performLogout() in auth.js will always add a returnTo, and it may just be the origin homepage.
 */
function redirectUser() {
  let link = new URL(window.location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('returnTo') ?? location.origin
  redirect = decodeURI(redirect)
  location.href = redirect
}