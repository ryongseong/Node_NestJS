// for (let i = 0; i < 10; i++) {
//     if (i === 3){
//         console.log('It is 3');
//         continue;
//     }
//     if (i === 5){
//         console.log('5 Stop the loop');
//         break;
//     }

//     console.log('Number ' + i);
// }

// const user = {
//     name: 'Han',
//     province: '경기도',
//     city: '성남시'
// }

// for (let x in user){
//     console.log(`${x} : ${user[x]}`);
// }

// let i = 0;

// while (i<10){
//     console.log('Number ' + i);
//     i++;
// }

// let i = 100;

// do {
//     console.log('Number '+ i);
//     i++;
// }

// while (i<10);

// LOOP THROUGH ARRAY
const locations = ['서울', '부산', '경기도', '대구'];

// FOR
for (let i = 0; i < locations.length; i++){
    console.log(locations[i]);
}

// FOREACH
locations.forEach(function (location, index, array){
    console.log(`${index} : ${location}`);
    console.log(array);
});

// MAP
locations.map(function(location){
    console.log(location);
});