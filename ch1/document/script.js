let val;

val = document;

val = document.baseURI; // 웹 페지의 절대 URI 반환
val = document.head; // <head> 태그 반환
val = document.body; // <body> 태그 반환


val = document.forms; // <form> 태그 반환
val = document.forms[0].id;
val = document.forms[0].classList;
val = document.forms[0].className;

val = document.scripts[0].getAttribute('src');

console.log(val);