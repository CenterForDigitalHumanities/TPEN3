window.onload = processRedirect()

/**
 *  Detect and get the value of returnTo from the origin address /callback/?returnTo=
 *  If there is no returnTo, default to the origin homepage.
 */
function processRedirect() {
  let link = new URL(window.location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('returnTo') ?? location.origin
  redirect = decodeURI(redirect)
  location.href = redirect
}