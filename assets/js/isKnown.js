import TPEN from "https://app.t-pen.org/api/TPEN.js"

const token = new URLSearchParams(location.search).get("idToken") ?? TPEN.getAuthorization()
history.replaceState(null, "", location.pathname + location.search.replace(/[\?&]idToken=[^&]+/, ''))

if (token) {
    document.querySelectorAll(".unauthenticated").forEach(el=>el.classList.add("hidden"))
    document.querySelectorAll(".authenticated").forEach(el=>el.classList.remove("hidden"))
    TPEN.getUserProjects(token).then((projects) => {
        const projectsList = document.querySelector(".project-list")
        if(projectsList) {
            projectsList.innerHTML = projects.map(project => `<li><a href="https://app.t-pen.org/project/?projectID=${project._id}" target="_blank">${project.label ?? project.title}</a></li>`).join("")
            projectsList.classList.remove("hidden")
        }
    })
}
