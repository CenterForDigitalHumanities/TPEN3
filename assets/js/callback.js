window.onload = processRedirect()

/**
 *  Detect and get the value of returnTo from the origin address /login/?returnTo=
 *  If there is no returnTo, default to the origin address /login/ for the redirect.
 */
function processRedirect() {
  let link = new URL(window.location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('returnTo') ?? location.origin
  redirect = decodeURI(redirect)
  document.location.href = redirect
}