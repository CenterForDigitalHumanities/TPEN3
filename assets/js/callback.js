window.addEventListener("DOMContentLoaded", showLogoutOptions)

/**
 * After logout, present the user with navigation choices.
 * If a returnTo parameter is present and valid, include it as an option.
 */
function showLogoutOptions() {
  let link = new URL(location.href)
  const queryString = link.search
  const urlParams = new URLSearchParams(queryString)
  let redirect = urlParams.get('returnTo') ?? location.origin
  redirect = decodeURIComponent(redirect)

  const optionsContainer = document.createElement("div")
  const dashboardHeading = document.createElement("h4")
  dashboardHeading.innerText = "TPEN3 Interfaces Dashboard"
  const dashboardLink = document.createElement("a")
  dashboardLink.href = "https://app.t-pen.org"
  dashboardLink.innerText = "https://app.t-pen.org"
  const tpen3Heading = document.createElement("h4")
  tpen3Heading.innerText = "TPEN3 Home Page"
  const tpen3Link = document.createElement("a")
  tpen3Link.innerText = "https://three.t-pen.org"
  tpen3Link.href = "https://three.t-pen.org"
  optionsContainer.appendChild(dashboardHeading)
  optionsContainer.appendChild(dashboardLink)
  optionsContainer.appendChild(tpen3Heading)
  optionsContainer.appendChild(tpen3Link)

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
  const content = document.getElementById("content")
  if (content) {
    content.appendChild(optionsContainer)
  }
  return
}
