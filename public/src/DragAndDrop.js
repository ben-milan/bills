const { response } = require("express");

document.addEventListener("DOMContentLoaded", () => {

    const viewBill = document.getElementById("view-btn")
    const dropArea = document.getElementById("drop-area");
    const file = document.getElementById("input-file");

    let files = [];
    //FILES IN JSON SPEICHERN SIE VON WO ANDERS HOLEN UM SIE IN index.ejs BENUTZEN ZU KÖNNEN

    file.addEventListener("change", uploadFile);

    function uploadFile() {
        files = files.concat(Array.from(file.files))
        fetch("http://localhost:3000/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(files)
        })
        .catch(err => console.error("Error:", err))
        console.log(files)
    }

    dropArea.addEventListener("dragover", function(e) {
        e.preventDefault();
    })

    dropArea.addEventListener("drop", function(e) {
        e.preventDefault();
        files = Array.from(e.dataTransfer.files)
        uploadFile();
    })

    viewBill.addEventListener("click", () => {
        files.forEach(file => {
            if (file.type === "application/pdf") {
                const fileReader = new FileReader();
                fileReader.onload = function(e) {
                    const pdfBlob = new Blob([e.target.result], { type: "application/pdf"});
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    window.open(pdfUrl, "_blank");
                };
                fileReader.readAsArrayBuffer(file);
            }
        })
    })

})