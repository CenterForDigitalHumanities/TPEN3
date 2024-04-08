function redirectUser() {
  let redirectUrl
  const referringPage = getReferringPage()

  if (referringPage && referringPage !== location.href) {
    redirectUrl = referringPage
    //We can change the current location t oprevent login loop. it'd take out all refs or params if we just location.href = referringPage for instance
  } else{ 
    redirectUrl = "https://www.tpen.org/interfaces"
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
