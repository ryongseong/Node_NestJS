// let val;

// val = document;

// val = document.baseURI; // 웹 페지의 절대 URI 반환
// val = document.head; // <head> 태그 반환
// val = document.body; // <body> 태그 반환


// val = document.forms; // <form> 태그 반환
// val = document.forms[0].id;
// val = document.forms[0].classList;
// val = document.forms[0].className;

// val = document.scripts[0].getAttribute('src');


// const headerContainer = document.getElementById('header-container');
// headerContainer.style.display = 'none';

// headerContainer.textContent = 'Text Content';
// headerContainer.innerText = 'Inner Text';
// headerContainer.innerHTML = '<span>inner HTML</span>'
// console.log(headerContainer);


const items = document.getElementsByClassName('list-group-item');

items[0].style.color = 'blue';
items[3].textContent = 'Hi';

let lists = document.getElementsByTagName('li');
console.log(lists);

lists = Array.from(lists);
console.log(lists);

lists.forEach((list, index) => {
    list.textContent = `${index}. List`
});

const liOdd = document.querySelectorAll('li:nth-child(odd)');

liOdd.forEach((li)=>{
    li.style.backgroundColor = 'gray';
})