// ── ШАГ 1 · ПЕРЕМЕННЫЕ
const firstName = "Айдай";
let age = 15;
const city = "Бишкек";
const isStudent = true;
let phone;
let email = null;

console.log(firstName);
console.log(age);
console.log(city);
console.log(isStudent);
console.log(phone);
console.log(email);

// ── ШАГ 2 · ТИП КАЖДОЙ ПЕРЕМЕННОЙ
console.log("firstName:", typeof firstName);
console.log("age:", typeof age);
console.log("city:", typeof city);
console.log("isStudent:", typeof isStudent);
console.log("phone:", typeof phone);
console.log("email:", typeof email); // "object" — историческая ошибка JS

// ── ШАГ 3 · СКЛЕЙКА
const profile = firstName + ", " + age + " лет, " + city;
console.log(profile);
console.log(typeof profile); // + со строкой всё превращает в строку

// ── ШАГ 4 · ДАННЫЕ ИЗ ФОРМЫ
const ageFromForm = "15";
console.log(ageFromForm + 1);   // 151 — склейка
const ageNumber = Number(ageFromForm);
console.log(ageNumber + 1);     // 16 — сложение

// ── ШАГ 5 · ПЛОХОЙ ВВОД
const badAge = Number("15 лет");
console.log(badAge, typeof badAge);

// ── ШАГ 6 · ЧИСЛО В СТРОКУ
const ageText = String(age);
console.log(ageText, typeof ageText);
console.log(ageText + 1);

// ── ШАГ 7 · ДА ИЛИ НЕТ
console.log(Boolean(firstName), Boolean(""), Boolean(0), Boolean(age));

// ── ШАГ 8 · ИТОГ
let nextYearAge = age + 1;
console.log(firstName + " в следующем году будет " + nextYearAge + " лет");

// ── БОНУС
console.log(typeof phone);
phone = "+996 555 12 34 56";
console.log(typeof phone);
