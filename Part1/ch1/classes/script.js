// class Person {
//     constructor(name, email, birthday){
//         this.name = name;
//         this.email = email;
//         this.birthday = new Date(birthday);
//     }

//     introduce() {
//         return `Hello my name is ${this.name}`;
//     }

//     // 클래스 함수 자체에 메서드를 설정
//     // 독립적인 것을 정의할 때 사용하고 사용할 때는 클래스 이름으로 사용
//     static multipleNumbers(x, y){
//         return x * y;
//     }
// }

// const john = new Person('john', 'john@abc.com', '10-3-98');
// console.log(john);

class Person{
    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    introduce(){
        return `Hello my name is ${this.name}`;        
    }
}

class Client extends Person{
    constructor(name, email, phone, address){
        super(name, email);
        
        this.phone = phone;
        this.address = address;
    }
}

const john = new Client('John', 'john@example.com', '010-0000-0000', '서울');
console.log(john.introduce());