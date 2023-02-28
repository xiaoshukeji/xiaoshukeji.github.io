var lrc = `[00:00.000] 作词 : 王子健
[00:01.000] 作曲 : 王子健
[00:02.72]好不喜欢
[00:03.90]词曲：Jian-阿健
[00:05.02]编曲：Jian-阿健
[00:06.25]演唱：Jian-阿健
[00:07.98]混音：Jian-阿健
[00:12.13]风吹一整晚
[00:13.61]涟漪吻湖畔
[00:14.78]吹落一地喜欢
[00:16.14]思念难缠
[00:17.76]
[00:18.13]相隔路漫漫
[00:19.61]翻过几重山
[00:20.79]颠簸马背又穿过千帆
[00:23.82]
[00:24.13]月下灯一盏
[00:25.62]有孤影作伴
[00:26.92]莫名的情愫来得突然
[00:29.77]
[00:30.20]思绪太混乱
[00:31.62]心事多纷繁
[00:32.86]决意寻她又下江南
[00:35.70]
[00:36.13]想象的 画面慢慢地
[00:38.92]重现着 你在我身侧
[00:42.00]飘荡着 悠悠的琴瑟
[00:44.96]一曲未完情不自禁附和
[00:47.81]
[00:48.12]走遍了 锦绣的山河
[00:50.96]只记得 你眼眸清澈
[00:54.00]繁华世间我非你不可
[00:58.19]
[01:00.17]相见时须尽欢
[01:01.59]千金不换
[01:02.70]歌舞的画面没有你的侧脸好看
[01:05.99]街头巷口转转
[01:07.77]桥上站一站
[01:08.76]和你花光时间才不遗憾
[01:11.91]待到曲终人散
[01:13.64]行人缓缓
[01:14.81]再作一首诗纪念这个夜晚
[01:17.90]月色悄悄晕染
[01:19.51]话还没说完
[01:20.86]约好明天不见不散
[01:36.18]风吹一整晚
[01:37.73]涟漪吻湖畔
[01:38.78]吹落一地喜欢
[01:40.38]思念难缠
[01:41.80]
[01:42.17]相隔路漫漫
[01:43.60]翻过几重山
[01:44.77]颠簸马背又穿过千帆
[01:47.51]
[01:48.13]月下灯一盏
[01:49.56]有孤影作伴
[01:51.04]莫名的情愫来得突然
[01:53.57]
[01:54.07]思绪太混乱
[01:55.55]心事多纷繁
[01:56.79]决意寻她又下江南
[01:59.62]
[02:00.24]想象的 画面慢慢地
[02:02.96]重现着 你在我身侧
[02:05.98]飘荡着 悠悠的琴瑟
[02:09.08]一曲未完情不自禁附和
[02:11.61]
[02:12.05]走遍了 锦绣的山河
[02:14.90]只记得 你眼眸清澈
[02:18.00]繁华世间我非你不可
[02:22.88]
[02:24.13]相见时须尽欢
[02:25.66]千金不换
[02:26.92]歌舞的画面没有你的侧脸好看
[02:30.08]街头巷口转转
[02:31.63]桥上站一站
[02:32.86]和你花光时间才不遗憾
[02:35.96]待到曲终人散
[02:37.64]行人缓缓
[02:38.94]再作一首诗纪念这个夜晚
[02:41.85]月色悄悄晕染
[02:43.59]话还没说完
[02:44.84]约好明天不见不散`;

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
