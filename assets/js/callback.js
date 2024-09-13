function redirectUser() {
  location.href = getReferringPage() ?? "https://www.tpen.org/interfaces"
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

/**
 * Follows the 'base64url' rules to decode a string.
 * @param {String} base64str from `state` parameter in the hash from Auth0
 * @returns referring URL
 */
function b64toUrl(base64str) {
  return window.atob(base64str.replace(/\-/g, "+").replace(/_/g, "/"))
}

window.onload = redirectUser()
