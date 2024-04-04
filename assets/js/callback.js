// alert("authentication callback complete.")

function redirectUser() {

  let redirectUrl

  const params = new URLSearchParams(window.location.search)
  const referringUrl = decodeURIComponent(params.get("ref"))
  // const hasProject = decodeURIComponent(params.get("projects"))
  const userToken = decodeURIComponent(params.get("access-token"))

  if (referringUrl) {
    redirectUrl = referringUrl
  } else if ( userHasProject(userToken)) {
    redirectUrl = "xyz/dashboard/projects"
  } else {
    redirectUrl = "/"
    // redirect to homepage with welcome texts and tutorials
  }
}

const userHasProject = async (token) => {
  try {
    return await fetch("dev.api.tpen-services.org/project", {
      method: post,
      headers: {
        Authorization: `Bearer ${window.TPEN_USER?.authorization}` || token,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(userId)
    })
  } catch (error) {

  }
}

window.onload = redirectUser()
