const API = "SEM_VLOŽTE_URL_APPS_SCRIPT";
 async function loadGifts(){

    const response = await fetch(API);

    const gifts = await response.json();

    const container = document.getElementById("gifts");

    container.innerHTML = "";

    gifts.forEach(gift=>{

        container.innerHTML += `
        <div class="gift">

            <h3>${gift.dar}</h3>

            <p>${gift.popis}</p>

            ${
                gift.rezervovane
                ? "<b>Rezervované</b>"
                : <button onclick="reserve(${gift.id})">Rezervovať</button>
            }

        </div>
        `;

    });

}

async function reserve(id){

    const meno = prompt("Vaše meno");

    if(!meno) return;

    await fetch(API,{
        method:"POST",
        body:JSON.stringify({
            id:id,
            meno:meno
        })
    });

    loadGifts();

}

loadGifts();
