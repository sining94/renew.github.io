// scroll
const html = $('html');
let page = 1;
const head = $('header');
const $window = $(window);
const spyEls = document.querySelectorAll('section .topic');
const animateEls = document.querySelectorAll('.animate');
const $menu = $('.listArea > div');
const $menuEls = $('.listArea > div > ul > li');
const $HmenuEls = $menuEls.innerHeight()


html.animate({ scrollTop: 0 }, 10);

window.addEventListener("wheel", function (e) {
    e.preventDefault();
}, { passive: false });

$window.on("wheel", function (e) {
    if (html.is(":animated")) return;
    if (e.originalEvent.deltaY > 0) {
        if (page == document.querySelectorAll('section').length) return;
        page++;
    } else if (e.originalEvent.deltaY < 0) {
        if (page == 1) return;
        page--;
    }

    var posTop = (page - 1) * $window.height();
    html.animate({ scrollTop: posTop }, 600);

    if (posTop == 0) {
        head.addClass('show');
    }
    else {
        head.removeClass('show');
    }    
});



$('header .logo').on('click mouseenter', function(){
    $('.logo a div').css('display',"block");
});
$("header .logo").on('mouseleave', function(){
    $('.logo a div').css('display',"none");
});

spyEls.forEach(function(spyEl){
    new ScrollMagic
    .Scene({
        triggerElement: spyEl,
        triggerHook: 1,
    })
    .setClassToggle(spyEl, 'active')
    .addTo(new ScrollMagic.Controller());
});

animateEls.forEach(function(animateEl){
    new ScrollMagic
    .Scene({
        triggerElement: animateEl,
        triggerHook: 1,
    })
    .setClassToggle(animateEl, 'active')
    .addTo(new ScrollMagic.Controller());
});

// function activeTopic(){
//     const words = document.querySelectorAll('section')[page - 1].querySelector('.topic');
//     let windowHeight = window.innerHeight;
//     let elementHeight = words.getBoundingClientRect().top;

//     if (elementHeight < windowHeight){
//         words.classList.add('active')
//     }
//     else{
//         words.classList.remove('active');
//     }
// }

// window.addEventListener('scroll', function(){
//     if(document.querySelectorAll('section')[page - 1].querySelector('.topic') != null ){
//         activeTopic();
//     }

// });


// main
const target = document.querySelector(".sec1 .writing");
let stringArr = ["Hi Guys! My name is Lee Yong Ju.", "Welcome to my website!"]
let index = 0;
let selectStringArr = stringArr[index].split("");

writing();


function writing() {
    if (selectStringArr.length !== 0) {
        target.textContent += selectStringArr.shift();
        setTimeout(function () {
            writing();
        }, 80);
    }
    else {
        selectStringArr = target.textContent.split('');
        if (index = (index + 1) % stringArr.length == 0) {
            return false;
        }
        else {
            setTimeout(function () {
                deleteTxt();
            }, 50);
        }
    }
};

function deleteTxt() {
    selectStringArr.pop();
    target.textContent = selectStringArr.join("");
    if (selectStringArr.length !== 0) {
        setTimeout(function () {
            deleteTxt()
        }, 50);
    } else {
        index = (index + 1) % stringArr.length
        selectStringArr = stringArr[index].split("");
        writing();
    }
};

// section4 swiper
const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    preventClicks: true,
    preventClicksPropagation: false,
    observer: true,
    observeParents: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    speed: 600,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    centeredSlides: true,
    slideToClickedSlide: true,
    on:{
        slideChange : function(){
            let swiperIndex = this.realIndex;
            let contIndex = document.querySelectorAll('.detailList > li');

            contIndex.forEach(function(el){
                el.classList.remove('active');
            });
            contIndex[swiperIndex].classList.add('active');
            
        }
    }
});

$menu.on({
    mouseenter: function(){
        $(this).find('ul').animate({'height':  $HmenuEls * $(this).find('li').length + 10 + 'px', 'padding-top':"15px"}, 400);
    }
});
