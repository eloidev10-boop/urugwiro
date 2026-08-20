const slider =
document.getElementById("heroSlider");

const title =
document.getElementById("heroTitle");

const subtitle =
document.getElementById("heroSubtitle");

const stats =
document.getElementById("heroStats");

let current = 0;

function createSlides(){

slider.innerHTML="";

heroData.slides.forEach((slide,index)=>{

slider.innerHTML+=`

<div class="hero-slide ${index===0?"active":""}"

style="background-image:url('${slide.image}')">

</div>

`;

});

}

function changeSlide(){

const slides=
document.querySelectorAll(".hero-slide");

slides.forEach(s=>s.classList.remove("active"));

current++;

if(current>=heroData.slides.length){

current=0;

}

slides[current].classList.add("active");

title.textContent=
heroData.slides[current].title;

subtitle.textContent=
heroData.slides[current].subtitle;

}

function createStats(){

stats.innerHTML="";

heroData.statistics.forEach(item=>{

stats.innerHTML+=`

<div class="stat-card">

<h2>

${item.number}${item.suffix}

</h2>

<p>

${item.title}

</p>

</div>

`;

});

}

createSlides();

createStats();

title.textContent=
heroData.slides[0].title;

subtitle.textContent=
heroData.slides[0].subtitle;

setInterval(changeSlide,5000);
