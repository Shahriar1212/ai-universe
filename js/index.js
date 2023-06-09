let dataLimit = 6;
let sort = false;
let seeMore = false;
const fetchData = (dataLimit) =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res  => res.json())
    .then(data => loadData(data.data.tools, dataLimit));
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

fetchData(dataLimit);
toggleSpinner(true);

document.getElementById('btn-see-more').addEventListener('click', function(){
    seeMore = true;
    fetchData(100);
})


const returnCardFeature = item => {
    let list = '';
    for(x of item){
        list += `<li>${x}</li> `
    }
    return list;
}

document.getElementById('btn-sort').addEventListener('click', function(){
    sort = true;
    if(seeMore){
        fetchData(100);
    }
    else{
        fetchData(6);
    }
})

const loadData = (data, dataLimit) => {

    let a = data[0].published_in;

    const customSort = (a,b) =>{
        const date1 = new Date(a.published_in);
        const date2 = new Date(b.published_in);

        if(date1 < date2) return 1;
        else if(date1 > date2) return -1;
        return 0;

    }

    console.log(data);
    if(sort){
        data = data.sort(customSort);
    }
    
    console.log(data);



    const cards = document.getElementById('cards');
    cards.textContent = '';
    // console.log(data[0])

    returnCardFeature(data[0].features)
    for(let i=0;i<data.length;i++){

        if(i === dataLimit){
            break;
        }

        const card = document.createElement('card');
        card.classList.add('card');
        card.innerHTML = `
        <img class="card-image" src="${data[i].image}" alt="">
        <h3 class="card-title">Features</h3>

        <ol>
            ${returnCardFeature(data[i].features)}
        </ol>
        <!-- <hr> -->
        <div class="hr"></div>
        <div class="card-footer">
            <div>
                <h2>${data[i].name}</h2>
                <p class="date"> <img class="calendar-icon" src="calendar.png" alt="">${data[i].published_in}</p>
            </div>
            <div>
                <button onclick="loadDetails('${data[i].id}')" class="details-btn" data-bs-toggle="modal" data-bs-target="#cardDetailModal"><img src="right-arrow.png" alt=""></button>
            </div>
        </div>
        `;

        cards.appendChild(card);
        toggleSpinner(false);
        
    }
    
}

const loadDetails = async id =>{
    // console.log(id);
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
}

const calcPrice = price =>{
    if(price === null){
        return `No data found`;
    }
    if(price === '0'){
        return 'Free of Cost';
    }
    else{
        return price;
    }
}

const returnModalFeaturesList = items => {
    let list = '';
    for (const [_, features] of Object.entries(items)) {
        list += `<li>${features.feature_name}</li> `;
      }
      return list;
}
const returnModalIntigrationList = items => {
    let list = '';
    if(items == null){
        return 'sdf';
    }
    for(x of items){
        list += `<li>${x}</li> `
    }
    return list;
}

const returnInputExample = data =>{
    // console.log(data.input_output_examples)
    
}

const getAccuracy = data => {
    if(data.accuracy.score === null){
        return 'no data found';
    }
    else{
        return (`${data.accuracy.score * 100}% accuracy`);        
    }
    return '';
}





const displayDetails = data =>{
    // console.log(data.features);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';

    modalContainer.innerHTML = `
    <div class="card1 modal-card">
        <h3>${data.description}</h3>
        <div class="cost-plan-container">
            <div class="cost-box">${calcPrice(data.pricing[0].price) + '  ' + data.pricing[0].plan}</div>
            <div class="cost-box">${calcPrice(data.pricing[0].price) + '  ' + data.pricing[1].plan}</div>
            <div class="cost-box" style="color:#EB5757;">${calcPrice(data.pricing[0].price) + '  ' + data.pricing[2].plan}</div>
        </div>
        <div class="other-info">
            <div class="modal-features">
                <h3>Features</h3>
                <ul>
                    ${returnModalFeaturesList(data.features)}
                </ul>
            </div>
            <div class="integrations">
                <h3>Integration</h3>
                <ul>
                ${returnModalIntigrationList(data.integrations)}
                    
                </ul>
            </div>
        </div>
    </div>

    <div class="card2 modal-card">
        <button id="btn-accuracy" class="btn-accuracy">${getAccuracy(data)}</button>
        <img class="img-fluid" src="${data.image_link[0]}" alt="">
        <h3>${ data.input_output_examples[0].input}</h3>
        <p>${ data.input_output_examples[0].output}</p>
    </div>
    `   
}





