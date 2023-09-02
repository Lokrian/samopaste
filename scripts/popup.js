'use strict';
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
const showChatInfoPage = async function (e) {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);

    const body = document.getElementById('body');
    const divWrapper = `
        <div id="wrapper"></div>
    `;
    body.insertAdjacentHTML('beforeend', divWrapper);
    const blockWraper = document.getElementById('wrapper');

    const blockScanningChat = `
    <div class="scan-chat">
        <h1>Чат сканируется</h1>
        <img src='../icons/loading.gif' alt='загрузка'>
    </div>    
    `;
    blockWraper.insertAdjacentHTML('beforeend', blockScanningChat);

    // Открываем соединение
    const port = chrome.tabs.connect(tabs[0].id, {
        name: 'mistakeWord',
    });

    port.postMessage({
        request: 'Please, send me words!',
    });

    port.onMessage.addListener(function (msg) {
        if (msg.length < 1) {
            blockWraper.innerHTML = '';
            blockWraper.insertAdjacentHTML(
                'afterbegin',
                `
                    <h2>Не нашёл незнакомых слов</h2>
                `
            );
        } else {
            blockWraper.innerHTML = '';
            blockWraper.insertAdjacentHTML(
                'afterbegin',
                `
                    <h2>Я не знаю слова: </h2>
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
    });
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
        showChatInfoPage();
    } else {
        const body = document.getElementById('body');
        body.innerHTML = `<h1 class='wrong-url'>Перейдите на страницу с чатом или отправкой формы</h1>`;
    }
};

validUrl();
