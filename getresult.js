(function(){
    'use strict';
    /**
     * TODO: 診断メーカー実装
     */
    const test = 'Sample';
    const sampleName = '名無し';
    const usrNameInput = document.getElementById('user-name');  // ユーザーネーム取得
    const resButton = document.getElementById('sindan');        // ボタン処理
    const resultSpace = document.getElementById('result');      // 結果表示エリア
    const tweetDiv = document.getElementById('tweet-area');

    const fortune_list = [
        '大吉',
        '中吉',
        '小吉',
        '吉',
        '半吉',
        '末吉',
        '凶'
    ];
    const nowtime = new Date();

    // func
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function nameToNum(name){
        let sum = 0;
        for (let i = 0; i < name.length; i ++) {
            sum += name.charCodeAt(i);
        }
        return sum;
    }

    // おみくじ
    function yourFortune(name){
        // let seed = Math.floor(Math.random() * 100);
        let month = nowtime.getMonth() + 1;
        let day = nowtime.getDate();
        let seed  = month * day % 100;
        let index = (nameToNum(name) + seed) % fortune_list.length;
        return fortune_list[index];
    }

    // 結果の取得
    function res(name){
        /**
         * @param {string} name user name
         * @return {string} 診断結果
         */
        const text = name + ' さんの今日の運勢は' + yourFortune(name) + 'です';
        return text;
    }

    // 日にちの取得
    function date(){
        const day = nowtime.getDate();
        const month = nowtime.getMonth() + 1;
        const year = nowtime.getFullYear();
        return year + '年' + month + '月' + day + '日';
    }

    resButton.onclick = () => {
        let usrName = usrNameInput.value;
        if (usrName === '') {
            usrName = sampleName;
        }
        removeAllChildren(resultSpace);
        removeAllChildren(tweetDiv);

        // 結果の出力
        const result = res(usrName);

        const header = document.createElement('h3');
        header.innerText = date() + 'の運勢';
        resultSpace.appendChild(header);

        const text = document.createElement('p');
        text.innerText = result;
        resultSpace.appendChild(text);

        // TODO: ツイートボタンの作成
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたの運勢&ref_src=twsrc%5Etfw&text=' + result;
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #今日の運勢';
        tweetDiv.appendChild(anchor);
        twttr.widgets.load();
    };
    usrNameInput.onkeydown = (event) => {
        if (event.keyCode === 13){
            resButton.onclick();
        }
    };
})();
