document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/data.json")
        .then(res => res.json())
        .then(data => {
            const data_for_usr = data.filter((entry) => String(entry.user) === String(emailFromBack));

            for(let i=0; i<data_for_usr.length; i++) {

                const newTableRow = document.createElement("tr")
        
                const newID = document.createElement("th")
                newID.setAttribute("scope", "row")
                newID.innerText = String(data_for_usr[i].id)
        
                const newTitle = document.createElement("td")
                newTitle.innerText = String(data_for_usr[i].title)
        
                const newDate = document.createElement("td")
                newDate.innerText = String(data_for_usr[i].due_by)
        
                const newDownload = document.createElement("td")
                const newLink = document.createElement("a")
                newLink.href = String(data_for_usr[i].file_path)
                newLink.target = "_blank" 
                newLink.innerText = "Bill Preview"
                newDownload.appendChild(newLink)
                
                //Add a Switch for when the Bill is Paid look Bootstrap

                newTableRow.appendChild(newID);
                newTableRow.appendChild(newTitle);
                newTableRow.appendChild(newDate);
                newTableRow.appendChild(newDownload);
        
                const currentTableBody = document.getElementById("table-body")
                currentTableBody.appendChild(newTableRow)
            }
        })
        .catch(err => console.error("Error fetching JSON:", err))
})