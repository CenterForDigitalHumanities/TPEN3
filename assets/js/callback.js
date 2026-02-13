window.addEventListener("DOMContentLoaded", showReturnToOption)

/**
 * If a valid returnTo parameter is present, add a "Back To Where I Came From" link.
 */
function showReturnToOption() {
  const urlParams = new URLSearchParams(location.search)
  let redirect = urlParams.get('returnTo')
  if (!redirect) return
  redirect = decodeURIComponent(redirect)
  try {
    redirect = new URL(redirect).toString()
    const heading = document.createElement("h3")
    heading.innerText = "Back To Where I Came From"
    const link = document.createElement("a")
    link.href = redirect
    link.innerText = redirect
    const container = document.getElementById("returnToOption")
    if (!container) return
    container.appendChild(heading)
    container.appendChild(link)
  } catch(err) { }
}
