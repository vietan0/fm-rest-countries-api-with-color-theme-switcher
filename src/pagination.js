const array = Array(25);
for (let i = 0; i < 25; i += 1) {
  array[i] = i;
}

const pages = [];
for (let i = 0; i < array.length; i += 5) {
  const smallArr = array.slice(i, i + 5);
  if (smallArr !== []) pages.push(smallArr);

  console.log(pages.indexOf(smallArr));
}

console.log(pages);
