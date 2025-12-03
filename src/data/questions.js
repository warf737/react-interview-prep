// Структура данных для всех вопросов
export const questionsData = {
  javascript: {
    title: "JavaScript (core)",
    questions: [
      {
        id: "js-1",
        question: "Отличия var, let, const. Что такое temporal dead zone.",
        answer: `
          <p><strong>var:</strong></p>
          <ul>
            <li>Функциональная область видимости (function scope)</li>
            <li>Поднимается (hoisting) с инициализацией undefined</li>
            <li>Можно переопределять</li>
            <li>Добавляет свойство в window объект</li>
          </ul>
          
          <p><strong>let:</strong></p>
          <ul>
            <li>Блочная область видимости (block scope)</li>
            <li>Поднимается, но не инициализируется (temporal dead zone)</li>
            <li>Нельзя переопределять в той же области видимости</li>
            <li>Не добавляет свойство в window</li>
          </ul>
          
          <p><strong>const:</strong></p>
          <ul>
            <li>Блочная область видимости</li>
            <li>Поднимается, но не инициализируется (temporal dead zone)</li>
            <li>Нельзя переопределять и переназначать</li>
            <li>Объект/массив можно мутировать, но нельзя переназначить ссылку</li>
          </ul>
          
          <p><strong>Temporal Dead Zone (TDZ):</strong> Период между началом выполнения области видимости и моментом объявления переменной. В это время переменная недоступна, попытка обращения вызовет ReferenceError.</p>
        `,
        code: `// Пример TDZ
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

// var не имеет TDZ
console.log(y); // undefined
var y = 5;

// const также имеет TDZ
console.log(z); // ReferenceError
const z = 10;`
      },
      {
        id: "js-2",
        question: "Как работает замыкание. Привести пример практического использования.",
        answer: `
          <p><strong>Замыкание (Closure)</strong> — это функция, которая имеет доступ к переменным из внешней области видимости даже после того, как внешняя функция завершила выполнение.</p>
          
          <p><strong>Как работает:</strong></p>
          <ul>
            <li>Внутренняя функция сохраняет ссылку на переменные внешней функции</li>
            <li>Эти переменные остаются в памяти, пока существует ссылка на внутреннюю функцию</li>
            <li>Каждое замыкание имеет свой собственный набор переменных</li>
          </ul>
          
          <p><strong>Практические примеры:</strong></p>
          <ul>
            <li>Создание приватных переменных</li>
            <li>Мемоизация и кэширование</li>
            <li>Функции-фабрики</li>
            <li>Обработчики событий с параметрами</li>
            <li>Модульный паттерн</li>
          </ul>
        `,
        code: `// Базовый пример
function outerFunction(x) {
  // Внешняя переменная
  return function innerFunction(y) {
    // Внутренняя функция имеет доступ к x
    return x + y;
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8

// Практический пример: приватные переменные
function createCounter() {
  let count = 0; // Приватная переменная
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2

// Пример: функция-фабрика
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15`
      },
      {
        id: "js-3",
        question: "Что такое область видимости и цепочка областей видимости.",
        answer: `
          <p><strong>Область видимости (Scope)</strong> — это контекст, в котором переменные и функции доступны.</p>
          
          <p><strong>Типы областей видимости:</strong></p>
          <ul>
            <li><strong>Глобальная:</strong> переменные доступны везде</li>
            <li><strong>Функциональная:</strong> переменные доступны только внутри функции (var)</li>
            <li><strong>Блочная:</strong> переменные доступны только внутри блока { } (let, const)</li>
          </ul>
          
          <p><strong>Цепочка областей видимости (Scope Chain):</strong></p>
          <p>При поиске переменной JavaScript движется по цепочке областей видимости от внутренней к внешней:</p>
          <ol>
            <li>Сначала ищет в текущей области видимости</li>
            <li>Затем во внешней области видимости</li>
            <li>Продолжает до глобальной области</li>
            <li>Если не найдено — ReferenceError</li>
          </ol>
        `,
        code: `// Пример цепочки областей видимости
const globalVar = "global";

function outerFunction() {
  const outerVar = "outer";
  
  function innerFunction() {
    const innerVar = "inner";
    
    // Доступ ко всем переменным
    console.log(innerVar);  // "inner"
    console.log(outerVar);  // "outer"
    console.log(globalVar); // "global"
  }
  
  innerFunction();
  // console.log(innerVar); // ReferenceError
}

outerFunction();

// Блочная область видимости
{
  let blockVar = "block";
  const blockConst = "block const";
}
// console.log(blockVar); // ReferenceError

// var имеет функциональную область видимости
function test() {
  if (true) {
    var functionScoped = "function";
  }
  console.log(functionScoped); // "function" - доступна
}`
      },
      {
        id: "js-4",
        question: "Как работает прототипное наследование. Что такое __proto__ и prototype.",
        answer: `
          <p><strong>Прототипное наследование</strong> — механизм, при котором объекты могут наследовать свойства и методы от других объектов через цепочку прототипов.</p>
          
          <p><strong>prototype:</strong></p>
          <ul>
            <li>Свойство функций-конструкторов</li>
            <li>Объект, который используется как прототип для всех экземпляров, созданных через new</li>
            <li>Доступен через Constructor.prototype</li>
          </ul>
          
          <p><strong>__proto__:</strong></p>
          <ul>
            <li>Свойство экземпляра, указывающее на его прототип</li>
            <li>Внутреннее свойство (не рекомендуется использовать напрямую)</li>
            <li>Лучше использовать Object.getPrototypeOf() и Object.setPrototypeOf()</li>
          </ul>
          
          <p><strong>Цепочка прототипов:</strong> При обращении к свойству JavaScript сначала ищет его в самом объекте, затем в его прототипе, затем в прототипе прототипа и так далее до Object.prototype.</p>
        `,
        code: `// Прототипное наследование
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Наследование прототипа
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return \`\${this.name} barks!\`;
};

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak()); // "Rex makes a sound"
console.log(dog.bark());  // "Rex barks!"

// Цепочка прототипов
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

// Современный подход с классами (синтаксический сахар)
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    return \`\${this.name} barks!\`;
  }
}`
      },
      {
        id: "js-5",
        question: "Разница между обычной функцией и стрелочной: контекст, arguments, конструктор.",
        answer: `
          <p><strong>Обычная функция:</strong></p>
          <ul>
            <li><strong>this:</strong> определяется в момент вызова (динамический контекст)</li>
            <li><strong>arguments:</strong> объект с аргументами функции</li>
            <li><strong>constructor:</strong> может быть использована как конструктор с new</li>
            <li><strong>hoisting:</strong> поднимается полностью</li>
            <li><strong>prototype:</strong> имеет свойство prototype</li>
          </ul>
          
          <p><strong>Стрелочная функция:</strong></p>
          <ul>
            <li><strong>this:</strong> берется из внешней области видимости (лексический контекст), не может быть изменен через bind/call/apply</li>
            <li><strong>arguments:</strong> не имеет, нужно использовать rest параметры</li>
            <li><strong>constructor:</strong> не может быть использована как конструктор</li>
            <li><strong>hoisting:</strong> не поднимается</li>
            <li><strong>prototype:</strong> не имеет свойства prototype</li>
          </ul>
        `,
        code: `// Контекст this
const obj = {
  name: "Object",
  
  regularFunction: function() {
    console.log(this.name); // "Object"
  },
  
  arrowFunction: () => {
    console.log(this.name); // undefined (this из глобальной области)
  },
  
  nested: function() {
    const inner = () => {
      console.log(this.name); // "Object" (this из внешней функции)
    };
    inner();
  }
};

obj.regularFunction(); // "Object"
obj.arrowFunction();   // undefined
obj.nested();          // "Object"

// arguments
function regular() {
  console.log(arguments); // Arguments(3) [1, 2, 3]
}

const arrow = (...args) => {
  console.log(args); // [1, 2, 3]
  // console.log(arguments); // ReferenceError
};

regular(1, 2, 3);
arrow(1, 2, 3);

// Конструктор
function RegularFunction(name) {
  this.name = name;
}
const instance1 = new RegularFunction("Test"); // OK

const ArrowFunction = (name) => {
  this.name = name;
};
// const instance2 = new ArrowFunction("Test"); // TypeError

// bind/call/apply
const obj2 = { name: "Bound" };
regular.call(obj2); // "Bound"
// arrow.call(obj2); // this не изменится`
      },
      {
        id: "js-6",
        question: "Как работает this в разных контекстах.",
        answer: `
          <p><strong>this</strong> — это ссылка на объект, в контексте которого выполняется функция. Значение <code>this</code> определяется способом вызова функции.</p>
          
          <p><strong>Правила определения this:</strong></p>
          <ol>
            <li><strong>Глобальный контекст:</strong> в браузере это window, в Node.js — global</li>
            <li><strong>Метод объекта:</strong> this указывает на объект, у которого вызван метод</li>
            <li><strong>Конструктор:</strong> this указывает на новый экземпляр</li>
            <li><strong>call/apply/bind:</strong> this явно задается первым аргументом</li>
            <li><strong>Стрелочная функция:</strong> this берется из внешней области видимости</li>
            <li><strong>Строгий режим:</strong> в функциях this может быть undefined</li>
          </ol>
        `,
        code: `// 1. Глобальный контекст
console.log(this); // window (в браузере)

// 2. Метод объекта
const obj = {
  name: "MyObject",
  getName: function() {
    return this.name;
  }
};
console.log(obj.getName()); // "MyObject"

// 3. Потеря контекста
const getName = obj.getName;
console.log(getName()); // undefined (this = window)

// 4. Конструктор
function Person(name) {
  this.name = name;
}
const person = new Person("John");
console.log(person.name); // "John"

// 5. call/apply/bind
function greet(greeting) {
  return \`\${greeting}, \${this.name}\`;
}

const user = { name: "Alice" };
console.log(greet.call(user, "Hello")); // "Hello, Alice"
console.log(greet.apply(user, ["Hi"])); // "Hi, Alice"

const boundGreet = greet.bind(user);
console.log(boundGreet("Hey")); // "Hey, Alice"

// 6. Стрелочная функция
const obj2 = {
  name: "Object",
  regular: function() {
    setTimeout(function() {
      console.log(this.name); // undefined
    }, 100);
  },
  arrow: function() {
    setTimeout(() => {
      console.log(this.name); // "Object"
    }, 100);
  }
};

// 7. Строгий режим
"use strict";
function test() {
  console.log(this); // undefined
}
test();`
      },
      {
        id: "js-7",
        question: "Что делает bind, call, apply. Как они реализуются.",
        answer: `
          <p><strong>call, apply, bind</strong> — методы для явного указания контекста <code>this</code> при вызове функции.</p>
          
          <p><strong>call:</strong></p>
          <ul>
            <li>Вызывает функцию с указанным this и аргументами, переданными по отдельности</li>
            <li>Синтаксис: func.call(thisArg, arg1, arg2, ...)</li>
          </ul>
          
          <p><strong>apply:</strong></p>
          <ul>
            <li>Вызывает функцию с указанным this и аргументами в виде массива</li>
            <li>Синтаксис: func.apply(thisArg, [arg1, arg2, ...])</li>
            <li>Полезен когда количество аргументов неизвестно</li>
          </ul>
          
          <p><strong>bind:</strong></p>
          <ul>
            <li>Создает новую функцию с привязанным this и, опционально, аргументами</li>
            <li>Не вызывает функцию сразу, возвращает новую функцию</li>
            <li>Синтаксис: func.bind(thisArg, arg1, arg2, ...)</li>
          </ul>
        `,
        code: `// Примеры использования
function introduce(greeting, punctuation) {
  return \`\${greeting}, я \${this.name}\${punctuation}\`;
}

const person1 = { name: "Анна" };
const person2 = { name: "Иван" };

// call
console.log(introduce.call(person1, "Привет", "!")); 
// "Привет, я Анна!"

// apply
console.log(introduce.apply(person2, ["Здравствуй", "."])); 
// "Здравствуй, я Иван."

// bind
const introduceAnna = introduce.bind(person1, "Привет");
console.log(introduceAnna("!")); // "Привет, я Анна!"

// Реализация call
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};

// Реализация apply
Function.prototype.myApply = function(context, args) {
  context = context || window;
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = args ? context[uniqueKey](...args) : context[uniqueKey]();
  delete context[uniqueKey];
  return result;
};

// Реализация bind
Function.prototype.myBind = function(context, ...bindArgs) {
  const fn = this;
  return function(...callArgs) {
    return fn.apply(context, [...bindArgs, ...callArgs]);
  };
};`
      },
      {
        id: "js-8",
        question: "Event loop: очередь microtasks и macrotasks.",
        answer: `
          <p><strong>Event Loop</strong> — механизм, который управляет выполнением асинхронного кода в JavaScript.</p>
          
          <p><strong>Очереди задач:</strong></p>
          <ul>
            <li><strong>Call Stack:</strong> стек вызовов синхронных функций</li>
            <li><strong>Macrotasks (Task Queue):</strong> setTimeout, setInterval, I/O операции, UI рендеринг</li>
            <li><strong>Microtasks (Microtask Queue):</strong> Promise.then/catch/finally, queueMicrotask, MutationObserver</li>
          </ul>
          
          <p><strong>Порядок выполнения:</strong></p>
          <ol>
            <li>Выполняется весь синхронный код из Call Stack</li>
            <li>Выполняются ВСЕ microtasks до полного опустошения очереди</li>
            <li>Выполняется ОДНА macrotask</li>
            <li>Снова все microtasks</li>
            <li>Повторяется цикл</li>
          </ol>
        `,
        code: `// Пример порядка выполнения
console.log("1. Синхронный код");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

queueMicrotask(() => {
  console.log("3.1. Microtask (queueMicrotask)");
});

console.log("2. Синхронный код");

// Вывод:
// 1. Синхронный код
// 2. Синхронный код
// 3. Microtask (Promise)
// 3.1. Microtask (queueMicrotask)
// 4. Macrotask (setTimeout)

// Более сложный пример
Promise.resolve().then(() => {
  console.log("Promise 1");
  Promise.resolve().then(() => {
    console.log("Promise 2");
  });
});

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => {
    console.log("Promise 3");
  });
}, 0);

// Вывод:
// Promise 1
// Promise 2
// Timeout 1
// Promise 3`
      },
      {
        id: "js-9",
        question: "Разница между синхронным и асинхронным кодом. Что такое промис и состояние промиса.",
        answer: `
          <p><strong>Синхронный код:</strong></p>
          <ul>
            <li>Выполняется последовательно, строка за строкой</li>
            <li>Блокирует выполнение до завершения операции</li>
            <li>Простой и предсказуемый</li>
          </ul>
          
          <p><strong>Асинхронный код:</strong></p>
          <ul>
            <li>Не блокирует выполнение</li>
            <li>Позволяет выполнять другие операции во время ожидания</li>
            <li>Использует колбэки, промисы, async/await</li>
          </ul>
          
          <p><strong>Промис (Promise):</strong></p>
          <p>Объект, представляющий результат асинхронной операции, которая может завершиться успешно или с ошибкой.</p>
          
          <p><strong>Состояния промиса:</strong></p>
          <ul>
            <li><strong>pending:</strong> начальное состояние, операция еще не завершена</li>
            <li><strong>fulfilled:</strong> операция успешно завершена, есть результат</li>
            <li><strong>rejected:</strong> операция завершилась с ошибкой</li>
          </ul>
          <p>Промис может перейти только из pending в fulfilled или rejected, обратный переход невозможен.</p>
        `,
        code: `// Синхронный код
console.log("1");
console.log("2");
console.log("3");
// Вывод: 1, 2, 3

// Асинхронный код с колбэками
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Вывод: 1, 3, 2

// Промис
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve("Успех!");
  } else {
    reject("Ошибка!");
  }
});

// Состояния промиса
console.log(promise); // Promise { <pending> }

promise
  .then(result => {
    console.log(result); // "Успех!"
    console.log(promise); // Promise { <fulfilled>: "Успех!" }
  })
  .catch(error => {
    console.log(error);
    console.log(promise); // Promise { <rejected>: "Ошибка!" }
  });

// Создание промисов
const resolvedPromise = Promise.resolve("Готово");
const rejectedPromise = Promise.reject("Ошибка");

// Цепочка промисов
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => x * 2)
  .then(x => console.log(x)) // 4
  .catch(error => console.error(error));`
      },
      {
        id: "js-10",
        question: "Как работает async/await. Что происходит при ошибке.",
        answer: `
          <p><strong>async/await</strong> — синтаксический сахар над промисами, позволяющий писать асинхронный код в синхронном стиле.</p>
          
          <p><strong>async функция:</strong></p>
          <ul>
            <li>Всегда возвращает Promise</li>
            <li>Позволяет использовать await внутри</li>
            <li>Если функция возвращает значение, оно оборачивается в resolved Promise</li>
            <li>Если выбрасывается ошибка, она оборачивается в rejected Promise</li>
          </ul>
          
          <p><strong>await:</strong></p>
          <ul>
            <li>Ожидает выполнения Promise</li>
            <li>Приостанавливает выполнение функции до разрешения Promise</li>
            <li>Возвращает результат resolved Promise</li>
            <li>Выбрасывает ошибку при rejected Promise</li>
          </ul>
          
          <p><strong>Обработка ошибок:</strong></p>
          <ul>
            <li>try/catch блок для перехвата ошибок</li>
            <li>Ошибка из await выбрасывается как обычное исключение</li>
            <li>Необработанная ошибка приводит к rejected Promise</li>
          </ul>
        `,
        code: `// Базовый пример
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

// Эквивалент с промисами
function fetchDataPromise() {
  return fetch('https://api.example.com/data')
    .then(response => response.json());
}

// Обработка ошибок
async function example() {
  try {
    const result = await someAsyncOperation();
    console.log(result);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

// Ошибка без обработки
async function failingFunction() {
  throw new Error("Что-то пошло не так");
}

failingFunction()
  .catch(error => console.error("Поймано:", error));

// Параллельное выполнение
async function parallel() {
  const [result1, result2] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2')
  ]);
  return { result1, result2 };
}

// Последовательное выполнение
async function sequential() {
  const result1 = await fetch('/api/1');
  const result2 = await fetch('/api/2');
  return { result1, result2 };
}

// async всегда возвращает Promise
async function getValue() {
  return 42;
}

getValue().then(value => console.log(value)); // 42`
      },
      {
        id: "js-11",
        question: "Что такое hoisting. Какие сущности поднимаются.",
        answer: `
          <p><strong>Hoisting (поднятие)</strong> — механизм JavaScript, при котором объявления переменных и функций "поднимаются" в начало своей области видимости перед выполнением кода.</p>
          
          <p><strong>Что поднимается:</strong></p>
          <ul>
            <li><strong>var:</strong> объявление поднимается, инициализация остается на месте (undefined)</li>
            <li><strong>function declaration:</strong> поднимается полностью (можно вызвать до объявления)</li>
            <li><strong>let/const:</strong> поднимаются, но не инициализируются (TDZ)</li>
            <li><strong>function expression:</strong> не поднимается (var поднимается как undefined)</li>
            <li><strong>class:</strong> не поднимается (ReferenceError при использовании до объявления)</li>
          </ul>
        `,
        code: `// var hoisting
console.log(x); // undefined (не ReferenceError!)
var x = 5;

// Эквивалентно:
var x;
console.log(x); // undefined
x = 5;

// function declaration hoisting
sayHello(); // "Hello!" - работает!

function sayHello() {
  console.log("Hello!");
}

// let/const hoisting (TDZ)
// console.log(y); // ReferenceError
let y = 10;

// function expression НЕ поднимается
// sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};

// class НЕ поднимается
// const obj = new MyClass(); // ReferenceError
class MyClass {}`
      },
      {
        id: "js-12",
        question: "Алгоритм работы Array.prototype.map/filter/reduce/sort. Особенности sort.",
        answer: `
          <p><strong>map:</strong> Создает новый массив, применяя функцию к каждому элементу.</p>
          <p><strong>filter:</strong> Создает новый массив с элементами, прошедшими проверку.</p>
          <p><strong>reduce:</strong> Преобразует массив в одно значение, применяя функцию аккумулятора.</p>
          <p><strong>sort:</strong> Сортирует массив на месте (мутирует исходный массив).</p>
          
          <p><strong>Особенности sort:</strong></p>
          <ul>
            <li>По умолчанию сортирует как строки (лексикографически)</li>
            <li>Мутирует исходный массив</li>
            <li>Возвращает ссылку на тот же массив</li>
            <li>Для числовой сортировки нужна функция сравнения</li>
            <li>Нестабильная сортировка (порядок равных элементов может меняться)</li>
          </ul>
        `,
        code: `// map
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8]

// filter
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]

// reduce
const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log(sum); // 10

// reduce с начальным значением
const product = numbers.reduce((acc, x) => acc * x, 1);
console.log(product); // 24

// sort - особенности
const arr = [10, 2, 1, 20];
arr.sort();
console.log(arr); // [1, 10, 2, 20] - лексикографическая сортировка!

// Правильная числовая сортировка
arr.sort((a, b) => a - b);
console.log(arr); // [1, 2, 10, 20]

// Сортировка объектов
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
];
users.sort((a, b) => a.age - b.age);
console.log(users); // Сортировка по возрасту

// Реализация map
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// Реализация filter
Array.prototype.myFilter = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// Реализация reduce
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;
  
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  
  return accumulator;
};`
      },
      {
        id: "js-13",
        question: "Разница между == и ===, правила приведения типов.",
        answer: `
          <p><strong>== (нестрогое равенство):</strong></p>
          <ul>
            <li>Выполняет приведение типов перед сравнением</li>
            <li>Может давать неожиданные результаты</li>
            <li>Сравнивает значения после приведения</li>
          </ul>
          
          <p><strong>=== (строгое равенство):</strong></p>
          <ul>
            <li>Не выполняет приведение типов</li>
            <li>Сравнивает и тип, и значение</li>
            <li>Рекомендуется использовать всегда</li>
          </ul>
          
          <p><strong>Правила приведения типов (==):</strong></p>
          <ul>
            <li>Если типы одинаковы — сравнивает значения</li>
            <li>null == undefined → true</li>
            <li>Числа и строки: строка преобразуется в число</li>
            <li>Булевы значения преобразуются в числа (true → 1, false → 0)</li>
            <li>Объекты преобразуются в примитивы через valueOf/toString</li>
          </ul>
        `,
        code: `// Строгое равенство ===
console.log(5 === 5);        // true
console.log(5 === "5");      // false (разные типы)
console.log(null === undefined); // false

// Нестрогое равенство ==
console.log(5 == 5);         // true
console.log(5 == "5");       // true (приведение типов)
console.log(null == undefined); // true

// Неожиданные результаты ==
console.log([] == false);    // true
console.log([] == 0);        // true
console.log("" == 0);        // true
console.log("" == false);    // true
console.log(null == 0);      // false
console.log(undefined == 0); // false

// Сравнение объектов
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 == obj2);   // false (разные ссылки)
console.log(obj1 === obj2);  // false
console.log(obj1 == obj3);   // true (одна ссылка)
console.log(obj1 === obj3);  // true

// NaN
console.log(NaN == NaN);     // false
console.log(NaN === NaN);   // false
console.log(Object.is(NaN, NaN)); // true

// Правила приведения
console.log(true == 1);      // true
console.log(false == 0);     // true
console.log("" == 0);        // true
console.log(" " == 0);       // true
console.log("0" == 0);       // true`
      },
      {
        id: "js-14",
        question: "Как работает делегирование событий.",
        answer: `
          <p><strong>Делегирование событий</strong> — паттерн, при котором обработчик события привязывается к родительскому элементу, а не к каждому дочернему элементу отдельно.</p>
          
          <p><strong>Принцип работы:</strong></p>
          <ul>
            <li>Событие "всплывает" (bubbling) от целевого элемента к родителям</li>
            <li>Обработчик на родителе перехватывает событие</li>
            <li>Определяется целевой элемент через event.target</li>
            <li>Выполняется нужная логика для конкретного элемента</li>
          </ul>
          
          <p><strong>Преимущества:</strong></p>
          <ul>
            <li>Меньше обработчиков (лучше производительность)</li>
            <li>Работает с динамически добавленными элементами</li>
            <li>Меньше потребление памяти</li>
            <li>Упрощает управление событиями</li>
          </ul>
        `,
        code: `// Без делегирования (плохо)
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', function() {
    console.log('Clicked:', this.textContent);
  });
});
// Не работает для новых кнопок!

// С делегированием (хорошо)
document.getElementById('container').addEventListener('click', function(event) {
  // Проверяем, что клик был по кнопке
  if (event.target.classList.contains('button')) {
    console.log('Clicked:', event.target.textContent);
  }
});
// Работает для всех кнопок, включая новые!

// Пример с таблицей
document.querySelector('table').addEventListener('click', function(event) {
  const row = event.target.closest('tr');
  if (row) {
    console.log('Row clicked:', row);
  }
});

// Пример с формой
document.querySelector('form').addEventListener('change', function(event) {
  if (event.target.type === 'checkbox') {
    console.log('Checkbox changed:', event.target.checked);
  }
});

// event.target vs event.currentTarget
document.getElementById('parent').addEventListener('click', function(event) {
  console.log('target:', event.target);        // Элемент, на который кликнули
  console.log('currentTarget:', event.currentTarget); // Элемент с обработчиком (parent)
});`
      },
      {
        id: "js-15",
        question: "Почему мутация объекта влияет на другие переменные ссылающиеся на него. Отличие deep vs shallow copy.",
        answer: `
          <p><strong>Причина:</strong> В JavaScript объекты и массивы передаются по ссылке, а не по значению. Переменные хранят ссылку на объект в памяти, а не сам объект.</p>
          
          <p><strong>Shallow copy (поверхностная копия):</strong></p>
          <ul>
            <li>Копирует только первый уровень свойств</li>
            <li>Вложенные объекты/массивы остаются ссылками</li>
            <li>Методы: Object.assign(), spread operator, Array.slice()</li>
          </ul>
          
          <p><strong>Deep copy (глубокая копия):</strong></p>
          <ul>
            <li>Создает полностью независимую копию со всеми уровнями вложенности</li>
            <li>Все вложенные объекты также копируются</li>
            <li>Методы: JSON.parse(JSON.stringify()), structuredClone(), библиотеки (lodash)</li>
          </ul>
        `,
        code: `// Передача по ссылке
const obj1 = { a: 1, b: 2 };
const obj2 = obj1; // obj2 ссылается на тот же объект
obj2.a = 10;
console.log(obj1.a); // 10 - изменился исходный объект!

// Shallow copy
const original = { a: 1, b: { c: 2 } };
const shallow1 = Object.assign({}, original);
const shallow2 = { ...original };

shallow1.a = 10;
console.log(original.a); // 1 - не изменился

shallow1.b.c = 20;
console.log(original.b.c); // 20 - изменился! (ссылка на вложенный объект)

// Deep copy - JSON метод (ограничения)
const deep1 = JSON.parse(JSON.stringify(original));
deep1.b.c = 30;
console.log(original.b.c); // 20 - не изменился

// Ограничения JSON метода:
// - Не работает с функциями
// - Не работает с undefined
// - Не работает с Symbol
// - Не работает с Date (станет строкой)
// - Не работает с циклическими ссылками

// Deep copy - structuredClone (современный способ)
const deep2 = structuredClone(original);
deep2.b.c = 40;
console.log(original.b.c); // 20 - не изменился

// Ручная реализация deep copy
function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepCopy(item));
  }
  
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}`
      },
      {
        id: "js-16",
        question: "Что такое garbage collector. Примеры memory leaks.",
        answer: `
          <p><strong>Garbage Collector (сборщик мусора)</strong> — механизм автоматического управления памятью, который освобождает память от объектов, которые больше не используются.</p>
          
          <p><strong>Как работает:</strong></p>
          <ul>
            <li>Отслеживает объекты, на которые есть ссылки</li>
            <li>Периодически проверяет недостижимые объекты</li>
            <li>Освобождает память от недостижимых объектов</li>
            <li>Использует алгоритм mark-and-sweep</li>
          </ul>
          
          <p><strong>Memory leaks (утечки памяти):</strong></p>
          <ul>
            <li>Глобальные переменные</li>
            <li>Замыкания, сохраняющие большие объекты</li>
            <li>Неудаленные обработчики событий</li>
            <li>Таймеры (setInterval, setTimeout)</li>
            <li>Циклические ссылки (редко в современных браузерах)</li>
            <li>DOM ссылки на удаленные элементы</li>
          </ul>
        `,
        code: `// 1. Глобальные переменные
window.hugeData = new Array(1000000).fill(0); // Утечка!

// 2. Замыкания
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  
  return function() {
    // largeData остается в памяти, даже если не используется
    console.log('Handler');
  };
}

// 3. Неудаленные обработчики
const button = document.getElementById('button');
button.addEventListener('click', handler);
// Если элемент удаляется, но обработчик не удален - утечка!

// Правильно:
button.removeEventListener('click', handler);
// Или использовать AbortController

// 4. Таймеры
const intervalId = setInterval(() => {
  // что-то делаем
}, 1000);
// Если не очистить - утечка!
clearInterval(intervalId);

// 5. DOM ссылки
const elements = [];
function addElement() {
  const div = document.createElement('div');
  elements.push(div); // Сохраняем ссылку
  document.body.appendChild(div);
}

function removeElement() {
  const div = elements.pop();
  document.body.removeChild(div);
  // div все еще в памяти через массив elements!
}

// 6. Циклические ссылки (старая проблема)
function createCircular() {
  const obj1 = {};
  const obj2 = {};
  obj1.ref = obj2;
  obj2.ref = obj1;
  return obj1;
}
// Современные GC справляются с этим

// Как избежать утечек:
// - Использовать WeakMap/WeakSet для слабых ссылок
// - Очищать обработчики событий
// - Очищать таймеры
// - Избегать глобальных переменных
// - Использовать dev tools для поиска утечек`
      },
      {
        id: "js-17",
        question: "Что такое курсоры в DOM и как работает reflow/ repaint.",
        answer: `
          <p><strong>Reflow (перекомпоновка):</strong> Процесс пересчета позиций и размеров элементов в DOM дереве.</p>
          <p><strong>Repaint (перерисовка):</strong> Процесс отрисовки визуальных изменений элементов без изменения их позиции.</p>
          
          <p><strong>Что вызывает reflow:</strong></p>
          <ul>
            <li>Изменение размеров, позиции элементов</li>
            <li>Добавление/удаление элементов</li>
            <li>Изменение содержимого (текста)</li>
            <li>Изменение стилей (width, height, margin, padding, display)</li>
            <li>Чтение layout свойств (offsetWidth, scrollHeight, getComputedStyle)</li>
          </ul>
          
          <p><strong>Что вызывает только repaint:</strong></p>
          <ul>
            <li>Изменение цвета, фона, видимости</li>
            <li>Изменение outline, border-color</li>
            <li>Свойства, не влияющие на layout</li>
          </ul>
          
          <p><strong>Оптимизация:</strong></p>
          <ul>
            <li>Группировать изменения DOM</li>
            <li>Использовать DocumentFragment</li>
            <li>Кэшировать значения layout свойств</li>
            <li>Использовать transform и opacity (GPU ускорение)</li>
            <li>Избегать чтения layout свойств в циклах</li>
          </ul>
        `,
        code: `// Плохо: множественные reflow
const element = document.getElementById('myDiv');
element.style.width = '100px';  // reflow
element.style.height = '100px'; // reflow
element.style.margin = '10px';  // reflow

// Хорошо: одно изменение
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
// Или использовать класс
element.className = 'new-style';

// Плохо: чтение layout в цикле
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = elements[i].offsetWidth + 10 + 'px'; // reflow на каждой итерации!
}

// Хорошо: кэширование
const widths = elements.map(el => el.offsetWidth); // один reflow
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';
});

// Использование DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // один reflow вместо 1000

// GPU ускорение (только repaint, нет reflow)
element.style.transform = 'translateX(100px)';
element.style.opacity = '0.5';

// Batch чтения и записи
// Сначала все чтения
const width = element.offsetWidth;
const height = element.offsetHeight;
const computed = getComputedStyle(element);

// Потом все записи
element.style.width = width + 10 + 'px';
element.style.height = height + 10 + 'px';`
      },
      {
        id: "js-18",
        question: "Как работает модульная система ES-модулей. В чём отличие от CommonJS.",
        answer: `
          <p><strong>ES Modules (ESM):</strong> Стандартная система модулей JavaScript, встроенная в язык.</p>
          
          <p><strong>Особенности ESM:</strong></p>
          <ul>
            <li>Статический импорт/экспорт (на этапе компиляции)</li>
            <li>Строгий режим по умолчанию</li>
            <li>Поддержка tree-shaking</li>
            <li>Асинхронная загрузка</li>
            <li>Циклические зависимости обрабатываются корректно</li>
            <li>Синтаксис: import/export</li>
          </ul>
          
          <p><strong>CommonJS:</strong> Система модулей Node.js.</p>
          
          <p><strong>Особенности CommonJS:</strong></p>
          <ul>
            <li>Динамический импорт/экспорт (в рантайме)</li>
            <li>Синхронная загрузка</li>
            <li>Экспорт через module.exports, импорт через require()</li>
            <li>Копирование значений при экспорте примитивов</li>
            <li>Кэширование модулей</li>
          </ul>
        `,
        code: `// ES Modules
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add, subtract } from './math.js';
import * as math from './math.js';

// Динамический импорт (ESM)
const module = await import('./math.js');
const { add } = module;

// CommonJS
// math.js
exports.add = (a, b) => a + b;
module.exports.subtract = (a, b) => a - b;
module.exports = function multiply(a, b) {
  return a * b;
};

// main.js
const math = require('./math.js');
const { add } = require('./math.js');

// Отличия:
// 1. ESM - статический, CommonJS - динамический
// ESM: import должен быть на верхнем уровне
// CommonJS: require может быть в любом месте

// 2. ESM - асинхронный, CommonJS - синхронный
// ESM загружается асинхронно
// CommonJS загружается синхронно

// 3. ESM - ссылки, CommonJS - копии (для объектов)
// ESM: экспортированные объекты - ссылки
// CommonJS: module.exports создает копию

// 4. Tree-shaking
// ESM поддерживает, CommonJS - нет

// 5. Циклические зависимости
// ESM обрабатывает лучше`
      },
      {
        id: "js-19",
        question: "Что такое генераторы и для чего они нужны.",
        answer: `
          <p><strong>Генераторы</strong> — специальные функции, которые могут приостанавливать свое выполнение и возобновлять его позже, возвращая несколько значений.</p>
          
          <p><strong>Синтаксис:</strong> Функция с символом * и использованием yield.</p>
          
          <p><strong>Применение:</strong></p>
          <ul>
            <li>Ленивые вычисления (lazy evaluation)</li>
            <li>Работа с бесконечными последовательностями</li>
            <li>Реализация итераторов</li>
            <li>Асинхронное программирование (до async/await)</li>
            <li>Управление потоком выполнения</li>
          </ul>
          
          <p><strong>Особенности:</strong></p>
          <ul>
            <li>Возвращают объект-итератор</li>
            <li>Выполнение приостанавливается на yield</li>
            <li>Возобновляется при вызове next()</li>
            <li>Могут принимать значения через next(value)</li>
            <li>Поддерживают yield* для делегирования</li>
          </ul>
        `,
        code: `// Базовый генератор
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Использование в цикле
for (const num of numberGenerator()) {
  console.log(num); // 1, 2, 3
}

// Бесконечный генератор
function* infiniteNumbers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const inf = infiniteNumbers();
console.log(inf.next().value); // 0
console.log(inf.next().value); // 1

// Генератор с параметрами
function* generatorWithParams() {
  const x = yield 'first';
  const y = yield x + 1;
  return y + 2;
}

const gen2 = generatorWithParams();
console.log(gen2.next());    // { value: 'first', done: false }
console.log(gen2.next(10));  // { value: 11, done: false } (x = 10)
console.log(gen2.next(20));  // { value: 22, done: true } (y = 20)

// Делегирование (yield*)
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1();
  yield 3;
}

for (const val of gen2()) {
  console.log(val); // 1, 2, 3
}

// Практический пример: Fibonacci
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3`
      },
      {
        id: "js-20",
        question: "Как работает WeakMap / WeakSet и почему они не перечисляемые.",
        answer: `
          <p><strong>WeakMap:</strong> Коллекция пар ключ-значение, где ключи должны быть объектами, и ссылки на ключи слабые.</p>
          <p><strong>WeakSet:</strong> Коллекция объектов со слабыми ссылками.</p>
          
          <p><strong>Особенности:</strong></p>
          <ul>
            <li>Ключи/значения могут быть только объектами (не примитивами)</li>
            <li>Слабые ссылки — объект может быть удален GC, если нет других ссылок</li>
            <li>Не перечисляемые (нет методов keys(), values(), entries(), forEach())</li>
            <li>Нет свойства size</li>
            <li>Не итерируемые</li>
            <li>Автоматическая очистка при удалении объекта</li>
          </ul>
          
          <p><strong>Применение:</strong></p>
          <ul>
            <li>Хранение приватных данных объектов</li>
            <li>Кэширование с автоматической очисткой</li>
            <li>Отслеживание объектов без предотвращения их удаления</li>
            <li>Метаданные объектов</li>
          </ul>
        `,
        code: `// WeakMap
const weakMap = new WeakMap();
const obj1 = {};
const obj2 = {};

weakMap.set(obj1, "data1");
weakMap.set(obj2, "data2");

console.log(weakMap.get(obj1)); // "data1"

// Когда obj1 удаляется, запись автоматически удаляется из WeakMap
obj1 = null; // GC может удалить obj1 и запись из WeakMap

// WeakMap не перечисляемый
// weakMap.keys(); // TypeError
// weakMap.size; // undefined
// for (let key of weakMap) {} // TypeError

// WeakSet
const weakSet = new WeakSet();
const obj = {};

weakSet.add(obj);
console.log(weakSet.has(obj)); // true

// Практический пример: приватные данные
const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
    privateData.set(this, { password: "secret" });
  }
  
  getPassword() {
    return privateData.get(this).password;
  }
}

const user = new User("John");
console.log(user.getPassword()); // "secret"
// privateData недоступна извне

// Пример: кэширование с автоматической очисткой
const cache = new WeakMap();

function getExpensiveData(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  
  const data = expensiveCalculation(obj);
  cache.set(obj, data);
  return data;
}

// Когда объект удаляется, кэш автоматически очищается

// Сравнение с Map/Set
const map = new Map();
const set = new Set();
const obj = {};

map.set(obj, "value");
set.add(obj);

// Map/Set сохраняют сильные ссылки
obj = null; // объект НЕ удалится, т.к. есть ссылки в Map/Set

// WeakMap/WeakSet сохраняют слабые ссылки
const weakMap = new WeakMap();
weakMap.set(obj, "value");
obj = null; // объект может быть удален GC, запись исчезнет`
      }
    ]
  },
  typescript: {
    title: "TypeScript",
    questions: [
      {
        id: "ts-1",
        question: "Для чего нужен TypeScript и что он НЕ делает (не выполняется в рантайме).",
        answer: `
          <p><strong>TypeScript</strong> — это надмножество JavaScript, добавляющее статическую типизацию.</p>
          
          <p><strong>Для чего нужен:</strong></p>
          <ul>
            <li>Статическая проверка типов на этапе компиляции</li>
            <li>Улучшенная поддержка IDE (автодополнение, рефакторинг)</li>
            <li>Раннее обнаружение ошибок</li>
            <li>Лучшая документация кода через типы</li>
            <li>Рефакторинг с большей уверенностью</li>
          </ul>
          
          <p><strong>Что TypeScript НЕ делает:</strong></p>
          <ul>
            <li><strong>Не выполняется в рантайме</strong> — компилируется в JavaScript</li>
            <li>Не добавляет функциональность в рантайм</li>
            <li>Не гарантирует отсутствие ошибок (только статический анализ)</li>
            <li>Типы удаляются при компиляции (type erasure)</li>
          </ul>
        `,
        code: `// TypeScript код
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}\`;
}

// После компиляции в JavaScript:
function greet(user) {
  return \`Hello, \${user.name}\`;
}
// Типы полностью удалены!

// TypeScript проверяет типы на этапе компиляции
const user = { name: "John", age: 30 };
greet(user); // OK

// const invalid = { name: "John" };
// greet(invalid); // Ошибка компиляции: Property 'age' is missing`
      },
      {
        id: "ts-2",
        question: "Что такое structural typing.",
        answer: `
          <p><strong>Structural typing (структурная типизация)</strong> — система типов, где совместимость типов определяется их структурой, а не явным объявлением.</p>
          
          <p><strong>Принцип:</strong> Если объект имеет все необходимые свойства с правильными типами, он совместим с типом, даже если не был явно объявлен как таковой.</p>
          
          <p><strong>Отличие от nominal typing:</strong> В номинальной типизации (Java, C#) типы должны быть явно связаны через наследование или реализацию интерфейса.</p>
        `,
        code: `// Пример structural typing
interface Point {
  x: number;
  y: number;
}

function printPoint(point: Point) {
  console.log(\`(\${point.x}, \${point.y})\`);
}

// Объект с такой же структурой совместим
const myPoint = { x: 10, y: 20 };
printPoint(myPoint); // OK

// Даже если тип не объявлен явно
const anotherPoint = { x: 5, y: 15, z: 25 };
printPoint(anotherPoint); // OK (лишние свойства игнорируются)

// Но недостающие свойства вызовут ошибку
// const invalid = { x: 10 };
// printPoint(invalid); // Error: Property 'y' is missing

// Duck typing: "Если это ходит как утка и крякает как утка..."
interface Duck {
  walk: () => void;
  quack: () => void;
}

function makeDuckWalk(duck: Duck) {
  duck.walk();
}

const dog = {
  walk: () => console.log("Walking"),
  quack: () => console.log("Quack")
};

makeDuckWalk(dog); // OK - структура совпадает!`
      },
      {
        id: "ts-3",
        question: "Отличие interface от type.",
        answer: `
          <p><strong>interface:</strong></p>
          <ul>
            <li>Может быть расширен (extends) и объединен (declaration merging)</li>
            <li>Поддерживает только объектные типы</li>
            <li>Может быть реализован классом (implements)</li>
            <li>Более подходит для описания контрактов объектов</li>
          </ul>
          
          <p><strong>type:</strong></p>
          <ul>
            <li>Может представлять примитивы, union, intersection, tuple</li>
            <li>Не поддерживает declaration merging</li>
            <li>Более гибкий для сложных типов</li>
            <li>Может использовать mapped types и условные типы</li>
          </ul>
        `,
        code: `// interface
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: string;
}

// Declaration merging
interface Config {
  api: string;
}
interface Config {
  timeout: number;
}
// Config теперь имеет оба свойства

// type
type User = {
  name: string;
  age: number;
};

type Admin = User & {
  role: string;
};

// type может быть union
type Status = 'pending' | 'success' | 'error';

// type может быть примитивом
type ID = string | number;

// type с mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};`
      },
      {
        id: "ts-4",
        question: "Что такое дженерики. Примеры использования.",
        answer: `
          <p><strong>Дженерики (Generics)</strong> — механизм создания переиспользуемых компонентов, работающих с разными типами данных.</p>
          
          <p><strong>Преимущества:</strong></p>
          <ul>
            <li>Переиспользование кода</li>
            <li>Типобезопасность</li>
            <li>Устранение необходимости в any</li>
            <li>Лучшая поддержка IDE</li>
          </ul>
        `,
        code: `// Базовый пример
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");

// Множественные параметры
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Ограничения (constraints)
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Дженерики в классах
class Box<T> {
  private value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("hello");

// Дженерики в интерфейсах
interface Repository<T> {
  findById(id: string): T | null;
  save(entity: T): void;
}

// Utility types с дженериками
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};`
      },
      {
        id: "ts-5",
        question: "Что такое utility types (Partial, Required, Omit, Pick, Record).",
        answer: `
          <p><strong>Utility Types</strong> — встроенные типы TypeScript для трансформации других типов.</p>
          
          <p><strong>Partial&lt;T&gt;:</strong> Делает все свойства опциональными.</p>
          <p><strong>Required&lt;T&gt;:</strong> Делает все свойства обязательными.</p>
          <p><strong>Pick&lt;T, K&gt;:</strong> Выбирает определенные свойства из типа.</p>
          <p><strong>Omit&lt;T, K&gt;:</strong> Исключает определенные свойства из типа.</p>
          <p><strong>Record&lt;K, T&gt;:</strong> Создает тип объекта с ключами K и значениями T.</p>
        `,
        code: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Partial - все свойства опциональны
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Required - все свойства обязательны
type RequiredUser = Required<User>;
// { id: number; name: string; email: string; age: number; }

// Pick - выбираем свойства
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// Omit - исключаем свойства
type UserWithoutId = Omit<User, 'id'>;
// { name: string; email: string; age?: number; }

// Record - создаем тип объекта
type UserRoles = Record<string, boolean>;
// { [key: string]: boolean; }

type UserMap = Record<number, User>;
// { [key: number]: User; }

// Комбинации
type CreateUserDto = Omit<User, 'id'>;
type UpdateUserDto = Partial<Omit<User, 'id'>>;`
      },
      {
        id: "ts-6",
        question: "Что такое unknown vs any.",
        answer: `
          <p><strong>any:</strong> Отключает проверку типов. Можно делать что угодно без ошибок компиляции.</p>
          <p><strong>unknown:</strong> Типобезопасная альтернатива any. Требует проверки типа перед использованием.</p>
          
          <p><strong>Разница:</strong></p>
          <ul>
            <li>any — можно использовать сразу, unknown — нужно сузить тип</li>
            <li>any отключает проверку типов, unknown сохраняет ее</li>
            <li>unknown более безопасен, рекомендуется использовать вместо any</li>
          </ul>
        `,
        code: `// any - можно все
let value: any = "hello";
value.foo.bar; // OK (но ошибка в рантайме!)
value(); // OK
value = 42; // OK

// unknown - нужно проверить
let value2: unknown = "hello";
// value2.foo; // Error!
// value2(); // Error!

// Type narrowing для unknown
if (typeof value2 === "string") {
  console.log(value2.toUpperCase()); // OK
}

if (typeof value2 === "function") {
  value2(); // OK
}

// Type guard функция
function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(value2)) {
  console.log(value2.toUpperCase()); // OK
}

// Пример с API ответом
async function fetchData(): Promise<unknown> {
  const response = await fetch('/api/data');
  return response.json();
}

const data = await fetchData();
// data.anything - Error!

if (typeof data === 'object' && data !== null && 'name' in data) {
  console.log(data.name); // OK после проверки
}`
      },
      {
        id: "ts-7",
        question: "Что такое type narrowing.",
        answer: `
          <p><strong>Type Narrowing (сужение типов)</strong> — процесс, при котором TypeScript определяет более конкретный тип значения на основе проверок в коде.</p>
          
          <p><strong>Способы сужения:</strong></p>
          <ul>
            <li>typeof проверки</li>
            <li>instanceof проверки</li>
            <li>Проверки на null/undefined</li>
            <li>Проверки свойств (in operator)</li>
            <li>Type guard функции</li>
            <li>Discriminated unions</li>
          </ul>
        `,
        code: `// typeof narrowing
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript знает, что value - string
    console.log(value.toUpperCase());
  } else {
    // TypeScript знает, что value - number
    console.log(value.toFixed(2));
  }
}

// instanceof narrowing
class Dog {
  bark() {}
}
class Cat {
  meow() {}
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // OK
  } else {
    animal.meow(); // OK
  }
}

// null/undefined narrowing
function process(str: string | null | undefined) {
  if (str != null) { // или str !== null && str !== undefined
    console.log(str.length); // OK
  }
}

// in operator
interface Dog {
  bark: () => void;
}
interface Cat {
  meow: () => void;
}

function makeSound(animal: Dog | Cat) {
  if ('bark' in animal) {
    animal.bark(); // OK
  } else {
    animal.meow(); // OK
  }
}

// Type guard функция
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // OK
  }
}`
      },
      {
        id: "ts-8",
        question: "Что такое discriminated unions.",
        answer: `
          <p><strong>Discriminated Union (размеченное объединение)</strong> — паттерн TypeScript, где каждый вариант union имеет общее свойство-дискриминатор, позволяющее TypeScript точно определить тип.</p>
          
          <p><strong>Преимущества:</strong></p>
          <ul>
            <li>Точное определение типа в каждом случае</li>
            <li>Автодополнение для специфичных свойств</li>
            <li>Ошибки компиляции при неполной обработке случаев</li>
          </ul>
        `,
        code: `// Базовый пример
type Success = {
  status: 'success';
  data: string;
};

type Error = {
  status: 'error';
  message: string;
};

type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === 'success') {
    // TypeScript знает, что это Success
    console.log(result.data); // OK
    // console.log(result.message); // Error!
  } else {
    // TypeScript знает, что это Error
    console.log(result.message); // OK
    // console.log(result.data); // Error!
  }
}

// Более сложный пример
type Loading = {
  type: 'loading';
};

type Loaded = {
  type: 'loaded';
  data: User[];
};

type Failed = {
  type: 'failed';
  error: string;
};

type State = Loading | Loaded | Failed;

function render(state: State) {
  switch (state.type) {
    case 'loading':
      return 'Loading...';
    case 'loaded':
      return state.data.map(u => u.name).join(', '); // OK
    case 'failed':
      return \`Error: \${state.error}\`; // OK
    default:
      const _exhaustive: never = state; // Проверка полноты
      return _exhaustive;
  }
}`
      },
      {
        id: "ts-9",
        question: "Что такое never и в каких ситуациях используется.",
        answer: `
          <p><strong>never</strong> — тип, представляющий значения, которые никогда не произойдут.</p>
          
          <p><strong>Использование:</strong></p>
          <ul>
            <li>Функции, которые никогда не возвращают значение (throw, бесконечный цикл)</li>
            <li>Исключение случаев в exhaustive checks</li>
            <li>Типы, которые не могут существовать</li>
            <li>Удаление типов из union (Exclude)</li>
          </ul>
        `,
        code: `// Функция, которая никогда не возвращает
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // бесконечный цикл
  }
}

// Exhaustive check
type Status = 'pending' | 'success' | 'error';

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      return 'Waiting...';
    case 'success':
      return 'Done!';
    case 'error':
      return 'Failed!';
    default:
      const _exhaustive: never = status; // Ошибка, если добавить новый case
      return _exhaustive;
  }
}

// Удаление из union
type Exclude<T, U> = T extends U ? never : T;
type NonNullable<T> = T extends null | undefined ? never : T;

// Тип, который не может существовать
type Impossible = string & number; // never

// Массив, который никогда не может быть заполнен
const empty: never[] = [];
// empty.push(1); // Error!`
      },
      {
        id: "ts-10",
        question: "Как работает типизация функций: overloads, rest-параметры.",
        answer: `
          <p><strong>Function Overloads:</strong> Определение нескольких сигнатур для одной функции.</p>
          <p><strong>Rest Parameters:</strong> Параметры, принимающие неограниченное количество аргументов.</p>
        `,
        code: `// Function overloads
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}

add(1, 2); // number
add("a", "b"); // string

// Более сложный пример
interface Options {
  timeout?: number;
  retries?: number;
}

function request(url: string): Promise<Response>;
function request(url: string, options: Options): Promise<Response>;
function request(url: string, options?: Options): Promise<Response> {
  // реализация
  return fetch(url);
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15

// Типизация rest параметров
function greet(greeting: string, ...names: string[]): string {
  return \`\${greeting}, \${names.join(', ')}!\`;
}

greet("Hello", "John", "Jane"); // "Hello, John, Jane!"

// Rest с tuple types
function tuple<T extends any[]>(...args: T): T {
  return args;
}

const t = tuple(1, "hello", true); // [number, string, boolean]`
      },
      {
        id: "ts-11",
        question: "Как типизировать промисы и async-функции.",
        answer: `
          <p><strong>Промисы:</strong> Promise&lt;T&gt;, где T — тип значения, которое промис разрешает.</p>
          <p><strong>Async функции:</strong> Всегда возвращают Promise&lt;T&gt;.</p>
        `,
        code: `// Типизация Promise
const promise: Promise<string> = new Promise((resolve) => {
  resolve("Hello");
});

// Promise с reject
const promiseWithError: Promise<string> = new Promise((resolve, reject) => {
  if (Math.random() > 0.5) {
    resolve("Success");
  } else {
    reject(new Error("Failed"));
  }
});

// Async функции
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

// Типизация fetch
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

const user = await fetchData<User>('/api/user/1');

// Обработка ошибок
async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return null;
  }
}

// Promise.all типизация
const results = await Promise.all([
  fetchData<User>('/api/user/1'),
  fetchData<Post[]>('/api/posts'),
  fetchData<Comment[]>('/api/comments')
]);
// results: [User, Post[], Comment[]]`
      },
      {
        id: "ts-12",
        question: "Что такое mapped types.",
        answer: `
          <p><strong>Mapped Types</strong> — механизм создания новых типов на основе существующих, применяя трансформации к каждому свойству.</p>
          
          <p><strong>Синтаксис:</strong> { [K in keyof T]: ... }</p>
        `,
        code: `// Базовый mapped type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Применение
interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }

// Более сложные примеры
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// С фильтрацией ключей
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

// Изменение имен свойств
type Getters<T> = {
  [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};

// Условные mapped types
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];`
      },
      {
        id: "ts-13",
        question: "Что такое keyof и индексные типы.",
        answer: `
          <p><strong>keyof:</strong> Оператор, возвращающий union всех ключей типа.</p>
          <p><strong>Индексные типы:</strong> Доступ к типу свойства по ключу через T[K].</p>
        `,
        code: `// keyof
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

// Использование keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "John", email: "john@example.com" };
const name = getProperty(user, "name"); // string
// const invalid = getProperty(user, "age"); // Error!

// Индексные типы
type UserProperty = User[keyof User]; // number | string

// Mapped types с keyof
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Record с keyof
type UserRecord = Record<keyof User, string>;
// { id: string; name: string; email: string; }

// Условные типы с keyof
type NonNullablePropertyKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];`
      },
      {
        id: "ts-14",
        question: "Отличия readonly полей, const assertions (as const).",
        answer: `
          <p><strong>readonly:</strong> Модификатор, делающий свойство доступным только для чтения.</p>
          <p><strong>as const:</strong> Утверждение типа, делающее значение глубоко неизменяемым и сужающее тип до литерального.</p>
        `,
        code: `// readonly
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// config.apiUrl = "new"; // Error!

// readonly в классах
class Point {
  readonly x: number;
  readonly y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// as const
const arr = [1, 2, 3] as const;
// arr[0] = 4; // Error!
// arr.push(4); // Error!

// Тип сужается до литерального
const colors = ["red", "green", "blue"] as const;
// type: readonly ["red", "green", "blue"]

type Color = typeof colors[number]; // "red" | "green" | "blue"

// Объекты с as const
const config = {
  api: "https://api.example.com",
  timeout: 5000
} as const;

// config.api = "new"; // Error!
// Тип: { readonly api: "https://api.example.com"; readonly timeout: 5000; }

// Функции с as const
const fn = () => ({ x: 1, y: 2 }) as const;
// Возвращает: { readonly x: 1; readonly y: 2; }`
      },
      {
        id: "ts-15",
        question: "Как работает tsconfig: strict, target, module, paths.",
        answer: `
          <p><strong>tsconfig.json</strong> — файл конфигурации TypeScript проекта.</p>
          
          <p><strong>Основные опции:</strong></p>
          <ul>
            <li><strong>strict:</strong> Включает все строгие проверки типов</li>
            <li><strong>target:</strong> Версия JavaScript для компиляции</li>
            <li><strong>module:</strong> Система модулей (commonjs, esnext, etc.)</li>
            <li><strong>paths:</strong> Алиасы путей для импортов</li>
          </ul>
        `,
        code: `// tsconfig.json пример
{
  "compilerOptions": {
    "target": "ES2020",        // Версия JS
    "module": "ESNext",         // Система модулей
    "lib": ["ES2020", "DOM"],  // Библиотеки типов
    "strict": true,            // Строгий режим
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    
    // Paths для алиасов
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },
    
    // Другие опции
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

// Использование paths
// Вместо: import { Button } from '../../../components/Button'
import { Button } from '@components/Button';

// strict включает:
// - strictNullChecks
// - strictFunctionTypes
// - strictBindCallApply
// - strictPropertyInitialization
// - noImplicitThis
// - alwaysStrict`
      }
    ]
  },
  algorithms: {
    title: "Алгоритмы и структуры данных",
    questions: [
      {
        id: "alg-1",
        question: "Сложность алгоритмов (O(n), O(log n), O(n²)).",
        answer: `
          <p><strong>Big O notation</strong> — способ описания производительности алгоритма в худшем случае.</p>
          
          <p><strong>Основные сложности:</strong></p>
          <ul>
            <li><strong>O(1):</strong> Константная — доступ к элементу массива</li>
            <li><strong>O(log n):</strong> Логарифмическая — бинарный поиск</li>
            <li><strong>O(n):</strong> Линейная — проход по массиву</li>
            <li><strong>O(n log n):</strong> Линейно-логарифмическая — эффективная сортировка</li>
            <li><strong>O(n²):</strong> Квадратичная — вложенные циклы</li>
            <li><strong>O(2ⁿ):</strong> Экспоненциальная — рекурсивный Fibonacci</li>
          </ul>
        `,
        code: `// O(1) - константная
function getFirst(arr) {
  return arr[0];
}

// O(n) - линейная
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(log n) - логарифмическая
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// O(n²) - квадратичная
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// O(n log n) - линейно-логарифмическая
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}`
      },
      {
        id: "alg-2",
        question: "Отличия массива от связного списка.",
        answer: `
          <p><strong>Массив:</strong></p>
          <ul>
            <li>Элементы хранятся в непрерывной памяти</li>
            <li>Доступ по индексу: O(1)</li>
            <li>Вставка/удаление: O(n)</li>
            <li>Фиксированный размер (в некоторых языках)</li>
          </ul>
          
          <p><strong>Связный список:</strong></p>
          <ul>
            <li>Элементы связаны через указатели</li>
            <li>Доступ по индексу: O(n)</li>
            <li>Вставка/удаление: O(1) при известном узле</li>
            <li>Динамический размер</li>
          </ul>
        `,
        code: `// Реализация связного списка
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }
  
  find(index) {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }
}`
      },
      {
        id: "alg-3",
        question: "Что такое стек и очередь. Примеры использования.",
        answer: `
          <p><strong>Стек (LIFO):</strong> Последний пришел — первый ушел.</p>
          <p><strong>Очередь (FIFO):</strong> Первый пришел — первый ушел.</p>
        `,
        code: `// Стек
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) {
    this.items.push(item);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
}

// Очередь
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    return this.items.shift();
  }
}`
      }
    ]
  },
  react: {
    title: "React (core)",
    questions: [
      {
        id: "react-1",
        question: "Что такое виртуальный DOM и как работает reconciliation.",
        answer: `
          <p><strong>Виртуальный DOM:</strong> JavaScript представление реального DOM, хранящееся в памяти.</p>
          
          <p><strong>Reconciliation:</strong> Процесс сравнения старого и нового виртуального DOM и применения минимальных изменений к реальному DOM.</p>
          
          <p><strong>Алгоритм:</strong></p>
          <ul>
            <li>React создает новое дерево виртуального DOM</li>
            <li>Сравнивает с предыдущим (diffing)</li>
            <li>Определяет минимальный набор изменений</li>
            <li>Применяет изменения к реальному DOM (commit phase)</li>
          </ul>
        `,
        code: `// Виртуальный DOM - это объект
const virtualDOM = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: 'World' } }
    ]
  }
};

// React сравнивает деревья
// Старое: <div><h1>Hello</h1></div>
// Новое: <div><h1>Hi</h1></div>
// Изменение: только текст в h1`
      },
      {
        id: "react-2",
        question: "В чём отличие контролируемых и неконтролируемых компонентов.",
        answer: `
          <p><strong>Контролируемый компонент:</strong> Значение управляется React через state.</p>
          <p><strong>Неконтролируемый компонент:</strong> Значение управляется DOM напрямую через ref.</p>
        `,
        code: `// Контролируемый
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}

// Неконтролируемый
function UncontrolledInput() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return <input ref={inputRef} />;
}`
      },
      {
        id: "react-3",
        question: "Как работает useState, особенности асинхронности обновлений.",
        answer: `
          <p><strong>useState:</strong> Хук для управления состоянием компонента.</p>
          
          <p><strong>Особенности:</strong></p>
          <ul>
            <li>Обновления асинхронные и батчируются</li>
            <li>Несколько setState в одном обработчике объединяются</li>
            <li>Функциональное обновление для зависимых значений</li>
          </ul>
        `,
        code: `function Counter() {
  const [count, setCount] = useState(0);
  
  // Проблема: все setCount выполняются с одним значением
  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // count увеличится только на 1!
  };
  
  // Решение: функциональное обновление
  const handleClickCorrect = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // count увеличится на 3!
  };
  
  return <button onClick={handleClickCorrect}>{count}</button>;
}`
      }
    ]
  },
  reactTypescript: {
    title: "React + TypeScript",
    questions: [
      {
        id: "react-ts-1",
        question: "Как типизировать FC с пропсами.",
        answer: `
          <p>Типизация функциональных компонентов React с TypeScript.</p>
        `,
        code: `// Вариант 1: Прямая типизация
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// Вариант 2: React.FC
const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
};

// Вариант 3: С children
interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title }: LayoutProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}`
      }
    ]
  },
  stateManagement: {
    title: "State management",
    questions: [
      {
        id: "state-1",
        question: "Когда использовать Redux Toolkit.",
        answer: `
          <p><strong>Redux Toolkit</strong> используется когда:</p>
          <ul>
            <li>Глобальное состояние используется во многих компонентах</li>
            <li>Состояние обновляется сложным образом</li>
            <li>Нужна возможность time-travel debugging</li>
            <li>Большое приложение с множеством состояний</li>
          </ul>
        `,
        code: `// Redux Toolkit slice
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;`
      }
    ]
  },
  reactQuery: {
    title: "React Query",
    questions: [
      {
        id: "rq-1",
        question: "Как работает кэширование и автоматическая инвалидация.",
        answer: `
          <p><strong>React Query</strong> автоматически кэширует данные и управляет их актуальностью.</p>
        `,
        code: `import { useQuery, useQueryClient } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5000, // 5 секунд
    cacheTime: 10000 // 10 секунд
  });
  
  return <div>{data?.name}</div>;
}`
      }
    ]
  },
  routing: {
    title: "Routing",
    questions: [
      {
        id: "route-1",
        question: "Что нового в React Router v6.",
        answer: `
          <p><strong>Основные изменения React Router v6:</strong></p>
          <ul>
            <li>Новый API Routes вместо Switch</li>
            <li>Относительные пути и ссылки</li>
            <li>Новый хук useNavigate вместо useHistory</li>
            <li>Улучшенная поддержка nested routes</li>
          </ul>
        `,
        code: `// React Router v6
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}`
      }
    ]
  },
  architecture: {
    title: "Архитектура и best practices",
    questions: [
      {
        id: "arch-1",
        question: "Разница между smart и dumb компонентами.",
        answer: `
          <p><strong>Smart компоненты (Container):</strong></p>
          <ul>
            <li>Управляют состоянием и логикой</li>
            <li>Подключаются к store/API</li>
            <li>Передают данные в dumb компоненты</li>
          </ul>
          
          <p><strong>Dumb компоненты (Presentational):</strong></p>
          <ul>
            <li>Только отображение UI</li>
            <li>Получают данные через props</li>
            <li>Вызывают колбэки для событий</li>
            <li>Легко тестируются и переиспользуются</li>
          </ul>
        `,
        code: `// Smart компонент
function UserContainer() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  
  return <UserProfile user={user} />;
}

// Dumb компонент
function UserProfile({ user }) {
  if (!user) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`
      }
    ]
  },
  optimization: {
    title: "Оптимизация производительности",
    questions: [
      {
        id: "opt-1",
        question: "Причины лишних ререндеров.",
        answer: `
          <p><strong>Причины лишних ререндеров:</strong></p>
          <ul>
            <li>Изменение props (даже если значение не изменилось)</li>
            <li>Изменение state родителя</li>
            <li>Inline функции и объекты в JSX</li>
            <li>Контекст обновляется</li>
            <li>Отсутствие мемоизации</li>
          </ul>
        `,
        code: `// Проблема: inline функция создается каждый раз
function Parent() {
  return <Child onClick={() => console.log('click')} />;
}

// Решение: useCallback
function Parent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  
  return <Child onClick={handleClick} />;
}

// Проблема: inline объект
function Parent() {
  return <Child style={{ color: 'red' }} />;
}

// Решение: вынести наружу или useMemo
const style = { color: 'red' };
function Parent() {
  return <Child style={style} />;
}`
      }
    ]
  },
  api: {
    title: "Работа с API / Network",
    questions: [
      {
        id: "api-1",
        question: "Отличия REST, GraphQL, WebSocket.",
        answer: `
          <p><strong>REST:</strong> Архитектурный стиль с HTTP методами, фиксированные endpoints.</p>
          <p><strong>GraphQL:</strong> Язык запросов, один endpoint, клиент определяет данные.</p>
          <p><strong>WebSocket:</strong> Двусторонняя связь, постоянное соединение, real-time.</p>
        `,
        code: `// REST
GET /api/users/1
POST /api/users
PUT /api/users/1

// GraphQL
query {
  user(id: 1) {
    name
    email
  }
}

// WebSocket
const ws = new WebSocket('ws://example.com');
ws.onmessage = (event) => {
  console.log(event.data);
};`
      },
      {
        id: "api-2",
        question: "Что такое CORS.",
        answer: `
          <p><strong>CORS (Cross-Origin Resource Sharing)</strong> — механизм безопасности браузера, разрешающий запросы между разными доменами.</p>
          
          <p><strong>Как работает:</strong></p>
          <ul>
            <li>Браузер отправляет preflight запрос (OPTIONS)</li>
            <li>Сервер отвечает заголовками Access-Control-*</li>
            <li>Браузер разрешает или блокирует запрос</li>
          </ul>
        `,
        code: `// CORS заголовки на сервере
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type

// В запросе
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});`
      }
    ]
  }
};

