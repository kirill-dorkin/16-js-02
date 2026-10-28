"use strict";
/* JavaScript · Урок 2 · Типы данных
   Слайды описаны данными ниже. Типы: cover, quiz, theory, types, run, guess, convert, bugs, practice, glossary,
   summary, end. */

// ───────── Пошаговое выполнение: переменные с типами + консоль
// vars: [имя, значение как в коде, тип, отметка 'new' | 'changed']
// logs: [текст, тип] — как в консоли браузера
const RUN = {
  typeof: {
    code: 'const name = "Айдай";\nlet age = 15;\nconst isStudent = true;\nlet phone;\nlet city = null;\n\nconsole.log(typeof name);\nconsole.log(typeof age);\nconsole.log(typeof isStudent);\nconsole.log(typeof phone);\nconsole.log(typeof city);',
    steps: (() => {
      const v = [['name', '"Айдай"', 'string'], ['age', '15', 'number'], ['isStudent', 'true', 'boolean'], ['phone', 'undefined', 'undefined'], ['city', 'null', 'null']];
      const upto = (n, fresh) => v.slice(0, n).map((x, i) => (i === fresh ? [...x, 'new'] : x));
      const L = [['string', 'string'], ['number', 'string'], ['boolean', 'string'], ['undefined', 'string'], ['object', 'string']];
      return [
        { line: 1, vars: upto(1, 0), logs: [], label: 'Текст в кавычках — тип `string`, строка.', term: 'string — строка' },
        { line: 2, vars: upto(2, 1), logs: [], label: 'Число без кавычек — `number`. Целое или дробное — неважно.', term: 'number — число' },
        { line: 3, vars: upto(3, 2), logs: [], label: '`true` или `false` — тип `boolean`: да или нет.', term: 'boolean — логический тип' },
        { line: 4, vars: upto(4, 3), logs: [], label: 'Объявили, но значение не положили — JS сам ставит `undefined`: «ещё не задано».', term: 'undefined — не определено' },
        { line: 5, vars: upto(5, 4), logs: [], label: '`null` кладём сами: «значения нет, и это специально».', term: 'null — пустое значение' },
        { line: 7, vars: upto(5), logs: L.slice(0, 1), label: '`typeof` говорит тип значения — строкой.', term: 'typeof — оператор типа' },
        { line: 8, vars: upto(5), logs: L.slice(0, 2), label: '`typeof age` → `"number"`.' },
        { line: 9, vars: upto(5), logs: L.slice(0, 3), label: '`typeof isStudent` → `"boolean"`.' },
        { line: 10, vars: upto(5), logs: L.slice(0, 4), label: 'У `undefined` и тип называется так же — `"undefined"`.' },
        { line: 11, vars: upto(5), logs: L.slice(0, 5), label: 'Ловушка! `typeof null` → `"object"`. Это старая ошибка языка — её не исправили, чтобы не сломать старые сайты.', term: 'legacy bug — историческая ошибка' },
      ];
    })(),
  },
  coercion: {
    code: 'const a = "5";\nconst b = 2;\n\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log("5" + 2 + 3);\nconsole.log(2 + 3 + "5");',
    steps: (() => {
      const v1 = [['a', '"5"', 'string', 'new']], v2 = [['a', '"5"', 'string'], ['b', '2', 'number', 'new']], v = [['a', '"5"', 'string'], ['b', '2', 'number']];
      const L = [['52', 'string'], ['3', 'number'], ['10', 'number'], ['523', 'string'], ['55', 'string']];
      return [
        { line: 1, vars: v1, logs: [], label: 'В кавычках — значит строка, даже если внутри цифра.' },
        { line: 2, vars: v2, logs: [], label: '`b` — настоящее число.' },
        { line: 4, vars: v, logs: L.slice(0, 1), label: '`+` со строкой — склейка. Число превращается в строку: `"5" + 2` → `"52"`.', term: 'concatenation — склейка строк' },
        { line: 5, vars: v, logs: L.slice(0, 2), label: 'Минуса у строк нет, поэтому JS превращает `"5"` в число: `"5" - 2` → `3`.', term: 'type coercion — неявное приведение типов' },
        { line: 6, vars: v, logs: L.slice(0, 3), label: '`*` и `/` тоже работают только с числами → `10`.' },
        { line: 7, vars: v, logs: L.slice(0, 4), label: 'Считаем слева направо: `"5" + 2` = `"52"`, потом `"52" + 3` = `"523"`.', term: 'left to right — слева направо' },
        { line: 8, vars: v, logs: L.slice(0, 5), label: 'Слева направо: `2 + 3` = `5` (числа!), потом `5 + "5"` = `"55"`.' },
      ];
    })(),
  },
};

// ───────── «Угадай тип»: значение → тип
const GUESS = [
  ['"привет"', 'string'], ['42', 'number'], ['"42"', 'string'], ['true', 'boolean'], ['"false"', 'string'], ['3.14', 'number'],
  ['undefined', 'undefined'], ['null', 'object'], ['""', 'string'], ['-7', 'number'], ['NaN', 'number'], ['false', 'boolean'],
];

// ───────── Лаборатория приведения: значения для кнопок
const CONVERT = [['"42"', '42'], ['"3.5"', '3.5'], ['""', ''], ['"  7  "', '  7  '], ['"12px"', '12px'], ['"abc"', 'abc'], ['0', 0], ['1', 1], ['true', true], ['false', false], ['null', null], ['undefined', undefined]];

// ───────── Слайды
const slides = [
  { type: 'cover', title: 'Типы данных', section: 'Начало', minutes: 1, notes: 'Урок 2. Главная мысль: у каждого значения есть тип, и от типа зависит результат. "5" + 2 — это "52", а не 7. План на 90 минут: 5 — разминка, 40 — теория с демо, 25 — вместе, 15 — сами, 5 — шпаргалка.' },
  { type: 'quiz', label: '02 / РАЗМИНКА', section: 'Разминка', title: 'Вспомним <em>const</em>', lead: 'Прошлый урок. Сначала ответ вслух, потом кнопка.', minutes: 2,
    code: 'const price = 100;\nprice = 120;\nconsole.log(price);', question: 'Что произойдёт?', choices: ['Выведется 120', 'Выведется 100', 'Ошибка: const нельзя переприсвоить', 'Выведется undefined'], correct: 2,
    explain: '`const` — постоянная: положили значение один раз — менять нельзя. Будет TypeError. Если значение будет меняться — `let`.', notes: 'Повторите: let — можно менять, const — нельзя. Имена: camelCase, без пробелов, не с цифры.' },
  { type: 'theory', label: '03 / ЗАЧЕМ', section: 'Что такое тип', title: 'У каждого значения есть <em>тип</em>', lead: 'Тип — это вид значения. От него зависит, что с ним можно делать.', minutes: 3,
    code: '// у каждого значения есть тип\n"Привет"     // string — текст\n42           // number — число\n3.14         // number — тоже число\ntrue         // boolean — да / нет\nundefined    // значения ещё нет\nnull         // значение пустое',
    items: [['Тип = вид значения', 'Числа складываем, строки склеиваем. Если перепутать тип — получим странный результат.', 'data type — тип данных'], ['Примитивы', 'Пять простых типов: `string`, `number`, `boolean`, `undefined`, `null`. Сегодня — только они.', 'primitive — примитив'], ['typeof', 'Оператор, который называет тип: `typeof 42` → `"number"`.', 'typeof — оператор типа']],
    notes: 'Пример из жизни: «15» в анкете и 15 на калькуляторе — выглядят одинаково, но с первым нельзя считать. Ещё есть bigint, symbol и object — объекты пройдём на уроке 10.' },
  { type: 'types', label: '04 / ПЯТЬ ТИПОВ', section: 'Что такое тип', title: 'Пять <em>простых типов</em>', lead: 'Всё, с чем сегодня работаем. Запомните, как выглядит каждый.', minutes: 3, notes: 'Пройдитесь по карточкам слева направо. На каждой спросите: «как отличить в коде?» — по кавычкам, по цифрам, по true/false.' },
  { type: 'theory', label: '05 / STRING', section: 'Строки', title: 'Строка — это <em>текст в кавычках</em>', lead: 'Кавычки — главный признак строки.', minutes: 3,
    code: 'const name = "Айдай";\nconst city = \'Бишкек\';\nconst age = "15";      // это строка!\nconst empty = "";       // пустая строка\n\nconsole.log(name + " из " + city);\n// Айдай из Бишкек',
    items: [['Кавычки', 'Двойные, одинарные или обратные — всё строки. Главное — одинаковые с двух сторон.', 'string literal — строковый литерал'], ['Цифры в кавычках', '`"15"` — строка, а не число. Считать с ней как с числом нельзя.', 'string ≠ number'], ['Склейка +', '`"Айдай" + " из " + city` — одна строка. Пробелы ставим сами.', 'concatenation — конкатенация']],
    notes: 'Обратные кавычки (шаблонные строки) подробно — на уроке 7. Сейчас достаточно знать, что это тоже строка.' },
  { type: 'theory', label: '06 / NUMBER', section: 'Числа', title: 'Число — <em>одно на всё</em>', lead: 'Целые, дробные, отрицательные — один тип number.', minutes: 3,
    code: 'const price = 250;\nconst rating = 4.8;     // дробь — через точку\nconst temp = -5;\n\nconsole.log(price * 2);   // 500\nconsole.log(0.1 + 0.2);   // 0.30000000000000004\nconsole.log("abc" * 2);   // NaN',
    items: [['Один тип', 'Целые, дробные, минус — всё `number`. Дробь через точку: `4.8`.', 'number — число'], ['NaN', '«Не число» — результат неудачной математики. Тип у него — `number`.', 'NaN — не число'], ['Точность', '`0.1 + 0.2` — не ровно 0.3. Деньги считаем в целых (тыйынах).', 'floating point — плавающая точка']],
    notes: 'Infinity можно упомянуть: 10 / 0 → Infinity, тоже number. Не углубляйтесь.' },
  { type: 'quiz', label: '07 / ПРОВЕРКА', section: 'Числа', title: 'Какой <em>тип</em>?', lead: 'Посмотрите на кавычки.', minutes: 1,
    code: 'console.log(typeof "42");', question: 'Что выведется?', choices: ['"number"', '"string"', '42', '"text"'], correct: 1,
    explain: '`"42"` в кавычках — значит строка. `typeof` вернёт `"string"`. Цифры внутри ничего не меняют.', notes: '' },
  { type: 'theory', label: '08 / ДА · НЕТ · ПУСТО', section: 'boolean, undefined, null', title: '<em>boolean</em>, <em>undefined</em> и <em>null</em>', lead: 'Три типа с маленьким набором значений.', minutes: 3,
    code: 'const isOpen = true;\nconst hasDiscount = false;\nlet phone;            // undefined\nlet avatar = null;    // пусто специально\n\nconsole.log(isOpen);   // true\nconsole.log(phone);    // undefined\nconsole.log(avatar);   // null',
    items: [['boolean', 'Только два значения: `true` и `false`. Имена — вопросом: `isOpen`, `hasDiscount`.', 'boolean — логический тип'], ['undefined', '«Ещё не задано». JS сам ставит его переменной без значения.', 'undefined — не определено'], ['null', '«Пусто — и это специально». Его кладём мы сами.', 'null — пустое значение']],
    notes: 'Аналогия: undefined — анкету ещё не заполняли; null — заполнили и поставили прочерк.' },
  { type: 'run', demo: 'typeof', label: '09 / TYPEOF', section: 'typeof', title: '<em>typeof</em> — по шагам', lead: 'Слева код, справа — что лежит в переменных и что в консоли.', minutes: 4, notes: 'Перед каждым шагом спрашивайте: «какой будет тип?» На последнем шаге — ловушка typeof null. Её любят спрашивать на собеседованиях.' },
  { type: 'guess', label: '10 / ИГРА', section: 'typeof', title: 'Угадай <em>тип</em>', lead: 'Ученик называет тип — кликните по карточке, чтобы проверить.', minutes: 3, notes: 'Вызывайте по одному. Самые коварные: "42", "false", "", NaN, null.' },
  { type: 'quiz', label: '11 / ПРОВЕРКА', section: 'typeof', title: 'Ловушка <em>null</em>', lead: 'Вспомните последний шаг демо.', minutes: 1,
    code: 'let city = null;\nconsole.log(typeof city);', question: 'Что выведется?', choices: ['"null"', '"undefined"', '"object"', 'Ошибка'], correct: 2,
    explain: '`typeof null` → `"object"` — историческая ошибка JS. Сам `null` — отдельный простой тип.', notes: '' },
  { type: 'run', demo: 'coercion', label: '12 / СМЕШИВАЕМ', section: 'Приведение типов', title: 'Строка <em>+</em> число = ?', lead: 'Что делает JS, когда в выражении разные типы.', minutes: 4, notes: 'Главный момент урока. Обратите внимание на консоль: в браузере числа выводятся цветом, а строки — обычным текстом. Так в консоли можно отличить "52" от 52.' },
  { type: 'theory', label: '13 / ПРАВИЛА', section: 'Приведение типов', title: '<em>+</em> склеивает, остальные <em>считают</em>', lead: 'Два правила неявного приведения — запомните их.', minutes: 2,
    code: '"5" + 2       // "52"  — + со строкой склеивает\n"5" - 2       // 3     — минус делает число\n"5" * "2"     // 10\n"abc" - 1     // NaN   — не получилось\ntrue + 1      // 2     — true = 1, false = 0',
    items: [['+ любит строки', 'Если хоть с одной стороны строка — `+` склеивает.', 'concatenation — склейка'], ['- * / любят числа', 'Превращают строки в числа. Не получилось — `NaN`.', 'type coercion — неявное приведение'], ['Совет', 'Не надейтесь на автопревращение. Превращайте типы сами — следующий слайд.', 'explicit — явно']],
    notes: 'Это неявное приведение (coercion). Оно источник багов: данные из форм всегда приходят строками.' },
  { type: 'quiz', label: '14 / ПРОВЕРКА', section: 'Приведение типов', title: 'Цена из <em>формы</em>', lead: 'Покупатель ввёл в поле «10», мы прибавили доставку 5.', minutes: 1,
    code: 'const fromForm = "10";\nconsole.log(fromForm + 5);', question: 'Что выведется?', choices: ['15', '105', 'Ошибка', 'NaN'], correct: 1,
    explain: '`"10"` — строка, `+` склеивает → `"105"`. Нужно `Number(fromForm) + 5` → `15`.', notes: 'Реальный баг интернет-магазинов: доставка 5 сом превращает 10 в 105.' },
  { type: 'theory', label: '15 / ПРЕВРАЩАЕМ САМИ', section: 'Приведение типов', title: '<em>Number</em>, <em>String</em>, <em>Boolean</em>', lead: 'Явное приведение: сами говорим, какой тип нужен.', minutes: 3,
    code: 'Number("42")       // 42\nNumber("3.5")      // 3.5\nNumber("")         // 0\nNumber("12px")     // NaN\n\nString(42)         // "42"\n\nBoolean(0)         // false\nBoolean("привет")  // true',
    items: [['Number(x)', 'Делает число. Не получилось — `NaN`. Пустая строка → `0`.', 'type conversion — приведение типов'], ['String(x)', 'Делает строку из чего угодно: `String(42)` → `"42"`.', 'String() — в строку'], ['Boolean(x)', 'Ложь только у: `0`, `""`, `null`, `undefined`, `NaN`, `false`. Всё остальное — `true`.', 'falsy / truthy — ложные / истинные']],
    notes: 'Список falsy пригодится на уроке 4 (условия). Пусть выпишут его в тетрадь.' },
  { type: 'convert', label: '16 / ЛАБОРАТОРИЯ', section: 'Приведение типов', title: 'Лаборатория <em>приведения</em>', lead: 'Выберите значение — увидите, во что его превращает каждая функция.', minutes: 3, notes: 'Сначала спросите группу, потом кликайте. Самые интересные: "", "  7  " (пробелы обрезаются), "12px", null (Number(null) = 0!), undefined (NaN).' },
  { type: 'quiz', label: '17 / ПРОВЕРКА', section: 'Приведение типов', title: 'Число <em>с буквами</em>', lead: 'Number строгий.', minutes: 1,
    code: 'const price = Number("250 сом");\nconsole.log(price);', question: 'Что выведется?', choices: ['250', 'NaN', '"250 сом"', '0'], correct: 1,
    explain: '`Number` превращает строку, только если она целиком — число. Лишние буквы → `NaN`.', notes: '' },
  { type: 'bugs', label: '18 / ОТЛАДКА', section: 'Ошибки', title: 'Почему <em>не так</em>?', lead: 'Сначала группа объясняет причину. Потом откройте исправление.', minutes: 4, notes: 'Эти ошибки будут на практике у каждого. Требуйте назвать тип: «здесь строка, а нужно число».' },
  { type: 'practice', practice: 'joint', label: '19 / ВМЕСТЕ', section: 'Практика', title: 'Вместе: <em>анкета ученика</em>', lead: 'С нуля по ТЗ: переменные (урок 1), потом типы, typeof и приведение.', minutes: 25, notes: 'Подробный сценарий — teacher/JOINT-GUIDE.md. VS Code слева, браузер с консолью (F12) справа. После каждого шага: Ctrl+S → F5 → сверить с «Проверкой».' },
  { type: 'practice', practice: 'solo', label: '20 / САМИ', section: 'Практика', title: 'Самостоятельно: <em>карточка товара</em>', lead: 'Те же шаги на другой задаче. Подглядывать в анкету можно.', minutes: 15, notes: 'Не подсказывайте код — спрашивайте: «какой тип у priceText?», «как сделать из него число?».' },
  { type: 'glossary', label: '21 / СЛОВАРЬ', section: 'Итог', title: 'Словарь <em>разработчика</em>', lead: 'Как это называют в документации, на собеседованиях и в команде.', minutes: 3, notes: 'Вы говорите русский термин — группа хором английский. Гуглить лучше по-английски: «js type coercion».' },
  { type: 'summary', part: 'concepts', label: '22 / ШПАРГАЛКА 1/2', section: 'Итог', title: 'Шпаргалка: <em>главные понятия</em>', lead: 'Весь урок на одном экране — листать презентацию не нужно.', minutes: 3, notes: 'Пусть сфотографируют или скачают.' },
  { type: 'summary', part: 'exceptions', label: '23 / ШПАРГАЛКА 2/2', section: 'Итог', title: 'Шпаргалка: <em>исключения и ловушки</em>', lead: 'Именно эти случаи дают ошибки в домашке.', minutes: 2, notes: 'Спросите 2–3 пункта: «почему так?»' },
  { type: 'end', title: 'Готово', section: 'Итог', minutes: 1, notes: 'Домашнее задание: чек в кафе. ТЗ в комментариях script.js.' },
];

const TYPES = [
  ['string', 'Строка', '"Привет" · \'Бишкек\' · "15" · ""', 'Текст. Всегда в кавычках.', 'string'],
  ['number', 'Число', '42 · 4.8 · -5 · NaN', 'Любые числа. Дробь через точку.', 'number'],
  ['boolean', 'Логический', 'true · false', 'Да или нет. Ровно два значения.', 'boolean'],
  ['undefined', 'Не задано', 'let phone;', 'Значения ещё нет. Ставит сам JS.', 'undefined'],
  ['null', 'Пусто', 'let avatar = null;', 'Значения нет специально. Ставим мы.', 'object ⚠'],
];

const BUGS = [
  { title: 'Возраст склеился', bad: 'let age = "15";\nconsole.log(age + 1);\n// 151', good: 'let age = Number("15");\nconsole.log(age + 1);\n// 16', why: 'В кавычках — строка, и `+` её склеивает. Сначала превращаем: `Number("15")`.' },
  { title: 'Слова слиплись', bad: 'const name = "Айдай";\nconsole.log("Привет," + name);\n// Привет,Айдай', good: 'const name = "Айдай";\nconsole.log("Привет, " + name);\n// Привет, Айдай', why: 'Склейка не добавляет пробел — ставим его сами внутри кавычек.' },
  { title: 'NaN вместо цены', bad: 'const price = Number("250 сом");\nconsole.log(price);\n// NaN', good: 'const price = Number("250");\nconsole.log(price);\n// 250', why: '`Number` работает, только если вся строка — число. Лишние буквы → `NaN`.' },
  { title: 'Разные кавычки', bad: 'const city = "Бишкек\';', good: 'const city = "Бишкек";', why: 'Открыли двойной кавычкой — закрываем двойной. Иначе SyntaxError: строка не закрыта.' },
  { title: 'Дробь через запятую', bad: 'const rating = 4,8;', good: 'const rating = 4.8;', why: 'Дробная часть — через точку. Запятая в JS разделяет значения → SyntaxError.' },
  { title: 'typeof «не нашёл»', bad: 'let total = 100;\nconsole.log(typeof totl);\n// "undefined"', good: 'let total = 100;\nconsole.log(typeof total);\n// "number"', why: '`typeof` не ругается на опечатку в имени — просто вернёт `"undefined"`. Проверьте имя переменной.' },
];

const PRACTICE = {
  joint: {
    caption: 'materials/joint · 25 минут', zip: './materials/joint.zip', spec: './materials/view.html?p=joint', title: 'Анкета ученика', files: 'index.html · script.js',
    tasks: [
      ['Переменные', 'const firstName = …', 'урок 1: let / const'],
      ['Типы всех', 'typeof firstName', 'НОВОЕ: typeof'],
      ['Склейка', 'firstName + ", " + age', 'НОВОЕ: + со строкой'],
      ['Данные из формы', 'Number(ageFromForm)', 'НОВОЕ: Number()'],
      ['Плохой ввод', 'Number("15 лет")', 'НОВОЕ: NaN'],
      ['Число в строку', 'String(age)', 'НОВОЕ: String()'],
      ['Да или нет', 'Boolean("")', 'НОВОЕ: falsy'],
      ['Итог', 'age + 1', 'всё вместе'],
    ],
  },
  solo: {
    caption: 'materials/solo · 15 минут', zip: './materials/solo.zip', spec: './materials/view.html?p=solo', title: 'Карточка товара', files: 'index.html · script.js',
    tasks: [
      ['Переменные', 'const productName = …', 'как в анкете'],
      ['Типы всех', 'typeof priceText', 'как в анкете'],
      ['Ошибка склейки', 'priceText + countText', 'что получилось?'],
      ['Превращаем', 'Number(priceText)', 'как в анкете'],
      ['Сумма', 'price * count', 'number * number'],
      ['Плохая цена', 'Number("1500 сом")', 'NaN'],
      ['Да или нет', 'Boolean(discount)', 'falsy'],
      ['Итог', '"Итого: " + total', 'склейка'],
    ],
  },
};

const GLOSSARY = [
  ['Тип данных', 'data type', '«тип»', 'typeof 42'],
  ['Примитив', 'primitive', '«простой тип»', '"текст", 7, true'],
  ['Строка', 'string', '«стринга», «строка»', '"Айдай"'],
  ['Число', 'number', '«намбер», «число»', '4.8'],
  ['Логический тип', 'boolean', '«булеан», «буль»', 'true'],
  ['Не определено', 'undefined', '«андефайнд»', 'let phone;'],
  ['Пустое значение', 'null', '«нал»', 'let avatar = null;'],
  ['Оператор typeof', 'typeof', '«тайпоф»', 'typeof "15"'],
  ['Склейка строк', 'concatenation', '«конкатенация»', '"a" + "b"'],
  ['Неявное приведение', 'type coercion', '«само привелось»', '"5" - 2'],
  ['Явное приведение', 'type conversion', '«привести к числу»', 'Number("42")'],
  ['Не число', 'NaN', '«нан»', 'Number("abc")'],
  ['Ложные значения', 'falsy', '«фолси»', 'Boolean(0)'],
  ['Литерал', 'literal', '«значение прямо в коде»', '"Бишкек"'],
];

const SUMMARY = [
  ['Пять типов <em>primitives</em>', ['<code>string</code> — текст в кавычках: <code>"Айдай"</code>.', '<code>number</code> — любые числа: <code>15</code>, <code>4.8</code>, <code>-5</code>.', '<code>boolean</code> — <code>true</code> / <code>false</code>. <code>undefined</code> — не задано. <code>null</code> — пусто специально.']],
  ['typeof <em>operator</em>', ['<code>typeof x</code> — тип значения строкой.', '<code>typeof "15"</code> → <code>"string"</code>, <code>typeof 15</code> → <code>"number"</code>.', 'Ловушка: <code>typeof null</code> → <code>"object"</code>.']],
  ['Строки <em>string</em>', ['Кавычки любые, но одинаковые с двух сторон.', 'Цифры в кавычках — строка: <code>"15"</code>.', 'Склейка: <code>"Привет, " + name</code> — пробелы ставим сами.']],
  ['Числа <em>number</em>', ['Дробь — через точку: <code>4.8</code>.', '<code>NaN</code> — «не число», но тип <code>number</code>.', '<code>0.1 + 0.2</code> — не ровно <code>0.3</code>.']],
  ['Само приводится <em>coercion</em>', ['<code>+</code> со строкой склеивает: <code>"5" + 2</code> → <code>"52"</code>.', '<code>-</code> <code>*</code> <code>/</code> делают числа: <code>"5" - 2</code> → <code>3</code>.', 'Считается слева направо: <code>2 + 3 + "5"</code> → <code>"55"</code>.']],
  ['Приводим сами <em>conversion</em>', ['<code>Number("42")</code> → <code>42</code>, не вышло → <code>NaN</code>.', '<code>String(42)</code> → <code>"42"</code>.', '<code>Boolean(x)</code>: ложь у <code>0</code> <code>""</code> <code>null</code> <code>undefined</code> <code>NaN</code> <code>false</code>.']],
];
const EXCEPTIONS = [
  '<code>"15"</code> — строка, а не число. Данные из форм всегда приходят строками.',
  '<code>"10" + 5</code> → <code>"105"</code>. Сначала <code>Number()</code>, потом складываем.',
  '<code>typeof null</code> → <code>"object"</code> — историческая ошибка JS.',
  '<code>typeof NaN</code> → <code>"number"</code>. «Не число» — числового типа.',
  '<code>Number("")</code> → <code>0</code>, а <code>Number("abc")</code> → <code>NaN</code>.',
  '<code>Number("  7  ")</code> → <code>7</code> — пробелы по краям не мешают. <code>Number("12px")</code> → <code>NaN</code>.',
  '<code>Number(null)</code> → <code>0</code>, а <code>Number(undefined)</code> → <code>NaN</code>.',
  '<code>Boolean("0")</code> и <code>Boolean("false")</code> → <code>true</code>: непустая строка всегда истина.',
  'Дробь — через точку: <code>4.8</code>. <code>4,8</code> — ошибка.',
  '<code>typeof</code> с опечаткой в имени не ругается — вернёт <code>"undefined"</code>.',
];

function glossaryView() {
  return '<div class="gl-grid">' + GLOSSARY.map((g) => '<div class="gl-row"><div class="gl-ru"><b>' + esc(g[0]) + '</b><em>' + esc(g[1]) + '</em></div><span class="gl-say">' + esc(g[2]) + '</span>' + inlineCode(g[3]) + '</div>').join('') + '</div>';
}


// ───────── Движок
const stage = document.getElementById('stage');
const store = Object.create(null);
let current = 0, toastTimeout;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const state = () => store[current] || (store[current] = { step: 0 });
const removeTags = (s) => String(s).replace(/<[^>]*>/g, '');
const tok = (t, cls) => t ? '<span class="token ' + cls + '">' + esc(t) + '</span>' : '';

// Подсветка CSS с образцами цвета, как в VS Code
const NAMED = ['tomato', 'navy', 'gold', 'teal', 'black', 'white', 'gray', 'red', 'green', 'blue', 'orange'];
function hlVal(v) {
  return v.split(/(rgb\([^)]*\)|"[^"]*"|#[0-9a-fA-F]{3,8}\b|\d*\.?\d+(?:px|em|%)?|[A-Za-z-]+)/).map((t) => {
    if (!t) return '';
    const isColor = /^#[0-9a-fA-F]{3,8}$/.test(t) || /^rgb\(/.test(t) || NAMED.includes(t);
    if (isColor) return '<i class="sw" style="background:' + esc(t) + '"></i>' + tok(t, /^[a-z]/.test(t) && !/^rgb/.test(t) ? 'string' : 'number');
    if (/^"/.test(t)) return tok(t, 'string');
    if (/^[\d.]/.test(t)) return tok(t, 'number');
    if (/^[A-Za-z-]+$/.test(t)) return tok(t, 'string');
    return esc(t);
  }).join('');
}
function hlCSS(line) {
  const ci = line.indexOf('/*');
  let rest = ci >= 0 ? line.slice(0, ci) : line;
  const comment = ci >= 0 ? line.slice(ci) : '';
  let html = '';
  const bi = rest.indexOf('{');
  if (bi >= 0) { html += tok(rest.slice(0, bi), 'keyword') + tok('{', 'operator'); rest = rest.slice(bi + 1); }
  const re = /([a-z-]+)(\s*:\s*)([^;}]*)(;?)|(\})/g;
  let last = 0, m;
  while ((m = re.exec(rest))) {
    html += esc(rest.slice(last, m.index));
    html += m[5] ? tok('}', 'operator') : tok(m[1], 'method') + tok(m[2], 'operator') + hlVal(m[3]) + tok(m[4], 'operator');
    last = re.lastIndex;
  }
  html += esc(rest.slice(last));
  return html + tok(comment, 'comment');
}
function hlHTML(line) {
  return String(line).split(/(<!--.*?-->|<!--.*$|<\/?[A-Za-z!][A-Za-z0-9]*|\/?>|[a-z-]+(?==)|"[^"]*"|=)/).map((t) => {
    if (!t) return '';
    if (/^<!--/.test(t)) return tok(t, 'comment');
    if (/^<\/?[A-Za-z!]/.test(t)) return tok(t, 'keyword');
    if (/^\/?>$/.test(t)) return tok(t, 'keyword');
    if (/^"/.test(t)) return tok(t, 'string');
    if (t === '=') return tok(t, 'operator');
    if (/^[a-z-]+$/.test(t)) return tok(t, 'method');
    return esc(t);
  }).join('');
}
const hl = (line, lang) => (lang === 'html' ? hlHTML(line) : lang === 'css' ? hlCSS(line) : hlJS(line));
// фрагмент кода внутри текста
function inlineCode(t) {
  t = String(t);
  return '<code class="ic">' + (/^</.test(t) ? hlHTML(t) : hlJS(t)) + '</code>';
}
// текст с `кодом` в обратных кавычках
const rich = (text) => {
  const parts = String(text).split('`');
  let out = '';
  parts.forEach((part, i) => {
    if (i % 2) {
      const next = parts[i + 1] || '';
      const glue = (next.match(/^[.,:;!?)»]+/) || [''])[0];
      parts[i + 1] = next.slice(glue.length);
      out += '<span class="nw">' + inlineCode(part) + esc(glue) + '</span>';
    } else out += esc(part);
  });
  return out;
};
const term = (t) => (t ? '<span class="term"><b>термин</b>' + esc(t) + '</span>' : '');

// opts: caption, lang, active: [номера строк], dimFrom: строки после — приглушить
function codeWindow(code, opts = {}) {
  const lang = opts.lang || 'js', active = opts.active || [];
  let inComment = false;
  const paint = (line) => {
    if (lang !== 'css') return hl(line, lang);
    let pre = '', rest = line;
    if (inComment) {
      const end = line.indexOf('*/');
      if (end < 0) return tok(line, 'comment');
      pre = tok(line.slice(0, end + 2), 'comment'); rest = line.slice(end + 2); inComment = false;
    }
    const open = rest.lastIndexOf('/*');
    if (open >= 0 && rest.indexOf('*/', open) < 0) inComment = true;
    return pre + hlCSS(rest);
  };
  return '<div class="code-window"><div class="code-head"><span><span class="dots"><i></i><i></i><i></i></span></span><span>' + esc(opts.caption || (lang === 'html' ? 'index.html' : 'script.js')) + '</span></div><pre class="code-pre">'
    + String(code).split('\n').map((line, i) => '<span class="code-line ' + (active.includes(i + 1) ? 'active-line' : '') + (opts.dimFrom && i + 1 > opts.dimFrom ? ' dim-line' : '') + '"><span class="line-no">' + (i + 1) + '</span><span>' + (line ? paint(line) : ' ') + '</span></span>').join('') + '</pre></div>';
}
function head(s) { return '<div class="intro"><span class="tag">' + (s.label || '02 / JS') + '</span><h2>' + s.title + '</h2><p>' + s.lead + '</p></div>'; }

function quiz(s, st) {
  const answered = Number.isInteger(st.answer);
  return '<div class="quiz-grid"><div class="quiz-left"><div class="quiz-question">' + esc(s.question) + '</div><div class="quiz-options">' + s.choices.map((c, i) => '<button class="answer-option ' + (answered ? (i === s.correct ? 'correct' : i === st.answer ? 'wrong' : '') : '') + ' ' + (st.answer === i ? 'selected' : '') + '" data-action="answer" data-value="' + i + '" aria-pressed="' + (st.answer === i) + '"><b>' + String.fromCharCode(65 + i) + '</b>' + esc(c) + '</button>').join('') + '</div>' + (answered ? '<div class="feedback ' + (st.answer === s.correct ? '' : 'warn') + '">' + (st.answer === s.correct ? '✓ Верно. ' : 'Не совсем. ') + rich(s.explain) + '</div><button class="small-btn" data-action="reset-answer">Ответить ещё раз ↺</button>' : '<p class="action-hint">Выберите вариант — появится разбор.</p>') + '</div><div class="quiz-right">' + codeWindow(s.code, { lang: s.lang, caption: s.file }) + '</div></div>';
}

function theoryView(s) {
  return '<div class="pair"><div class="pane left"><div class="pane-heading">КОД</div>' + codeWindow(s.code, { lang: s.lang, caption: s.file }) + '</div><div class="pane right theory-pane"><div class="pane-heading">ГЛАВНОЕ</div>' + s.items.map((x, i) => '<div class="concept"><span>' + String(i + 1).padStart(2, '0') + '</span><div><h3>' + esc(x[0]) + '</h3><p>' + rich(x[1]) + '</p>' + term(x[2]) + '</div></div>').join('') + '</div></div>';
}

function bugsView(st) {
  st.open = st.open || {};
  const i = st.bug || 0, b = BUGS[i], open = st.open[i];
  const cap = b.lang === 'html' ? 'index.html' : 'script.js';
  return '<div class="bugs2"><div class="bug-list">' + BUGS.map((x, k) => '<button class="bug-tab ' + (k === i ? 'active' : '') + ' ' + (st.open[k] ? 'done' : '') + '" data-action="bug-pick" data-value="' + k + '"><span>' + String(k + 1).padStart(2, '0') + '</span>' + esc(x.title) + '</button>').join('') + '</div>'
    + '<div class="bug-main"><div class="bug-col"><div class="caps bad-cap">✗ С ОШИБКОЙ</div>' + codeWindow(b.bad, { lang: b.lang, caption: cap }) + '</div>'
    + (open ? '<div class="bug-col"><div class="caps good-cap">✓ ИСПРАВЛЕНО</div>' + codeWindow(b.good, { lang: b.lang, caption: cap }) + '<p class="bug-why">' + rich(b.why) + '</p></div>'
      : '<div class="bug-hidden"><p>Почему не работает? Ответьте вслух.</p><button class="primary" data-action="bug" data-value="' + i + '">Показать исправление</button></div>')
    + '</div></div>';
}

function practice(s, st) {
  const p = PRACTICE[s.practice];
  const joint = s.practice === 'joint';
  const remaining = st.remaining ?? s.minutes * 60;
  return '<div class="practice-layout"><div class="task-list"><div class="pane-heading">ШАГ → ЧТО ПИШЕМ → ' + (joint ? 'ПОВТОРЯЕМ / НОВОЕ' : 'ПОДСКАЗКА') + '<span>index.html · script.js</span></div>'
    + p.tasks.map((x, i) => '<div class="task-step pr-row"><i>' + String(i + 1).padStart(2, '0') + '</i><div class="pr-btn">' + esc(x[0]) + '</div>' + (/→/.test(x[1]) ? '<code class="ic">' + esc(x[1]) + '</code>' : inlineCode(x[1])) + '<div class="pr-ret">→ ' + esc(x[2]) + '</div></div>').join('')
    + '<div class="tip">В файлах нет кода — только <b>ТЗ в комментариях</b>: что сделать, зачем и «Проверка». Пишем всё с нуля под каждым пунктом.</div></div>'
    + '<div class="task-side"><div class="goal"><span class="caps">' + esc(p.caption) + '</span><h3>' + esc(p.title) + '</h3>'
    + '<ol class="flow"><li>Распаковать ZIP, открыть папку в <b>VS Code</b></li><li>Открыть <b>index.html</b> в браузере, консоль: <b>F12 → Console</b></li><li>Пункт ТЗ → код → <b>Ctrl+S</b> → <b>F5</b> → сверить с «Проверкой»</li></ol>'
    + '<div class="minutes" id="timerDisplay" role="timer">' + formatTime(remaining) + '</div><div class="buttons"><button class="primary" data-action="timer">' + (st.running ? 'Пауза' : 'Старт таймера') + '</button><button class="secondary" data-action="timer-reset">Сброс</button></div></div>'
    + '<div class="download"><div class="file-label">Файлы практики<small>' + esc(p.files) + '</small></div><a href="' + p.spec + '" target="_blank" rel="noopener" class="open-link">ТЗ</a><a href="' + p.zip + '" download>↓ ZIP</a></div></div></div>';
}

function summaryView(s) {
  const buttons = '<div class="buttons sum-actions"><a class="primary" href="./materials/SUMMARY.md" download>↓ Шпаргалка .md</a><button class="secondary" data-action="print">Печать / PDF</button></div>';
  if (s.part === 'exceptions') {
    return '<div class="exc-grid">' + EXCEPTIONS.map((x, i) => '<div class="exc-card"><span>' + String(i + 1).padStart(2, '0') + '</span><p>' + x + '</p></div>').join('') + '</div>' + buttons;
  }
  return '<div class="sum-grid">' + SUMMARY.map(([h, list], i) => '<div class="sum-card"><div class="sum-n">' + String(i + 1).padStart(2, '0') + '</div><h3>' + h + '</h3><ul>' + list.map((x) => '<li>' + x + '</li>').join('') + '</ul></div>').join('') + '</div>' + buttons;
}

// ───────── Подсветка JavaScript
const KW = 'const|let|var|function|return|if|else|true|false|null|undefined|typeof|new';
const MT = 'console|log|Number|String|Boolean|NaN|Infinity';
const JS_RE = new RegExp('(\\/\\/.*$|"(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\'|`[^`]*`|\\b(?:' + KW + ')\\b|\\b(?:' + MT + ')\\b|\\b\\d+(?:\\.\\d+)?\\b|===|!==|=>|[+\\-*/=])', 'g');
const KW_RE = new RegExp('^(' + KW + ')$'), MT_RE = new RegExp('^(' + MT + ')$');
function hlJS(line) {
  return String(line).split(JS_RE).map((t) => {
    if (!t) return '';
    if (/^\/\//.test(t)) return tok(t, 'comment');
    if (/^["'`]/.test(t)) return tok(t, 'string');
    if (KW_RE.test(t)) return tok(t, 'keyword');
    if (MT_RE.test(t)) return tok(t, 'method');
    if (/^\d/.test(t)) return tok(t, 'number');
    if (/^(===|!==|=>|[+\-*/=])$/.test(t)) return tok(t, 'operator');
    return esc(t);
  }).join('');
}

// Бейдж типа: цвет по типу
const TYPE_RU = { string: 'строка', number: 'число', boolean: 'логический', undefined: 'не задано', null: 'пусто', object: 'object' };
const badge = (type, text) => '<span class="ty ty-' + type.replace(/[^a-z]/g, '') + '">' + esc(text || type) + '</span>';

// Пять типов — карточки
function typesView() {
  return '<div class="types-grid">' + TYPES.map(([type, ru, ex, desc, tof]) => '<div class="type-card ty-' + type + '">'
    + '<div class="type-top"><b>' + type + '</b><span>' + ru + '</span>' + (tof.includes('⚠') ? '<em>ловушка ↓</em>' : '') + '</div>'
    + '<div class="type-ex">' + ex.split(' · ').map((x) => inlineCode(x)).join('') + '</div>'
    + '<p>' + esc(desc) + '</p>'
    + '<div class="type-of"><span>typeof →</span>' + inlineCode('"' + tof.replace(' ⚠', '') + '"') + '</div></div>').join('') + '</div>';
}

// Пошаговое выполнение
function runView(kind, st) {
  const d = RUN[kind], total = d.steps.length;
  const idx = Math.max(0, Math.min(st.step || 0, total - 1));
  const t = d.steps[idx];
  const vars = t.vars.length ? t.vars.map(([name, val, type, mark]) => '<div class="vt-row ' + (mark || '') + '"><code class="vt-name">' + esc(name) + '</code><span class="vt-val">' + hlJS(val) + '</span>' + badge(type, type) + '</div>').join('') : '<div class="vt-empty">Переменных пока нет</div>';
  const logs = t.logs.length ? t.logs.map(([text, type], i) => '<div class="log ' + (i === t.logs.length - 1 && d.steps[idx - 1] && d.steps[idx - 1].logs.length < t.logs.length ? 'new' : '') + '"><span class="log-' + type + '">' + esc(text) + '</span>' + badge(type, type) + '</div>').join('') : '<div class="log-empty">Пока пусто</div>';
  return '<div class="pair run-pair"><div class="pane left"><div class="pane-heading"><span>script.js</span><span>ШАГ ' + (idx + 1) + ' / ' + total + '</span></div>' + codeWindow(d.code, { active: [t.line] })
    + '<div class="buttons"><button class="secondary" data-action="prev-step" ' + (idx === 0 ? 'disabled' : '') + '>← Шаг назад</button><button class="primary" data-action="next-step" ' + (idx === total - 1 ? 'disabled' : '') + '>Следующий шаг →</button><button class="secondary" data-action="reset-step" title="Сначала">↺</button><span class="key-hint">Пробел — шаг</span></div></div>'
    + '<div class="pane right"><div class="pane-heading"><span>ПАМЯТЬ И КОНСОЛЬ</span><span>что происходит</span></div><div class="mem-step">' + rich(t.label) + term(t.term) + '</div>'
    + '<div class="vt"><div class="caps">Переменные</div><div class="vt-grid' + (t.vars.length > 3 ? ' two' : '') + '">' + vars + '</div></div>'
    + '<div class="console-box"><div class="console-head"><span>Console</span><i>F12</i></div>' + logs + '</div></div></div>';
}
const liveSteps = (s) => (s.type === 'run' ? RUN[s.demo].steps.length - 1 : 0);

// Игра «Угадай тип»
function guessView(st) {
  st.open = st.open || {};
  const opened = Object.values(st.open).filter(Boolean).length;
  return '<div class="guess-grid">' + GUESS.map(([val, type], i) => '<button class="guess-card ' + (st.open[i] ? 'open ty-' + type : '') + '" data-action="guess" data-value="' + i + '"><code>' + hlJS(val) + '</code><span class="guess-ans">' + (st.open[i] ? 'typeof → "' + type + '"' + (val === 'null' ? ' ⚠' : '') : 'какой тип?') + '</span></button>').join('') + '</div>'
    + '<div class="buttons guess-bar"><button class="secondary" data-action="guess-all">Открыть все</button><button class="secondary" data-action="guess-reset">Закрыть все</button><span class="key-hint">Открыто: ' + opened + ' / ' + GUESS.length + '</span></div>';
}

// Лаборатория приведения
function jsRepr(v) {
  if (typeof v === 'string') return '"' + v + '"';
  if (Number.isNaN(v)) return 'NaN';
  return String(v);
}
const typeName = (v) => (v === null ? 'null' : typeof v);
function convertView(st) {
  const i = st.pick ?? 0, [label, v] = CONVERT[i];
  const rows = [
    ['typeof x', typeof v, 'string', 'тип значения'],
    ['Number(x)', Number(v), null, Number.isNaN(Number(v)) ? 'не получилось → NaN' : 'в число'],
    ['String(x)', String(v), null, 'в строку'],
    ['Boolean(x)', Boolean(v), null, Boolean(v) ? 'истинное (truthy)' : 'ложное (falsy)'],
  ];
  return '<div class="conv"><div class="conv-picks"><span class="caps">x =</span>' + CONVERT.map((c, k) => '<button class="conv-pick ' + (k === i ? 'on' : '') + '" data-action="conv" data-value="' + k + '">' + hlJS(c[0]) + '</button>').join('') + '</div>'
    + '<div class="conv-table">' + rows.map(([expr, res, forced, note]) => {
      const t = forced || typeName(res);
      const shown = expr === 'typeof x' ? '"' + res + '"' : jsRepr(res);
      return '<div class="conv-row"><code class="conv-expr">' + hlJS(expr.replace('x', label)) + '</code><span class="conv-arrow">→</span><code class="conv-res">' + hlJS(shown) + '</code>' + badge(t, t) + '<span class="conv-note">' + esc(note) + '</span></div>';
    }).join('') + '</div></div>';
}

function cover() {
  return '<div class="cover-grid"><div class="cover-copy"><div class="overline"><i></i> JAVASCRIPT <b></b> УРОК 2</div><h1>"5" + 2<br><span>= "52"?</span></h1><p>Типы данных: почему JS склеивает, а не складывает — и как это контролировать.</p><div class="pills"><span>string</span><span>number</span><span>boolean</span><span>undefined · null</span><span>typeof</span></div><button class="primary" data-action="next-slide">Начать урок →</button></div>'
    + '<div class="cover-art"><div class="art-glow"></div><div class="art-stage"><div class="art-card"><div class="art-heading"><span>JS LAB / 02</span><span>console</span></div>'
    + '<div class="cover-console">'
    + [['"5" + 2', '52', 'string'], ['"5" - 2', '3', 'number'], ['typeof "5"', 'string', 'string'], ['typeof null', 'object', 'object']].map(([e, r, t]) => '<div class="cc-row"><code>' + hlJS(e) + '</code><span>→</span><b class="log-' + t + '">' + esc(r) + '</b>' + badge(t, t) + '</div>').join('')
    + '</div><div class="art-input">' + hlJS('console.log(typeof "15"); // "string"') + '</div></div></div></div></div>';
}
function finish() {
  return '<div class="closing"><div class="closing-mark">{ }</div><span class="tag">УРОК 2 / ГОТОВО</span><h1>Сначала тип.<br><em>Потом действие.</em></h1><p>Строки склеиваются, числа складываются. typeof подскажет тип, Number / String / Boolean — превратят в нужный.</p><div class="end-tags"><span>typeof x</span><span>"5" + 2 → "52"</span><span>Number("42")</span><span>typeof null → "object"</span></div><div class="buttons" style="justify-content:center"><a class="primary" href="./materials/homework.zip" download>↓ Домашнее задание</a><a class="secondary" href="./materials/view.html?p=homework" target="_blank" rel="noopener">ТЗ домашки</a><a class="secondary" href="./materials/SUMMARY.md" download>↓ Шпаргалка</a></div><p class="lesson-note">Дальше: операторы — арифметика, сравнение, остаток от деления.</p></div>';
}

function formatTime(t) { return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); }
function toggleTimer() { const st = state(); st.remaining ??= slides[current].minutes * 60; st.running = !st.running; render(false); }
setInterval(() => {
  Object.keys(store).forEach((k) => {
    const st = store[k];
    if (!st.running) return;
    if (st.remaining > 0) st.remaining--;
    if (st.remaining === 0) { st.running = false; if (Number(k) === current) { render(false); notify('Время практики закончилось'); } }
    if (Number(k) === current) { const el = document.getElementById('timerDisplay'); if (el) el.textContent = formatTime(st.remaining); }
  });
}, 1000);

function render(isNavigation) {
  const s = slides[current], st = state();
  let content = '';
  switch (s.type) {
    case 'cover': content = cover(); break;
    case 'quiz': content = head(s) + quiz(s, st); break;
    case 'theory': content = head(s) + theoryView(s); break;
    case 'bugs': content = head(s) + bugsView(st); break;
    case 'practice': content = head(s) + practice(s, st); break;
    case 'summary': content = head(s) + summaryView(s); break;
    case 'glossary': content = head(s) + glossaryView(); break;
    case 'types': content = head(s) + typesView(); break;
    case 'run': content = head(s) + runView(s.demo, st); break;
    case 'guess': content = head(s) + guessView(st); break;
    case 'convert': content = head(s) + convertView(st); break;
    case 'end': content = finish(); break;
  }
  stage.innerHTML = '<section class="slide active ' + (isNavigation ? '' : 'instant') + ' ' + (s.type === 'cover' ? 'cover' : '') + ' type-' + s.type + '" aria-label="Слайд ' + (current + 1) + ' из ' + slides.length + '">' + (s.type === 'cover' || s.type === 'end' ? content : '<div class="slide-content">' + content + '</div>') + '</section>';
  stage.querySelectorAll('.sum-card code, .exc-card code').forEach((c) => { c.outerHTML = inlineCode(c.textContent); });
  fitCode();

  document.getElementById('sectionTitle').textContent = s.section;
  document.getElementById('currentTitle').textContent = removeTags(s.title);
  document.getElementById('slideCounter').textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  document.getElementById('segments').innerHTML = slides.map((_, i) => '<i class="' + (i < current ? 'done' : i === current ? 'now' : '') + '"></i>').join('');
  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').disabled = current === slides.length - 1;
  document.querySelectorAll('[data-slide]').forEach((b, i) => { b.classList.toggle('active', i === current); b.setAttribute('aria-current', i === current ? 'page' : 'false'); });
  document.getElementById('notesContent').innerHTML = '<h3>' + esc(removeTags(s.title)) + '</h3><p>' + esc(s.notes || '') + '</p><p><b>План на слайд:</b> ' + s.minutes + ' мин.</p>';
}
// Подбираем крупнейший шрифт, при котором код целиком помещается в окно
function fitCode() {
  // помещается ли код: высота — по scrollHeight, ширина — по самой длинной строке
  const fits = (pre) => {
    if (pre.scrollHeight > pre.clientHeight + 1) return false;
    const lines = pre.querySelectorAll('.code-line');
    if (!lines.length) return pre.scrollWidth <= pre.clientWidth + 1;
    let widest = 0;
    lines.forEach((l) => { widest = Math.max(widest, l.firstElementChild.offsetWidth + l.lastElementChild.offsetWidth); });
    return widest <= pre.clientWidth - 48;
  };
  stage.querySelectorAll('.code-pre, .ana-code').forEach((pre) => {
    const max = pre.classList.contains('ana-code') ? 104 : pre.closest('.quiz-right, .bug-col') ? 46 : 40;
    let lo = 18, hi = max;
    pre.style.overflow = '';
    pre.style.fontSize = hi + 'px';
    if (!fits(pre)) {
      while (hi - lo > 0.5) {
        const mid = (lo + hi) / 2;
        pre.style.fontSize = mid + 'px';
        if (fits(pre)) lo = mid; else hi = mid;
      }
      pre.style.fontSize = lo + 'px';
    }
    // даже на минимальном шрифте не влезает — разрешаем прокрутку и показываем активную строку
    if (!fits(pre)) {
      pre.style.overflow = 'auto';
      const act = pre.querySelector('.active-line');
      if (act) pre.scrollTop = Math.max(0, act.offsetTop - pre.clientHeight / 3);
    }
  });
}
let fitTimer;
window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitCode, 80); });
if (document.fonts) document.fonts.ready.then(fitCode);
function fromHash() { const h = Number(location.hash.replace('#', '')); return Number.isInteger(h) && h >= 1 && h <= slides.length ? h - 1 : 0; }
function go(i, push = true) { current = Math.max(0, Math.min(slides.length - 1, i)); if (push && location.hash !== '#' + (current + 1)) history.replaceState(null, '', '#' + (current + 1)); render(true); }
function closeOverlays() { document.getElementById('outlineOverlay').hidden = true; document.getElementById('notesOverlay').hidden = true; }
function toggleOverlay(id) { const el = document.getElementById(id), open = el.hidden; closeOverlays(); el.hidden = !open; if (open) el.querySelector('button')?.focus(); }
function notify(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => el.classList.remove('visible'), 1900); }
function stepBy(delta) { const st = state(), max = liveSteps(slides[current]); st.step = Math.max(0, Math.min(max, (st.step || 0) + delta)); render(false); }

stage.addEventListener('click', (e) => {
  const node = e.target.closest('[data-action]');
  if (!node) return;
  node.blur();
  const action = node.dataset.action, st = state(), v = node.dataset.value;
  if (action === 'next-slide') { go(current + 1); return; }
  if (action === 'answer') { st.answer = Number(v); render(false); return; }
  if (action === 'reset-answer') { delete st.answer; render(false); return; }
  if (action === 'timer') { toggleTimer(); return; }
  if (action === 'timer-reset') { st.remaining = slides[current].minutes * 60; st.running = false; render(false); return; }
  if (action === 'reset-step') { st.step = 0; render(false); return; }
  if (action === 'prev-step') { stepBy(-1); return; }
  if (action === 'next-step') { stepBy(1); return; }
  if (action === 'set-step') { st.step = Number(v); render(false); return; }
  if (action === 'guess') { st.open = st.open || {}; st.open[v] = !st.open[v]; render(false); return; }
  if (action === 'guess-all') { st.open = Object.fromEntries(GUESS.map((_, i) => [i, true])); render(false); return; }
  if (action === 'guess-reset') { st.open = {}; render(false); return; }
  if (action === 'conv') { st.pick = Number(v); render(false); return; }
  if (action === 'bug') { st.open = st.open || {}; st.open[Number(v)] = true; render(false); return; }
  if (action === 'bug-pick') { st.bug = Number(v); render(false); return; }
  if (action === 'print') { window.print(); }
});
document.getElementById('prevBtn').addEventListener('click', () => go(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => go(current + 1));
document.getElementById('outlineBtn').addEventListener('click', () => toggleOverlay('outlineOverlay'));
document.getElementById('notesBtn').addEventListener('click', () => toggleOverlay('notesOverlay'));
function setThemeLabel() { const light = document.body.classList.contains('light'); document.getElementById('themeToggle').innerHTML = light ? '<span>☾</span>Тёмная' : '<span>☀</span>Светлая'; }
function toggleTheme() { document.body.classList.toggle('light'); try { localStorage.setItem('js-lab-theme-v2', document.body.classList.contains('light') ? 'light' : 'dark'); } catch (e) { /* */ } setThemeLabel(); }
document.getElementById('themeBtn').addEventListener('click', toggleTheme);
document.getElementById('themeToggle').addEventListener('click', (e) => { e.currentTarget.blur(); toggleTheme(); });
document.getElementById('fullscreenBtn').addEventListener('click', () => { if (document.fullscreenElement) document.exitFullscreen?.(); else document.documentElement.requestFullscreen?.(); });
document.querySelectorAll('[data-close]').forEach((n) => n.addEventListener('click', closeOverlays));
document.getElementById('outlineList').innerHTML = slides.map((s, i) => '<button type="button" data-slide="' + i + '"><strong>' + String(i + 1).padStart(2, '0') + '</strong><span>' + esc(removeTags(s.title)) + '</span></button>').join('');
document.getElementById('outlineList').addEventListener('click', (e) => { const n = e.target.closest('[data-slide]'); if (n) { closeOverlays(); go(Number(n.dataset.slide)); } });
window.addEventListener('hashchange', () => { const next = fromHash(); if (next !== current) go(next, false); });
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeOverlays(); return; }
  if (!document.getElementById('outlineOverlay').hidden || !document.getElementById('notesOverlay').hidden) return;
  const typing = e.target && (e.target.tagName === 'TEXTAREA' || e.target.isContentEditable || (e.target.tagName === 'INPUT' && /^(text|search|email|number)$/.test(e.target.type)));
  if (typing) return;
  const s = slides[current];
  if ((s.type === 'run') && (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown')) { e.preventDefault(); stepBy(1); return; }
  if ((s.type === 'run') && e.key === 'ArrowUp') { e.preventDefault(); stepBy(-1); return; }
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(current + 1); return; }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(current - 1); return; }
  if (e.key === 'Home') { e.preventDefault(); go(0); } else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
  else if (e.key.toLowerCase() === 'g') toggleOverlay('outlineOverlay');
  else if (e.key.toLowerCase() === 'n') toggleOverlay('notesOverlay');
  else if (e.key.toLowerCase() === 't') document.getElementById('themeBtn').click();
  else if (e.key.toLowerCase() === 'f') document.getElementById('fullscreenBtn').click();
}, true);
try { if (localStorage.getItem('js-lab-theme-v2') === 'dark') document.body.classList.remove('light'); else document.body.classList.add('light'); } catch (e) { document.body.classList.add('light'); }
setThemeLabel();
// Холст 1920×1080 масштабируется под окно
const deck = document.getElementById('deck');
function scaleDeck() { deck.style.setProperty('--s', Math.min(innerWidth / 1920, innerHeight / 1080)); }
scaleDeck();
window.addEventListener('resize', scaleDeck);
// Панель настроек появляется при движении мыши и прячется через 2.5 с
const hud = document.getElementById('hud');
let hudTimer;
window.addEventListener('mousemove', () => { hud.classList.add('visible'); clearTimeout(hudTimer); hudTimer = setTimeout(() => { if (!hud.matches(':hover')) hud.classList.remove('visible'); }, 2500); });
if (!location.hash) history.replaceState(null, '', '#1');
current = fromHash();
render(true);
