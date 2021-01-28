let id = 6;

let users = [{
  id: 1,
  name: 'test',
  age: 18,
}, {
  id: 2,
  name: 'test 1',
  age: 12,
}, {
  id: 3,
  name: 'test 2',
  age: 16,
}, {
  id: 4,
  name: 'test 3',
  age: 22,
}, {
  id: 5,
  name: 'test 4',
  age: 20,
}];
// let name = prompt('Введите имя');
// let age = +prompt('Введите возраст');

// users.push({
//   id: id++,
//   name,
//   age,
// });

// let deleteIndex = +prompt('Введите index для удаления');
// let user = users.splice(deleteIndex, 1);
// console.log('Вы удалили пользователя: ', JSON.stringify(user, null, 2));

let str = users
  .filter(({age}) => age >= 18)
  .sort(({age}, {age: secondAge}) => age - secondAge)
  .map(({name, age}) => `${name} - ${age};`)
  .join('\n');

console.log(str);

let index = 0;
let intervalId = setInterval(() => {
  console.log('Я спам-бот!!!!!!'+index++);
}, 200);

setTimeout(() => {
  clearInterval(intervalId);
  console.log('Привет мир!');
}, 6000);