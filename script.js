'use strict';

const images = document.querySelectorAll('.image-item');
const links = document.querySelectorAll('.block');
const icons = document.querySelectorAll('.icon');
const moveCircle = document.querySelector('.circle');
const circle = 360;
let arr = [];

//кол-во пунктов меню
let len = links.length; 
//угол между пунктами меню (п.м.)
let corner = circle / len;
// console.log(corner);

//собираем все позиции(углы расположения) п.м.
for (let i = 0; i < len; i++) {
    arr[i] = i * corner;
}
// console.log(arr);

//Установка изначальной позиции
for(let i = 1; i <= len; i++) {
    //определяем каждый п.м. как чайлд с номером внутри блока circle

    let block = document.querySelector(`.circle li:nth-child(${i})`);
    let icon = block.querySelector('i');
    //крутим п.м. на угол в соотношении расчетных позиций(углов в массиве)
    let position = arr[i - 1]; //arr[i - 1] - corner боковое расположение
    block.style.transform = `rotate(${position}deg)`;
    //иконку крутим в обратную сторону, чтобы она стояла правильно
    icon.style.transform = `rotate(${-position}deg)`;
}

let smallCircleTimeOut;



links.forEach((link, j) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        clearInterval(smallCircleTimer); //останавливает показ в small circle

        
        //берем аттрибут п.м. чтобы связать его с позицией в массиве
        let attr = +link.getAttribute('data-circle');
        //определяем позицию (угол) кликнутого элемента
        let position = arr[attr - 1];
        //на сколько нужно прокрутить меню
        let rot = circle - position ;

        // console.log(position);
        // console.log(rot);

        //крутим меню на нужный угол
        if (rot != 360) {
            moveCircle .style.transform = `rotate(${rot}deg)`;

            //крутим иконки, чтобы они смотрелись правильно
            for (let i = 0; i < icons.length; i++) {
                //определяем новое значение угла положения иконок
                //так как изначально мы выравнивали их в отношении пвернутых элементов  
                let roll = -arr[i] - rot; //-(arr[i] + corner) - rot боковое расположение
                icons[i].style.transform = `rotate(${roll}deg)`;
            }
        }     
        
        links.forEach(link=> { // убираем подсветку активного выбора меню
            link.classList.remove('active');
        });
        link.classList.add('active');

        hideImage();
        showImage(j);
    });
});



hideImage();
showImage();

function hideImage() { //скрывает вкладку
    images.forEach(item => { // скрываем отображение вкладки
        item.classList.add('hide');
        item.classList.remove('show', 'fadeIn');
    });

    
}


function showImage(j = 0) {
    images[j].classList.add('show', 'fadeIn'); // показывает определенную вкладку и анимацию
    images[j].classList.remove('hide');
    links[j].classList.add('tabheader__item_active'); // делаем айтем менюшки активным(жирным)
}










const samllCirclItems = document.querySelectorAll('.small-circle-item');

let slideIndex = 1;

showSlides(slideIndex, samllCirclItems);

function showSlides(n, slides) {
    if (n > slides.length) { // если упираемся в правую границу
        slideIndex = 1;
    }

    if(n < 1) {
        slideIndex = slides.length; // если упираемся в левую границу
    }
    // slides.forEach(item => item.style.opacity = '0'); 
    // slides.forEach(item => item.style.visibility = 'hidden');
    slides.forEach(item => item.classList.remove('fadeIn'));
    // slides[slideIndex - 1].style.opacity  = '1';
    // slides[slideIndex - 1].style.visibility = 'visible';
    slides[slideIndex - 1].classList.add('fadeIn');
}

function plussSlides() { //будет переключать слайды при клике
    showSlides(slideIndex += 1, samllCirclItems);
}

let test = document.querySelector('.test');

test.addEventListener('click', () => {
    plussSlides();
});

const smallCircleTimer = setInterval(plussSlides, 5000);



