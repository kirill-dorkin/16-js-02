// ── ШАГ 1
const productName = "Наушники";
const priceText = "1500";
const countText = "2";
let inStock = true;
let discount = null;
let comment;
console.log(productName);
console.log(priceText);
console.log(countText);
console.log(inStock);
console.log(discount);
console.log(comment);

// ── ШАГ 2
console.log(typeof productName, typeof priceText, typeof countText, typeof inStock, typeof discount, typeof comment);

// ── ШАГ 3 · склейка двух строк
console.log(priceText + countText);

// ── ШАГ 4
const price = Number(priceText);
const count = Number(countText);
console.log(price + count, typeof price);

// ── ШАГ 5
const total = price * count;
console.log(total);

// ── ШАГ 6
console.log(Number("1500 сом"));

// ── ШАГ 7
console.log(Boolean(inStock), Boolean(discount), Boolean(comment), Boolean(productName));

// ── ШАГ 8
console.log(productName + " × " + count + " = " + total + " сом");

// ── БОНУС: * и - превращают в числа, + склеивает
console.log("5" * "2", "5" - "2", "5" + "2");
