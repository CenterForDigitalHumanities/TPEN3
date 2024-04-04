function redirectUser() {

  let redirectUrl;
  const referringPage = getReferringPage()
  const userToken = localStorage.getItem("userToken")

  if (referringPage && referringPage !== location.href) {
    redirectUrl = referringPage
    //We can change the current location t oprevent login loop. it'd take out all refs or params if we just location.href = referringPage for instance
  } else if ( userHasProject(userToken)) {
    redirectUrl = "xyz/dashboard/projects"
  } else {
    redirectUrl = "https://www.tpen.org/interfaces"
    // redirect to homepage with welcome texts and tutorials
  }
}

async function userHasProject (userToken){
  try {
    return await fetch("dev.api.tpen-services.org/project", {
      method: post,
      headers: {
        Authorization: `Bearer ${window.TPEN_USER?.authorization}` || userToken,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(userId)
    })
  } catch (error) {
    return false 
  }
}

function getReferringPage (){
  try { 
    const base64Hash = location.hash.split("state=")[1].split("&")[0]; 
    const decodedUrl = b64toUrl(base64Hash); 
    return decodedUrl;
  } catch (err) { 
    return false;
  }
}

function urlToBase64 (url) {
  return window
    .btoa(url)
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=+$/, "")
}


window.onload = redirectUser()
