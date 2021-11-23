'use strict';

const images = document.querySelectorAll('.image-item');
const links = document.querySelectorAll('.block');
const icons = document.querySelectorAll('.icon');
const moveCircle = document.querySelector('.circle');
const circle = 360;
const samllCirclItems = document.querySelectorAll('.small-circle-item');
const smallCircleTimer = setInterval(plussSlides, 5000);
let slideIndex = 1;
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


links.forEach((link, j) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        clearInterval(smallCircleTimer); //останавливает показ в small circle

        
        //берем аттрибут п.м. чтобы связать его с позицией в массиве
        let attr = +link.getAttribute('data-circle');
        //определяем позицию (угол) кликнутого элемента
        let position = arr[attr - 1];
        //на сколько нужно прокрутить меню
        let rot = circle - position;

        // console.log(position);
        // console.log(rot);

        //крутим меню на нужный угол
        if (!link.classList.contains('active')) {
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

        hideContent(images);
        showContent(images, j);

        hideContent(samllCirclItems);
        showContent(samllCirclItems, j);
    });
});


hideContent(images);
showContent(images);


function hideContent(array) { //скрывает вкладку
    array.forEach(item => { // скрываем отображение вкладки
        item.classList.add('hide');
        item.classList.remove('show', 'fadeIn');
    });  
}


function showContent(array, j = 0) {
    array[j].classList.add('show', 'fadeIn'); // показывает определенную вкладку и анимацию
    array[j].classList.remove('hide');
}


showSlides(slideIndex, samllCirclItems);


function showSlides(n, slides) {
    if (n > slides.length) { // если упираемся в правую границу
        slideIndex = 1;
    }

    if(n < 1) {
        slideIndex = slides.length; // если упираемся в левую границу
    }

    slides.forEach(item => item.classList.remove('fadeIn'));
    slides[slideIndex - 1].classList.add('fadeIn');
}


function plussSlides() { //будет переключать слайды при клике
    showSlides(slideIndex += 1, samllCirclItems);
}






