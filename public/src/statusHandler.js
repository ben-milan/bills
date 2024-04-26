document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {

        if (event.target.classList.contains("status")) {
            const button = event.target
            id = String(button.getAttribute("id"))
            console.log(id)

            fetch(`/delete/${id}`, {
                method: "DELETE",
                })
            .then(res => {
                if (res.status === 200) {
                    history.go()
                    console.log("ID sent to backend.")
                } else {
                    console.error("Failed to send data.")
                }
            })
            .catch(err => {
                console.error("Error sending data to backend:", err)
            })

            button.classList.remove("btn-danger")
            button.classList.add("btn-success")
        }
    })
})