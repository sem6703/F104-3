let arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

let num;
do {
  num = +prompt('Введите число');
} while (isNaN(num))

for (let i = 0; i < num; i++) {
  if(i === 5) {
    break;
  }
  console.log(i);
}

