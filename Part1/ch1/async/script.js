// function fetchData(){
//     return new Promise((resolve, reject) => {
//         // 비동기 요청을
//         const success = true;
//         if(success){
//             resolve('성공');
//         } else {
//             reject('실패');
//         }
//     })
// }

// fetchData()
//     .then((response)=>{
//         console.log(response);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response1=> response1.json())
//     .then(json1 => console.log(json1))
//     .then(() => fetch('https://jsonplaceholder.typicode.com/todos/2'))
//     .then(response2 => response2.json())
//     .then(json2 => console.log(json2))
//     .catch(error => {
//         console.log(error)
//     })
//     .finally(() =>{
//         console.log('finally');
//     });

async function makeRequest(){
    try {
        const response1 = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const jsonResponse1 = await response1.json();
        console.log(jsonResponse1);
    } catch (error) {
        console.log(error);
    } finally {
        console.log('----모든 작업 완료 ----');
    }
}   
makeRequest();