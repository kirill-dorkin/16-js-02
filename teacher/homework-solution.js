// ── ШАГ 1
const coffeePriceText = "180";
const coffeeCountText = "2";
const croissantPriceText = "120";
const croissantCountText = "1";
const tipText = "10";
const cafeName = "Утро";
let isPaid = false;
let promoCode = null;
console.log(coffeePriceText, coffeeCountText, croissantPriceText, croissantCountText, tipText);
console.log(cafeName, isPaid, promoCode);

// ── ШАГ 2
console.log(typeof coffeePriceText, typeof coffeeCountText, typeof croissantPriceText, typeof croissantCountText, typeof tipText);
console.log(typeof cafeName, typeof isPaid, typeof promoCode);

// ── ШАГ 3
console.log(coffeePriceText + croissantPriceText);
// получилось "180120": обе цены — строки, а + со строками склеивает

// ── ШАГ 4
const coffeePrice = Number(coffeePriceText);
const coffeeCount = Number(coffeeCountText);
const croissantPrice = Number(croissantPriceText);
const croissantCount = Number(croissantCountText);
const tipPercent = Number(tipText);
console.log(typeof coffeePrice);

// ── ШАГ 5
const subtotal = coffeePrice * coffeeCount + croissantPrice * croissantCount;
console.log(subtotal);

// ── ШАГ 6
const tip = subtotal * tipPercent / 100;
const total = subtotal + tip;
console.log(tip);
console.log(total);

// ── ШАГ 7
console.log("Кафе «" + cafeName + "»");
console.log("Заказ: " + subtotal + " сом, чаевые: " + tip + " сом");
console.log("Итого: " + total + " сом");

// ── ШАГ 8
console.log(Boolean(isPaid), Boolean(promoCode), Boolean(cafeName), Boolean(tip));

// ── ОТВЕТЫ
// 1) Это строки, а + со строками склеивает: "180" + "120" = "180120".
// 2) NaN: Number превращает строку, только если она целиком число, а тут есть « сом».
// 3) Это старая ошибка языка, её не исправили ради совместимости. На самом деле null — отдельный простой тип null.
