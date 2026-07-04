const API = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnTEU99vPBJldaPGMF2ajWH0Rw4VL8XDXKrbOA5lD04YqJ6tBK9A992oCDgt2Mkco12auOvX_XI8CaZkweR0gguNaYLg9EzBmyHP2RjjiUks9bB0OpHY45KQ1kCupHOaq34M7X38XpH0H-yjEvwiMhVX6y-vBLr2LL1NDcsU-CmNYfOw9_zcKBbUlh1uLwBWv5JYyNnRmvmlq4HZdJOT--fw1GgBNZDirH2ZAPm2P14IIK2xTHZSYXkEVf-PjUtow_cjNhjR1MbfLU8xV7mkTlVTEckuJg&lib=M-hGg8H9SiNZie1UYF9RmXGxEtUEwoZJ_";
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
