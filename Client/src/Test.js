// https://codepen.io/marcobiedermann/pen/xxeeXw
// https://codepen.io/marcobiedermann/details/ZEyxRmb
// https://codepen.io/Coding_Journey/pen/yWjWKd

const rectangle = {

  sideA: 10,
  sideB: 50,
  color: "red"
};

const calculateArea = rectangle => {
  const { sideA = 0, sideB = 0 } = rectangle;
  return sideA * sideB;
};

console.log(calculateArea(rectangle));
const animals = [
  { name: "dog", legs: 4 },
  { name: "cat", legs: 4 },
  { name: "humans", legs: 2 }
];

// we filtered and mapped through the names
const twoLeggedAnimals = animals
  .filter(animal => animal.legs === 2)
  .map(animal => animal.name);

const sensitiveData = {
  name: "Forus",
  lastName: "Essayeh",
  password: "super important",
  userId: 123456,
  bankBalance: "$100"
};

// we are basically extracting what we don't need in order to avoid any problems
const { password, bankBalance, ...userData } = sensitiveData;
console.log(userData);

const scoresByDay = [
  [100, 99, 98],
  [97, 96, 95],
  [94, 93, 92]
];

function average(arr) {
  // Calculating the sum using reduce functionality which is amazing
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
}

const scores = scoresByDay.reduce(
  (scores, current) => scores.concat(current),
  []
);
console.log(scores);
console.log(scores.flat());
console.log(average(scores));
console.log(average(scoresByDay.flat()));

const isAdmin = () => true;

// ✨
const userInformation = {
  firstName: "Tomasz",
  lastName: "Lakomy"
};

// TODO:
// if user is an admin , add a is_admin:true to the object , otherwise don't add anything

const userObject = {
  id: 123,
  ...userData,
  ...(isAdmin() ? { is_admin: true } : {})
};

const Human = {
  name: "fares",
  lastName: "essayeh",
  age: 38,
  country: "Poland"
};
// will seal The object so it longer can be touched
Object.seal(userObject);

console.log(userObject);

userObject.age++;
console.log(userObject);

userObject.city = "Poznan";

const values = [undefined, [], [1, 3], 2];

const flat = arr => {
  return arr.reduce((arr, record) => arr.concat(record), []);
};

console.log(values.flat());
console.log(flat(values));

const advancedFlat = (arr, mapFn) => {
  return arr.map(mapFn).reduce((arr, record) => arr.concat(record), []);
};

console.log(values.flatMap(n => n));
console.log(flat(values, n => n + ""));

const counts = [
  { am: 1, pm: 10, site: "a" },
  { am: 2, pm: 4, site: "b" },
  { am: 3, pm: 12, site: "a" },
  { am: 1, pm: 7, site: "b" }
];

console.log(counts.flatMap(count => [count.am, count.pm]));
//based on a condition
console.log(
  counts.flatMap(count => {
    return count.site === "a" ? [] : [count.am, count.pm];
  })
);
