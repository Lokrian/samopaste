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
// Получает ответ из popup.js и записывает его в sessionStorage
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

            console.log(answers);

            if (data) {
                port.postMessage({
                    exists: true,
                });
            } else {
                port.postMessage({
                    exists: false,
                });
            }
        }
    });
});

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
//Устанавливает ответы в массив answer из sessionStorage
const setAnswers = function () {
    answers.push(sessionStorage.getItem('email'));
    answers.push(sessionStorage.getItem('option'));
};
// Массив с словами триггерами
const harmfulWords = [
    'сотрудник',
    'сотрудники',
    'сотрудниками',
    'сотрудникам',
    'включен',
    'включена',
    'включён',
    'оформлен',
    'оформлена',
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
    'решился',
    'решилась',
    'создан',
    'создана',
];
// Ищет ответы оператора, сканирует их на слова триггеры и показывает на странице
const showHarmfulWords = function () {
    setTimeout(() => {
        const operAnswersBlock = document.querySelectorAll(
            '.message__item__content__text'
        );

        findBadAnswerBlock(operAnswersBlock);
    }, 3000);
};
// Ищет блок со словом триггером
const findBadAnswerBlock = function (answersBlocks) {
    for (let answerBlock of answersBlocks) {
        const answerWordsArray = answerBlock.innerText.split(' ');
        for (let harmfulWord of harmfulWords) {
            for (let word of answerWordsArray) {
                if (
                    word.toLowerCase().replace(/[\s.,%]/g, '') ==
                    harmfulWord.toLowerCase()
                ) {
                    const changedAnswerBlockHTML =
                        answerBlock.innerHTML.replace(
                            word,
                            `<i style="color: red;">${word}</i>`
                        );
                    answerBlock.innerHTML = changedAnswerBlockHTML;
                }
            }
        }

        // if (answerBlock.innerText.toLowerCase().includes(harmfulWord)) {
        //     console.log(harmfulWord, answerBlock);
        //     const harmfulWordWithoutCase = new RegExp(harmfulWord, 'gi');
        //     const changedAnswerBlockHTML = answerBlock.innerHTML.replace(
        //         harmfulWordWithoutCase,
        //         `<i style="color: red;">${harmfulWord}</i>`
        //     );
        //     answerBlock.innerHTML = changedAnswerBlockHTML;
        // }
        // }
    }
};

// Запускает логику в зависимости от того, где находится пользователь
const start = function () {
    if (
        window.location.origin === 'https://portal.infobip.com' ||
        window.location.origin === 'https://portal-ru.infobip.com'
    ) {
        showHarmfulWords();
        console.log(window.location.origin);
    } else {
        setAnswers();
        setButtonOnPage();
    }
};

start();
