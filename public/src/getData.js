document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/data.json")
        .then(res => res.json())
        .then(data => {
            const data_for_usr = data.filter((entry) => String(entry.user) === String(emailFromBack));

            for(let i=0; i<data_for_usr.length; i++) {
                

                const newTableRow = document.createElement("tr")
        
                const newID = document.createElement("th")
                newID.setAttribute("scope", "row")
                newID.classList.add("id")
                newID.innerText = String(data_for_usr[i].id)
        
                const newTitle = document.createElement("td")
                newTitle.innerText = String(data_for_usr[i].title)
        
                const newDate = document.createElement("td")
                newDate.innerText = String(data_for_usr[i].due_by)
                
                const newAmount = document.createElement("td")
                newAmount.innerText = String(data_for_usr[i].amount)

                const newDownload = document.createElement("td")
                const newLink = document.createElement("a")
                newLink.href = String(data_for_usr[i].file_path)
                newLink.target = "_blank" 
                newLink.innerText = "Bill Preview"
                newDownload.appendChild(newLink)
                
                const newSwitch = document.createElement("td")
                const newSwitchButton = document.createElement("button")
                newSwitchButton.type = "button"
                newSwitchButton.style = "padding: 15px; border-radius: 20px"
                newSwitchButton.id = String(data_for_usr[i].id)
                newSwitchButton.classList.add("btn", "btn-danger", "status")
                newSwitch.appendChild(newSwitchButton)

                newTableRow.appendChild(newID);
                newTableRow.appendChild(newTitle);
                newTableRow.appendChild(newDate);
                newTableRow.appendChild(newAmount)
                newTableRow.appendChild(newDownload);
                newTableRow.appendChild(newSwitch)
        
                const currentTableBody = document.getElementById("table-body")
                const existingRow = document.getElementById("table-row")
                currentTableBody.insertBefore(newTableRow, existingRow)
            }
        })
        .catch(err => console.error("Error fetching JSON:", err))
})