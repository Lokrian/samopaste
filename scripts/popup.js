'use strict';
const navBlock = `
            <div class="nav">
                <div class="info-about-chat">Информация о чате</div>
                <div class="copy-page">Теги</div>
                <div class="contacts">Контакты и вопросы</div>
            </div>
`;

const divContent = `
        <div id="content"></div>
    `;

const contentOfCopyPage = `
        <div class="copy-page">
            <div class="tags">
                <h3>ТЕГИ</h3>
                    <ul>
                        <li class="click-for-copy-list-item" clipboard-value="«Ошибка очереди Лия»">«Ошибка очереди Лия»</li>
                        <li class="click-for-copy-list-item" clipboard-value="«Лия плохой ответ»">«Лия плохой ответ»</li>
                        <li class="click-for-copy-list-item" clipboard-value="«Неверный перевод»">«Неверный перевод»</li>
                    </ul>
            </div>
            <div class="signs">
                <h3>ЗНАКИ</h3>
                <ul>
                    <li class="click-for-copy-list-item" clipboard-value="«»">Кавычки: «»</li>
                    <li class="click-for-copy-list-item" clipboard-value="—">Длинное тире: —</li>
                    <li class="click-for-copy-list-item" clipboard-value="–">Короткое тире: –</li>
                    <li class="click-for-copy-list-item" clipboard-value="−">Минус: −</li>
                    <li class="click-for-copy-list-item" clipboard-value="→">Стрелочка: →</li>
                </ul>
            </div>
        </div>
    `;

const divRepeatedWords = `
    <div id="repeated-words"></div>
`;

// Отправляет запрос в content и узнаёт, есть ли в sessionStorage email. Если ответ не пустой заполняет поле email
const checkIfEmailIsSaved = async function (e) {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);

    // Открываем соединение
    const port = chrome.tabs.connect(tabs[0].id, {
        name: 'checkEmail',
    });

    port.postMessage({
        msg: 'Do u have any email on your side?',
    });

    port.onMessage.addListener(function (msg) {
        if (msg.email) {
            document.getElementById('email-input').value = msg.email;
        } else {
            console.log('Empty!');
        }
    });
};
// Создаёт объект data и записывает в него email и выбранное направление
const copyData = function (tabUrl) {
    let data = {};
    const email = document.getElementById('email-input');
    const option = document.getElementById('branches');

    validEmail(email, email.value);
    // Checks the object for the presence of values ​​in it, if there are, it deletes it.
    if (Object.keys(data).length > 0) {
        data = {};
    }

    data.email = email.value;
    data.option = option.value;

    return data;
};
// Проверяет поле email, если оно пустое, назначет ему дополнительный класс и placeholder
const validEmail = function (email, value) {
    if (value == '') {
        email.classList.add('red-placeholder');
        email.placeholder = 'E-mail останется пустым!';
    }
};
// Передаёт блоку data-changed стиль inline-block. Сообщает пользователю, что данные созранены.
const notifyDataSaved = () => {
    document.getElementById('data-changed').style = 'display: inline-block;';
    setTimeout(() => {
        document.getElementById('data-changed').style = 'display: none;';
    }, 1500);
};
// Передаёт в content.js данные из формы
const sendDataToActiveWindow = function () {
    const copyButton = document.getElementById('copy-button');

    copyButton.onclick = async function (e) {
        let queryOptions = { active: true, currentWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);

        // Открываем соединение
        const port = chrome.tabs.connect(tabs[0].id, {
            name: 'formport',
        });

        // Берёт данные из copyData и отправляет их в content.js
        const data = copyData(tabs[0].url);
        port.postMessage({
            data,
        });

        port.onMessage.addListener(function (msg) {
            if (msg.exists) {
                console.log('Done');
            } else {
                console.log('Something wrong!');
            }
        });

        notifyDataSaved();
    };
};
// Заполняет страницу html кодом, если пользователь на сайте с вводом формы
const showFillFormPage = function () {
    const body = document.getElementById('body');

    body.insertAdjacentHTML(
        'afterbegin',
        `
    <div class="form-content">
    <h3>ВСТАВЛЯТЕЛЬ</h3>
    <form action="" class="form">
        <p>E-MAIL</p>
        <input id="email-input" type="text" class="email-input">
        <p>НАПРАВЛЕНИЕ</p>
        <select name="branches" id="branches" class="branches">
            <option value="Пусто">Пусто</option>
            <option value="Чат-поддержка, 1 линия">Чат-поддержка, 1 линия</option>
            <option value="Чат-поддержка, 2 линия">Чат-поддержка, 2 линия</option>
            <option value="Дополнительные каналы">Дополнительные каналы</option>
            <option value="Почта">Почта</option>
            <option value="Претензии">Претензии</option>
            <option value="Голосовая линия">Голосовая линия</option>
            <option value="SMS">SMS</option>
            <option value="Отзывы SMS">Отзывы SMS</option>
            <option value="Операционный блок">Операционный блок</option>
            <option value="КМС">КМС</option>
            <option value="Опоздания (чаты)">	Опоздания (чаты)</option>
            <option value="Опоздания (звонки)">Опоздания (звонки)</option>
        </select>
    </form>
    <p id="data-changed">Данные сохранены!</p>
    <div class="copy-button" id="copy-button">ЗАПОМНИТЬ</div>
    </div>
    <div class="info" id="info">
    
</div>
    `
    );
};
// Отправляет запрос в content.js и в зависимости от ответа заполняет html
const makeRequestForWrongWords = async function (e) {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);

    // Открываем соединение
    const port = chrome.tabs.connect(tabs[0].id, {
        name: 'mistakeWord',
    });

    port.postMessage({
        request: 'Please, send me words!',
    });

    port.onMessage.addListener(function (msg) {
        showInfoAboutWrongWords(msg);
    });
};

const makeRequestForNumberOfWords = async function (e) {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);

    // Открываем соединение
    const port = chrome.tabs.connect(tabs[0].id, {
        name: 'wordCounter',
    });

    port.postMessage({
        request: 'I need your help, dude!',
    });

    port.onMessage.addListener(function (msg) {
        delete msg.repeatedWords.status;
        showCountedWords(msg.repeatedWords);
    });
};

const renderNav = () => {
    const body = document.getElementById('body');
    body.innerHTML = '';
    body.insertAdjacentHTML('beforeend', divContent);
    body.insertAdjacentHTML('afterbegin', navBlock);

    document.querySelector('.info-about-chat').addEventListener('click', () => {
        renderBonesForChatInfoPage();
    });
    document.querySelector('.copy-page').addEventListener('click', () => {
        renderCopyPage();
    });
};

const renderBonesForChatInfoPage = () => {
    renderNav();

    const divWrongWords = `
        <div id="wrong-words"></div>
    `;
    document
        .getElementById('content')
        .insertAdjacentHTML('beforeend', divWrongWords);
    const blockWrongWords = document.getElementById('wrong-words');

    const blockScanningChat = `
    <div class="scan-chat">
        <h1>Чат сканируется</h1>
        <img src='../icons/loading.gif' alt='загрузка'>
    </div>    
    `;
    blockWrongWords.insertAdjacentHTML('beforeend', blockScanningChat);

    makeRequestForWrongWords();
    makeRequestForNumberOfWords();
};

const showInfoAboutWrongWords = (msg) => {
    const blockWrongWords = document.getElementById('wrong-words');

    if (msg.length < 1) {
        blockWrongWords.innerHTML = '';
        blockWrongWords.insertAdjacentHTML(
            'afterbegin',
            `
                <h2>Не нашёл незнакомых слов</h2>
            `
        );
    } else {
        blockWrongWords.innerHTML = '';
        blockWrongWords.insertAdjacentHTML(
            'afterbegin',
            `
                <h2>Не знаю слова: </h2>
                <list id="wrong-words-list"></list>
            `
        );
        msg.map((word) => {
            document.getElementById('wrong-words-list').insertAdjacentHTML(
                'beforeend',
                `
                    <li>${word}</li>
                `
            );
        });
    }
};

const showCountedWords = (repeatedWords) => {
    document
        .getElementById('content')
        .insertAdjacentHTML('beforeend', divRepeatedWords);
    const blockRepeatedWords = document.getElementById('repeated-words');
    blockRepeatedWords.insertAdjacentHTML(
        'afterbegin',
        `<h2>Повторы слов</h2>`
    );
    for (let key in repeatedWords) {
        if (repeatedWords[key] > 2) {
            blockRepeatedWords.insertAdjacentHTML(
                'beforeend',
                `<p>Слово <strong style="text-transform: uppercase;">${key}</strong> повторяется в чате ${repeatedWords[key]} раз(а)</p><br>`
            );
        }
    }
};

const renderCopyPage = () => {
    const body = document.getElementById('body');
    if (!document.getElementById('content')) {
        body.insertAdjacentHTML('beforeend', divContent);
    }
    const contentBlock = document.getElementById('content');

    contentBlock.innerHTML = '';

    contentBlock.insertAdjacentHTML('afterbegin', contentOfCopyPage);

    const listItems = document.querySelectorAll('.click-for-copy-list-item');
    const copyListItemData = (item) => {
        navigator.clipboard
            .writeText(item.attributes['clipboard-value'].value)
            .then(() => {
                document
                    .getElementById('body')
                    .insertAdjacentHTML(
                        'afterbegin',
                        `<div class="copied-banner">Скопировано</div>`
                    );
                setTimeout(() => {
                    document.querySelector('.copied-banner').remove();
                }, 400);
            });
    };
    for (let item of listItems) {
        item.addEventListener('click', () => {
            copyListItemData(item);
        });
    }
};
// Запускает логику. Проверяет на каком сайте пользователь и в зависимости от этого, рисует html
const validUrl = async function () {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);

    if (
        tabs[0].url.includes(
            'https://docs.google.com/forms/d/e/1FAIpQLSfBav-cTnb1nqIdXCLJQCv1xfnY_gsu2WkCO72B-hWAdk1McQ/viewform'
        )
    ) {
        showFillFormPage();
        checkIfEmailIsSaved();
        sendDataToActiveWindow();
    } else if (
        tabs[0].url.includes(
            'https://portal.infobip.com/conversations/my-work'
        ) ||
        tabs[0].url.includes(
            'https://portal-ru.infobip.com/conversations/my-work'
        ) ||
        tabs[0].url.includes(
            'https://portal2.infobip.com/conversations/my-work'
        )
    ) {
        renderBonesForChatInfoPage();
    } else {
        renderCopyPage();
    }
};

validUrl();
