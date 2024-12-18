window.onload = redirectUser()

/**
 *  Detect and get the value of returnTo from the origin address /callback/?returnTo=
 *  If there is no returnTo, default to the origin homepage.
 *  Note that performLogout() in auth.js will always add a returnTo, and it may just be the origin homepage.
 */
function redirectUser() {
  let link = new URL(location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('returnTo') ?? location.origin
  redirect = decodeURI(redirect)
  try {
    redirect = new URL(redirect).toString()
  }
  catch(err) {
    redirect = undefined
  }

  if(!redirect || redirect === location.origin+"/logout/"){
    alert("Please provide a valid URL in the ?returnTo= parameter when logging out.")
    setTimeout(() => {
      location.href = location.origin
    }, "5000")
    return
  }
  console.log("REDIRECT TO "+redirect)
  location.href = redirect
  return
}
