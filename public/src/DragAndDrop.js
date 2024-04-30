document.addEventListener("DOMContentLoaded", () => {

    const dropArea = document.getElementById("drop-area");
    const file = document.getElementById("input-file");
    const imgView = document.getElementById("img-view");

    file.addEventListener("change", uploadFile);

    function uploadFile() {
        alert(file.files[0])
    }

    dropArea.addEventListener("dragover", function(e) {
        e.preventDefault();
    })
    dropArea.addEventListener("drop", function(e) {
        e.preventDefault();
        file.files = e.dataTransfer.files
        uploadFile();
    })
})