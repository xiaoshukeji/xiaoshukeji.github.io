var lrc = `[00:00.00]キミがいれば (十字路ヴァージョン) - Reiko
[00:05.08]词：高柳恋
[00:10.17]曲：大野克夫
[00:15.26]うつむくその背中に
[00:18.27]
[00:19.29]痛い雨がつき刺さる
[00:21.99]
[00:22.81]祈る想いで見ていた
[00:27.02]
[00:30.15]この世にもしも傘が
[00:32.95]
[00:33.86]たったひとつだとしても
[00:36.74]
[00:37.61]捜してキミに渡すよ
[00:41.79]
[00:44.60]なにも出来ないけど
[00:47.65]
[00:48.61]キミの代わり
[00:50.66]
[00:51.82]濡れるくらい
[00:54.07]わけもないさ
[00:56.37]
[00:59.41]お願いその悩みを
[01:03.37]どうか私に打ち明けて
[01:06.91]
[01:36.03]必ず朝は来るさ
[01:39.06]
[01:40.03]終わらない雨もないね
[01:43.68]だから自分を信じて
[01:47.60]
[01:50.67]月と太陽なら私は月
[01:56.08]
[01:57.78]キミがいれば輝けるよ
[02:01.88]
[02:05.37]ひとりで背負わないで
[02:09.22]気づいて私がいること
[02:12.80]
[02:19.97]もうすぐその心に
[02:22.79]
[02:23.86]きれいな虹が架かるから
[02:27.76]
[02:34.63]もうすぐその心に
[02:37.34]
[02:38.52]きれいな虹が架かるから
`;

function $(id) {
    return document.getElementById(id);
}//这样写以后getid方便

function getLrcArray() {
    var parts = lrc.split("\n");
    for (let index = 0; index < parts.length; index++) {
        parts[index] = getLrcObj(parts[index]);
    }
    return parts;

    function getLrcObj(content) {
        var twoParts = content.split("]");
        var time = twoParts[0].substr(1);
        var timeParts = time.split(":");
        var seconds = +timeParts[1];
        var min = +timeParts[0];
        seconds = min * 60 + seconds;
        var words = twoParts[1];
        return{
            seconds: seconds,
            words: words,
        };
    } 
}

var lrcArray = getLrcArray();

function inputLrc() {
    for (let index = 0; index < lrcArray.length; index++) {
        var li = document.createElement("li");
        li.innerText = lrcArray[index].words;
        $("ullrc").appendChild(li);
    }
}

inputLrc();

function setPosition() {
    var index = getLrcIndex();
    if (index == -1) {
        return;
    }
    var lrc_li_height = 35, lrc_ul_height = 450;
    var top = index * lrc_li_height + lrc_li_height / 2 - lrc_ul_height / 2;
    if (top < 0) {
        top = 0;
    }
    $("ullrc").style.marginTop = -top + "px";
    var activeLi = $("ullrc").querySelector(".active");
    if(activeLi){
        activeLi.classList.remove("active");
    }
    $("ullrc").children[index].classList.add("active");
}

var turn = 0.4;//调歌词速度

function getLrcIndex(){
    var time = $("MusicPlayer").currentTime + turn;
    for (var index = 0; index < lrcArray.length; index++) {
        if (lrcArray[index].seconds > time) {
            return index - 1;
        }
    }
}

$("MusicPlayer").ontimeupdate = setPosition;
