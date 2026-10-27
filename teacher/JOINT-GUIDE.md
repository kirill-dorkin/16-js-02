# JS · Урок 2 · Совместная практика — сценарий для преподавателя

Файл учеников: `materials/joint/script.js` — в нём **нет кода**, только ТЗ в комментариях. Пишем всё вместе с нуля.
Полное решение: `teacher/joint-solution.js`. Время: 25 минут.
На проекторе: VS Code слева, браузер с консолью (F12 → Console) справа.

Порядок на каждом шаге: прочитать ТЗ вслух → спросить «как будем делать?» → писать код → Ctrl+S → F5 → сверить консоль с «Проверкой».

| Шаг | Что пишем | Повторяем / новое | Мин |
|---|---|---|---|
| 1 | шесть переменных | урок 1: let / const | 4 |
| 2 | `typeof` каждой | **новое** | 3 |
| 3 | склейка через `+` | **новое** | 3 |
| 4 | `Number(ageFromForm)` | **новое** | 4 |
| 5 | `Number("15 лет")` | **новое**: NaN | 2 |
| 6 | `String(age)` | **новое** | 2 |
| 7 | `Boolean(...)` | **новое**: falsy | 3 |
| 8 | итоговая фраза | всё вместе | 2 |

---

## 1 · Переменные (4 мин)
```js
const firstName = "Айдай";
let age = 15;
const city = "Бишкек";
const isStudent = true;
let phone;
let email = null;
```
Спросить: «Почему age — let, а firstName — const?» → возраст меняется, имя — нет.
«Что выведет console.log(phone)?» → undefined: значение не положили.

## 2 · typeof (3 мин)
```js
console.log("age:", typeof age);
```
Перед F5 пусть группа назовёт все шесть типов. На `email` → `"object"` — ловушка с урока. Сам null — отдельный тип.

## 3 · Склейка (3 мин)
```js
const profile = firstName + ", " + age + " лет, " + city;
console.log(profile);
console.log(typeof profile);
```
Спросить: «age — число. Почему результат — строка?» → `+` со строкой превращает всё в строку.
**Покажите ошибку специально:** уберите пробелы в `", "` → «Айдай,15 лет,Бишкек».

## 4 · Данные из формы (4 мин) — главный шаг
```js
const ageFromForm = "15";
console.log(ageFromForm + 1);          // 151
const ageNumber = Number(ageFromForm);
console.log(ageNumber + 1);            // 16
```
Объяснить: всё, что вводят в поля сайта, приходит строкой. Это самый частый баг новичков.

## 5 · Плохой ввод (2 мин)
```js
const badAge = Number("15 лет");
console.log(badAge, typeof badAge);    // NaN number
```
«NaN — "не число", но тип у него number». Похихикать и запомнить.

## 6 · Число в строку (2 мин)
```js
const ageText = String(age);
console.log(ageText, typeof ageText);  // 15 string
console.log(ageText + 1);              // 151
```

## 7 · Да или нет (3 мин)
```js
console.log(Boolean(firstName), Boolean(""), Boolean(0), Boolean(age));
```
Перед F5 — угадать каждое. Выписать в тетрадь список falsy: `0, "", null, undefined, NaN, false`. Пригодится на уроке 4.

## 8 · Итог (2 мин)
```js
let nextYearAge = age + 1;
console.log(firstName + " в следующем году будет " + nextYearAge + " лет");
```

## Бонус
```js
console.log(typeof phone);   // undefined
phone = "+996 555 12 34 56";
console.log(typeof phone);   // string
```

---

## Частые ошибки
| Ошибка | Что увидят |
|---|---|
| Разные кавычки `"Айдай'` | SyntaxError, красное в консоли |
| `4,8` вместо `4.8` | SyntaxError |
| `const` и потом присваивание | TypeError: Assignment to constant variable |
| Не сохранили файл | «ничего не поменялось» — Ctrl+S, потом F5 |
| Опечатка `typeof agee` | `undefined` вместо `number` |
| `number("15")` с маленькой буквы | ReferenceError: number is not defined |
