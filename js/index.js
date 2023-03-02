fetch('https://openapi.programming-hero.com/api/ai/tools')
.then(res  => res.json())
.then(data => loadData(data.data.tools));


const loadData = (data) => {

    console.log(data[0].features[0])
    
    const card = `
    <div class="card">
        <img class="card-image" src="https://i.ytimg.com/vi/_LZzfpjepoY/maxresdefault.jpg" alt="">
        <h3 class="card-title">Features</h3>

        <ol>
            <li>one</li>
            <li>two</li>
            <li>three</li>
        </ol>
        <!-- <hr> -->
        <div class="hr"></div>
        <div class="card-footer">
            <div>
                <h2>chat GPT</h2>
                <p> <img src="calendar.png" alt=""> 12/12/1998</p>
            </div>
            <div>
                <button class="details-btn"><img src="right-arrow.png" alt=""></button>
            </div>
        </div>
        
    </div>

    `
}