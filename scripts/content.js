'use strict';
// Email и направление для формы Google Form из sessionStorage
let answers = [];
// Массив с направлениями, их именами и селекторами к ним.
const options = [
    {
        'name': 'Пусто',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div.MocG8c.HZ3kWc.mhLiyf.LMgvRb.DEh1R',
    },
    {
        'name': 'Чат-поддержка, 1 линия',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(3)',
    },
    {
        'name': 'Чат-поддержка, 2 линия',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(4)',
    },
    {
        'name': 'Дополнительные каналы',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(5)',
    },
    {
        'name': 'Почта',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(6)',
    },
    {
        'name': 'Претензии',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(7)',
    },
    {
        'name': 'Голосовая линия',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(8)',
    },
    {
        'name': 'SMS',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(9)',
    },
    {
        'name': 'Отзывы SMS',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(10)',
    },
    {
        'name': 'Операционный блок',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(11)',
    },
    {
        'name': 'КМС',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(12)',
    },
    {
        'name': 'Опоздания (чаты)',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(13)',
    },
    {
        'name': 'Опоздания (звонки)',
        'selector':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div:nth-child(14)',
    },
];
// Массив со словами триггерами
const harmfulWords = [
    'сотрудник',
    'сотрудника',
    'сотруднику',
    'сотрудником',
    'сотруднике',
    'сотрудники',
    'сотрудниками',
    'сотрудникам',
    'сотрудников',
    'сотрудниках',
    'включен',
    'включена',
    'включён',
    // 'оформлен',
    // 'оформлена',
    'оплачен',
    'оплачена',
    'проведен',
    'проведена',
    'проведён',
    'выявлен',
    'выявлена',
    'указан',
    'указана',
    "'",
    'замечено',
    'замечена',
    'замечен',
    'зарегистрировано',
    'зарегистрирована',
    'зарегистрирован',
    'установлен',
    'установлено',
    'установлена',
    'установлены',
    'решился',
    'решилась',
    'решилось',
    'создан',
    'создана',
    'создано',
    'созданы',
    'сделан',
    'сделана',
    'сделаны',
    'ЦФЗ',
    'вебфон',
    'хаб',
    'задача',
    'задачу',
    'сэмпл',
    'средства',
    'ожидайте',
    'ожидание',
    'ожидаем',
    'прощения',
    'склад',
    'склада',
    'складу',
    'складом',
    'складе',
    'склады',
    'складов',
    'складам',
    'складами',
    'складах',
    'внимательнее',
    'магазин-склад',
    'магазин-складе',
    'магазин-склада',
    'магазином-складом',
    '',
];
// Массив со словами названиями секций приложения
const sectionsWords = [
    'корзина',
    'корзины',
    'корзине',
    'корзину',
    'корзиной',
    'корзиною',
    'профиль',
    'профиля',
    'профиле',
    'профилю',
    'профилем',
    'комментарий',
    'комментария',
    'комментарием',
    'комментарии',
    'комментариях',
    '',
];
// Объект с ключами в форме слова, которе проверяется на повторы в чате. Элемент содержит массив со склонёнными словами от имени ключа.
const wordsCheckedForRepeat = {
    'курьер': [
        'курьер',
        'курьера',
        'курьеру',
        'курьером',
        'курьере',
        'курьеры',
        'курьеров',
        'курьерах',
        'курьерам',
        'курьерами',
    ],
    'коллеги': [
        'коллега',
        'коллеги',
        'коллеге',
        'коллегу',
        'коллегой',
        'коллегами',
        'коллегам',
        'коллег',
        'коллегах',
    ],
    'телефон': [
        'телефон',
        'телефона',
        'телефону',
        'телефоном',
        'телефоне',
        'телефоны',
        'телефонов',
        'телефонам',
        'телефонами',
        'телефонах',
    ],
    'даркстор': [
        'даркстор',
        'даркстора',
        'даркстору',
        'даркстором',
        'дарксторе',
        'дарксторы',
        'дарксторов',
        'дакрсторам',
        'дарксторами',
    ],
    'товар': [
        'товар',
        'товара',
        'товару',
        'товаром',
        'товаре',
        'товары',
        'товаров',
        'товарам',
        'товарами',
        'товарах',
    ],
    'скидка': [
        'скидка',
        'скидки',
        'скидке',
        'скидку',
        'скидкой',
        'скидкою',
        'скидок',
        'скидкам',
        'скидками',
        'скидках',
    ],
    'заказ': [
        'заказ',
        'заказа',
        'заказу',
        'заказом',
        'заказе',
        'заказы',
        'заказов',
        'заказам',
        'заказами',
        'заказах',
    ],
    'информация': [
        'информация',
        'информации',
        'информацию',
        'информацией',
        'информаций',
        'информациям',
        'информациями',
        'информациях',
    ],
    'продукт': [
        'продукт',
        'продукта',
        'продукту',
        'продуктом',
        'продукте',
        'продукты',
        'продуктов',
        'продуктам',
        'продуктами',
        'продуктах',
    ],
    'приложение': [
        'приложение',
        'приложения',
        'приложению',
        'приложением',
        'приложении',
        'приложения',
        'приложений',
        'приложениям',
        'приложениями',
        'приложениях',
    ],
    'покупка': [
        'покупка',
        'покупки',
        'покупке',
        'покупку',
        'покупкой',
        'покупкою',
        'покупок',
        'покупкам',
        'покупками',
        'покупках',
    ],
    'ответ': [
        'ответ',
        'ответа',
        'ответу',
        'ответом',
        'ответе',
        'ответы',
        'ответов',
        'ответам',
        'ответами',
        'ответах',
    ],
    'фото': ['фото'],
    'пожалуйста': ['пожалуйста'],
};
// Изменяемый объект, в который записывается, в формате слово: число, слово и сколько раз оно повторяется в чате.
let repeatedWords = {};
// Массив с объектами кнопок, которые рисуются в зависимости от страницы. У каждой кнопки свой функционал.
const buttons = [
    {
        'page': 'form',
        'id': 'paste-data-button',
        'block': `<div id='paste-data-button' class='paste-button'>Вставить</div>`,
        'place':
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd',
        'point': 'afterend',
        'urlOfPage':
            'https://docs.google.com/forms/d/e/1FAIpQLSfBav-cTnb1nqIdXCLJQCv1xfnY_gsu2WkCO72B-hWAdk1McQ/viewform',
        dropdownBlockSelector:
            '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div:nth-child(1) > div.ry3kXd',
        branch: '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.vQES8d > div > div.OA0qNb.ncFHed.QXL7Te > div.MocG8c.HZ3kWc.mhLiyf.LMgvRb.DEh1R',
        email: '',

        init() {
            this.setEmail();
            this.setBranch();
            this.fillFields();
        },
        setEmail() {
            if (answers[0] != null) {
                this.email = answers[0];
            }
        },
        setBranch() {
            for (let option of options) {
                if (option['name'] == answers[1]) {
                    this.branch = option['selector'];
                }
            }
            console.log(this.branch);
        },
        // First, find
        fillFields() {
            this.fillEmailField();
            this.fillBranchSelector();
        },
        // Если email пользователя не пуст, находит input с email, фокусирует, очищает и заполняет его
        fillEmailField() {
            const emailField = document.querySelector(
                '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(1) > div > div:nth-child(1) > div.rFrNMe.k3kHxc.RdH0ib.yqQS1.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input'
            );
            if (
                emailField.getAttribute('data-initial-value') !== this.email &&
                this.email != ''
            ) {
                emailField.focus();
                document.execCommand('selectAll', false, '');
                document.execCommand('insertText', false, this.email);
            }
        },
        // Кликает на dropdown, а затем кликает на нужную ветку
        fillBranchSelector() {
            const dropdownBlock = document.querySelector(
                this.dropdownBlockSelector
            );
            dropdownBlock.click();

            setTimeout(() => {
                const branch = document.querySelector(this.branch);
                branch.click();
            }, 300);
        },
    },
];
// Содержит состояние(прошла ли операция по поиску слов на странице) и, если они есть, слова с ошибками.
let answerWithMistakeWords = {
    status: 'Operation in progress',
    wordsWithMistakes: [],
};
/*  Получает ответ из popup.js и записывает его в sessionStorage
    Получает запрос из popup.js на наличие слов с ошибочными словами на странице и отправляет их обратно, чтобы отрисовать в popup
    Получает запрос из popup.js на проверку наличия данных в поле email в sessionStorage */
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (port.name === 'formport') {
            const data = msg.data;

            if (answers.length > 0) {
                answers = [];
            }

            for (let key in data) {
                sessionStorage.setItem(key, data[key]);
                answers.push(sessionStorage.getItem(key));
            }

            if (data) {
                port.postMessage({
                    exists: true,
                });
            } else {
                port.postMessage({
                    exists: false,
                });
            }
        } else if (port.name === 'mistakeWord') {
            let sendingInterval = setInterval(() => {
                if (answerWithMistakeWords.status === 'Operation in progress') {
                    console.log('Operation in progress');
                } else if (
                    answerWithMistakeWords.status === 'Operation is complete'
                ) {
                    port.postMessage(answerWithMistakeWords.wordsWithMistakes);
                    clearInterval(sendingInterval);
                    console.log('Stopped');
                }
            }, 1000);
            // Принудительно выключает интервал через 15 секунд
            setTimeout(() => {
                clearInterval(sendingInterval);
            }, 15000);
        } else if (port.name === 'checkEmail') {
            const email = sessionStorage.getItem('email');
            port.postMessage({
                email,
            });
        } else if (port.name === 'wordCounter') {
            let sendingInterval = setInterval(() => {
                if (repeatedWords.status) {
                    port.postMessage({ repeatedWords });
                    clearInterval(sendingInterval);
                }
            }, 1000);

            // Принудительно выключает интервал через 15 секунд
            setTimeout(() => {
                clearInterval(sendingInterval);
            }, 15000);
        }
    });
});
// Класс для создания разных кнопок на разных страницах
class Button {
    constructor(
        button,
        buttonPage,
        buttondId,
        buttonBlock,
        buttonPlace,
        buttonPoint
    ) {
        this.button = button;
        this.buttonPage = buttonPage;
        this.buttondId = buttondId;
        this.buttonBlock = buttonBlock;
        this.buttonPlace = buttonPlace;
        this.buttonPoint = buttonPoint;
        this.createButton();
    }
    // Создаёт кнопку на странице
    createButton() {
        const button = this.buttonBlock;
        const buttonPlace = document.querySelector(this.buttonPlace);

        buttonPlace.insertAdjacentHTML(this.buttonPoint, button);
        this.makeButtonActive();
    }
    makeButtonActive() {
        document
            .getElementById(this.buttondId)
            .addEventListener('click', () => {
                this.button.init();
            });
    }
}
// Проходит по массиву buttons. Если url на котором находится пользователь совпадает с url указанным в кнопке, создаёт её.
const setButtonOnPage = function () {
    for (let button of buttons) {
        if (window.location == button['urlOfPage']) {
            new Button(
                button,
                button['page'],
                button['id'],
                button['block'],
                button['place'],
                button['point']
            );
        }
    }
};
// Устанавливает ответы в массив answer из sessionStorage
const setAnswers = function () {
    answers.push(sessionStorage.getItem('email'));
    answers.push(sessionStorage.getItem('option'));
};
// Ищет все ответы оператора в чате и запускает проверки
const initOperAnswers = function () {
    setTimeout(() => {
        const operAnswersBlocks = document.querySelectorAll(
            '.message__item.outbound > .message__item__content.fs-exclude > .message__item__content__body > .message__item__content__text > span'
        );
        findBadAnswerBlock(operAnswersBlocks);
    }, 4500);
};
// Проходит по массиву всех ответов оператора и создаёт массив со словами из проверяемого блока, далее запускает проверку этого массива
const findBadAnswerBlock = function (answersBlocks) {
    for (let answerBlock of answersBlocks) {
        let re = / |\n/;
        const arrayOfWordsFromAnswer = answerBlock.innerText.split(re);
        countWordsInChat(arrayOfWordsFromAnswer);
        findWrongWordsInAnswerBlock(answerBlock, arrayOfWordsFromAnswer);
        checkCorrectNamesOfSections(answerBlock, arrayOfWordsFromAnswer);
        checkMistakesInWords(answerBlock.innerText);
    }
    answerWithMistakeWords.status = 'Operation is complete';
    repeatedWords.status = 'Operation is complete';
};
// Проверяет есть ли в блоке с ответом неверные слова
const findWrongWordsInAnswerBlock = function (
    answerBlock,
    arrayOfWordsFromAnswer
) {
    for (let harmfulWord of harmfulWords) {
        for (let word of arrayOfWordsFromAnswer) {
            if (
                word.toLowerCase().replace(/[\s.,?!%]/g, '') ==
                harmfulWord.toLowerCase()
            ) {
                setChangedWordToAnswerBlock(answerBlock, word);
            }
        }
    }
};
// Выделяет в блоке с ответом оператора слово, которое оказалось ошибочным.
const setChangedWordToAnswerBlock = function (answerBlock, badWord) {
    const changedAnswerBlockHTML = answerBlock.innerHTML.replace(
        badWord,
        `<i style="color: red;">${badWord}</i>`
    );
    answerBlock.innerHTML = changedAnswerBlockHTML;
};
// Проверяет блок с ответом оператора на наличие слов из секций приложения, которые написаны с маленькой буквы
const checkCorrectNamesOfSections = function (
    answerBlock,
    arrayOfWordsFromAnswer
) {
    for (let sectionWord of sectionsWords) {
        if (sectionWord != '') {
            for (let word of arrayOfWordsFromAnswer) {
                if (word != '') {
                    const wordUpperFirstLetter =
                        word[0].toUpperCase() + word.slice(1);

                    if (
                        word.toLowerCase().replace(/[\s.,%]/g, '') ==
                            sectionWord.toLowerCase() &&
                        wordUpperFirstLetter != word
                    ) {
                        setChangedWordToAnswerBlock(answerBlock, word);
                    }
                } else {
                    console.log('Wazup my boy!');
                }
            }
        }
    }
};
// Отправляет запрос на сайт яндекса с текстом, в котором нужно проверить слова
const checkMistakesInWords = async function (text) {
    let response = await fetch(
        'https://speller.yandex.net/services/spellservice.json/checkText?text=' +
            text
    );

    if (response.ok) {
        response.json().then((result) => {
            if (result[0]) {
                answerWithMistakeWords.wordsWithMistakes.push(result[0].word);
            }
        });
    }
};
// Считает количество повторяемых слов, которые входят в объект wordsCheckedForRepeat и записывает их в repeatedWords.
const countWordsInChat = function (words) {
    // Проходим по всем словам и применяем к ним логику.
    words.forEach((e) => {
        e = e.toLowerCase();
        e = e.replace(/[\.,%?!]/g, '');
        // Проходит по объекту wordsCheckedForRepeat ключами
        for (let key in wordsCheckedForRepeat) {
            // Проходит по массиву, который находится под ключом. Каждый элемент массива сравнивает со словом, которе записано в 'e'
            wordsCheckedForRepeat[key].map((scannedWord) => {
                if (e === scannedWord) {
                    if (Object.keys(repeatedWords).includes(key)) {
                        repeatedWords[`${key}`]++;
                    } else {
                        repeatedWords[`${key}`] = 1;
                    }
                }
            });
        }
    });
};
// Запускает логику в зависимости от того, где находится пользователь
const start = function () {
    if (
        window.location.origin === 'https://portal.infobip.com' ||
        window.location.origin === 'https://portal-ru.infobip.com' ||
        window.location.origin === 'https://portal2.infobip.com'
    ) {
        initOperAnswers();
    } else {
        setAnswers();
        setButtonOnPage();
    }
};

start();
