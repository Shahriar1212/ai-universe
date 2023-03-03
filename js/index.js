
const fetchData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res  => res.json())
    .then(data => loadData(data.data.tools));
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

fetchData();
toggleSpinner(true);

const loadData = (data) => {

    // console.log(data[0])
    const cards = document.getElementById('cards');
    console.log(data[0])


    for(let i=0;i<data.length;i++){

        if(i === 6){
            break;
        }

        const card = document.createElement('card');
        card.classList.add('card');
        card.innerHTML = `
        <img class="card-image" src="${data[i].image}" alt="">
        <h3 class="card-title">Features</h3>

        <ol>
            <li>${data[i].features['0']}</li>
            <li>${data[i].features['1']}</li>
            <li>${data[i].features['2']}</li>
        </ol>
        <!-- <hr> -->
        <div class="hr"></div>
        <div class="card-footer">
            <div>
                <h2>${data[i].name}</h2>
                <p class="date"> <img class="calendar-icon" src="calendar.png" alt="">${data[i].published_in}</p>
            </div>
            <div>
                <button class="details-btn"><img src="right-arrow.png" alt=""></button>
            </div>
        </div>
        `;

        cards.appendChild(card);
        toggleSpinner(false);
        
    }


    
}





