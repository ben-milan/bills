document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        fetch("../data/data.json")
        .then(res => res.json())
        .then(data => {
            const data_for_del = data.filter((entry) => String(entry.user) === String(emailFromBack));
            const data_without_usr = data.filter((entry) => String(entry.user) !== String(emailFromBack));
            console.log(data_for_del)

            if (event.target.classList.contains("status")) {
                const button = event.target
                id = Number(button.getAttribute("id")) -1
                data_for_del.splice(id, 1)
                data_for_del.forEach(element => {
                    data_without_usr.push(element)
                });
                console.log("Data:", data_without_usr)

                fetch("/delete", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data_without_usr)
                })
                .then(res => {
                    if (res.ok) {
                        console.log("Data sent to backend.")
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
})