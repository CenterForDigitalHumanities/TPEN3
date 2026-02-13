window.addEventListener("DOMContentLoaded", showReturnToOption)

/**
 * If a valid returnTo parameter is present, add a "Back To Where I Came From" link.
 */
function showReturnToOption() {
  const urlParams = new URLSearchParams(location.search)
  let redirect = urlParams.get('returnTo')
  if (!redirect) return
  try {
    redirect = new URL(redirect).toString()
    const heading = document.createElement("h2")
    heading.innerText = "Back To Where I Came From"
    const link = document.createElement("a")
    link.href = redirect
    link.innerText = redirect
    const note = document.createElement("p")
    const emphasis = document.createElement("em")
    emphasis.innerText = "*Never click links you do not recognize."
    note.appendChild(emphasis)
    const container = document.getElementById("returnToOption")
    if (!container) return
    container.appendChild(heading)
    container.appendChild(note)
    container.appendChild(link)
  } catch(err) { }
}
