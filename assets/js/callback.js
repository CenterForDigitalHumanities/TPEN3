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

  const optionsContainer = document.createElement("div")
  const dashboardHeading = document.createElement("h4")
  dashboardHeading.innerText = "TPEN3 Interfaces Dashboard"
  const dashboardLink = document.createElement("a")
  dashboardLink.href = "https://app.t-pen.org"
  dashboardLink.innerText = "https://app.t-pen.org"
  const TPEN3Heading = document.createElement("h4")
  TPEN3Heading.innerText = "TPEN3 Home Page"
  const TPEN3link = document.createElement("a")
  TPEN3link.innerText = "https://three.t-pen.org"
  TPEN3link.href = "https://three.t-pen.org"
  optionsContainer.appendChild(dashboardHeading)
  optionsContainer.appendChild(dashboardLink)
  optionsContainer.appendChild(TPEN3Heading)
  optionsContainer.appendChild(TPEN3link)

  try {
    redirect = new URL(redirect).toString()
    const cameFromHeading = document.createElement("h4")
    cameFromHeading.innerText = "Back To Where I Came From"
    const cameFromLink = document.createElement("a")
    cameFromLink.href = redirect
    cameFromLink.innerText = redirect
    optionsContainer.appendChild(cameFromHeading)
    optionsContainer.appendChild(cameFromLink)
  }
  catch(err) { }
  document.getElementById("content").appendChild(optionsContainer)
  return
}
