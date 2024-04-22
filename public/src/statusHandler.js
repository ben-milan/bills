document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("status")) {
            const button = event.target
            button.classList.remove("btn-danger")
            button.classList.add("btn-success")
        }
    })
})