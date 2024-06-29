const dropdownButton = document.querySelector('.btn-dropdown');
const dropdownButtonLine1 = dropdownButton.querySelector('.line-1');
const dropdownButtonLine2 = dropdownButton.querySelector('.line-2');
const dropdownButtonLine3 = dropdownButton.querySelector('.line-3');
const mainNavMenu = document.querySelector('.main-nav-menu');


// console.log(mainNavMenu);

const buttonToggle = () => {
  dropdownButtonLine1.classList.toggle('line-1-toggleLine');
  dropdownButtonLine2.classList.toggle('line-2-toggleLine');
  dropdownButtonLine3.classList.toggle('line-3-toggleLine');
};

const showMenu = (eve) => {
eve.preventDefault();
  mainNavMenu.classList.toggle('show-toggle');
  buttonToggle();
};

dropdownButton.addEventListener('touchstart', showMenu, false);

//////////////////////////////      SLIDER CAROUSEL       ///////////////////////////////


// Get The Slider Elements
const carousel  = document.querySelector(".carousel");
const slider    = document.querySelector(".slider");
const slides    = document.querySelectorAll(".slide");
const prev      = document.querySelector(".prev");
const next      = document.querySelector(".next");

// Set Active elements
slides[0].classList.add('active');

// Count the slides
let slidesArray = Array.from(slides);
let slidesLength = slidesArray.length;

console.log(slidesLength);
    // Function to move    
    function maineSlider(sliderName,slidesLength, currentSlide = 0){
        function carouselMove() {
        let translateXSize = 100 / slidesLength; // The space that the slider goes.

        // To decide the active slide and move it.
        if(currentSlide < slidesLength){
            // remove the active class from all slides and add it to the current slide.
            slides.forEach(element => {
                element.classList.remove("active");
            });
            slides[currentSlide].classList.add("active");
            
            sliderName.style.transform = `translateX(calc(-${translateXSize}% * ${currentSlide}))`;         
            currentSlide++;
            
        } else if (currentSlide == slidesLength ){
                // remove the active class from all slides and add it to the current slide.
                slides.forEach(element => {
                    element.classList.remove("active");
                });
                
                currentSlide = 0;
                sliderName.style.transition = 'none';
                sliderName.style.transform = `translateX(0)`;  
                setTimeout(function(){
                    sliderName.style.transition = 'all 1s';            
                });
            }
        }
    // Play the autoplay slider
    auto = setInterval(function(){
        carouselMove();
    }, 2000);
}


// To Next Slide
function toNext() {
    let current = parseInt(document.querySelector(".active").id);
    console.log(current);
    let moveSize = 100 / slidesLength;
    // Stop the auto slider.
    clearTimeout(auto);
    // clear the active class from all slides.
        slides.forEach(element => {
        element.classList.remove("active");
        });
    // check if the next slide is not the last slide to make the effect
    if(current < slidesLength){   
        slides[current].classList.add("active");      
        slider.style.transform = `translateX(calc(-${moveSize}% * ${current}))`;
    } else {
        current = 0;
        slider.style.transition = 'none';
        slider.style.transform  = `translateX(0)`;    
        setInterval(function(){
            slider.style.transition = 'all 1s';            
        });
        slides[current].classList.add("active");
        slider.style.transform = `translateX(calc(-${moveSize}% * ${current}))`;
    }
    
    auto = setTimeout(function(){
            maineSlider(slider, slidesLength, current);
        }, 2000);
}

// To Previous slide
function toPrev() {
    let current = parseInt(document.querySelector(".active").id);
    let moveSize = 100 / slidesLength;

    // Stop the auto slider.
    clearTimeout(auto);
    // clear the active class from all slides.
        slides.forEach(element => {
        element.classList.remove("active");
        });
              
    // check if the next slide is not the last slide to make the effect
    if(current > 1){  
        current -= 2;
        slides[current].classList.add("active"); 
        slider.style.transform = `translateX(calc(-${moveSize}% * ${current}))`;

    } else if(current == 1 || current == null){
        current = slides.length - 1;        
        slides[current].classList.add("active");
        slider.style.transition = 'none';
        slider.style.transform  = `translateX(slidesLength)`;        
        setInterval(function(){
            slider.style.transition = 'all 1s';            
        });
        slider.style.transform = `translateX(calc(-${moveSize}% * ${slidesLength - 2}))`;
    }

    // Play the auto slider again.
    auto = setTimeout(function(){
            maineSlider(slider, slidesLength, current);
        }, 2000);
}

//Call the PREV & NEXT functions.
prev.onclick = toPrev;
next.onclick = toNext;
maineSlider(slider,slidesLength);
