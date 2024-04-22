document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/data.json")
        .then(res => res.json())
        .then(data => {
            const data_for_total = data.filter((entry) => String(entry.user) === String(emailFromBack));
            
            let total = 0

            for(let i=0; i<data_for_total.length; i++) {  
                total += data_for_total[i].amount;
            }
            const newTotal = document.getElementById("total")
            newTotal.innerHTML = `<strong><u>${total}</u></strong>` 
        
    })
})