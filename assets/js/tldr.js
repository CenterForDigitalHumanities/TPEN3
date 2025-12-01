function toggleTLDR() {
  const content = document.getElementById('tldr-content')
  const button = document.querySelector('.tldr-toggle')
  
  if (content.hidden) {
    content.hidden = false
    button.setAttribute('aria-expanded', 'true')
    button.innerHTML = '<i class="bi bi-lightning-fill"></i> Hide TL;DR'
  } else {
    content.hidden = true
    button.setAttribute('aria-expanded', 'false')
    button.innerHTML = '<i class="bi bi-lightning-fill"></i> TL;DR'
  }
}
