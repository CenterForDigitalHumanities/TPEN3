function redirectUser() {
  let redirectUrl
  const referringPage = getReferringPage()

  if (referringPage && referringPage !== location.href) {
    redirectUrl = referringPage
    //We can change the current location t oprevent login loop. it'd take out all refs or params if we just location.href = referringPage for instance
  } else if (userHasProject()) {
    redirectUrl = "xyz/dashboard/projects"
  } else {
    redirectUrl = "https://www.tpen.org/interfaces"
    // redirect to homepage with welcome texts and tutorials
  }
}

async function userHasProject() {
  try {
    const response = await fetch(
      "https://dev.api.tpen-services.org/project/myproject",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.TPEN_USER?.authorization}`,
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    )

    return response.ok ? response : false
  } catch (error) {
    return false
  }
}

function getReferringPage() {
  try {
    const base64Hash = location.hash.split("state=")[1].split("&")[0]
    const decodedUrl = b64toUrl(base64Hash)
    return decodedUrl
  } catch (err) {
    return false
  }
}

function urlToBase64(url) {
  return window
    .btoa(url)
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=+$/, "")
}

window.onload = redirectUser()
