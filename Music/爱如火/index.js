var lrc = `[00:00.43]爱如火
[00:00.93]演唱：那艺娜
[00:01.43]作词：卫婷婷
[00:01.95]作曲：卫婷婷
[00:02.69]监制：张大志/张爱国
[00:03.44]制作人：卫婷婷
[00:04.19]编曲混音：哈魔音乐
[00:04.93]制作发行：哈魔音乐
[00:05.43]录音棚：北京哈魔音乐录音棚
[00:06.19]出品：北京群星伟业
[00:07.43]心在跳是爱情如烈火
[00:10.95]你在笑疯狂的人是我
[00:14.68]爱如火会温暖了心窝
[00:18.43]我看见爱的火焰闪烁
[00:22.19]心在跳是爱情如烈火
[00:25.68]你在笑疯狂的人是我
[00:29.44]爱如火会温暖了心窝
[00:33.18]我看见爱的火焰闪烁
[00:51.95]燃烧那爱情的火焰
[00:55.69]取一把烈火在人间
[00:59.44]红尘里爱恨一瞬间
[01:02.69]可曾记得彼此的脸
[01:06.44]你的爱在眼里流淌
[01:10.68]爱情它如火般荡漾
[01:14.20]我的心早为你疯狂
[01:17.94]爱如火在燃烧碰撞
[01:25.18]心在跳是爱情如烈火
[01:28.69]你在笑疯狂的人是我
[01:32.20]爱如火会温暖了心窝
[01:35.94]我看见爱的火焰闪烁
[01:39.70]心在跳是爱情如烈火
[01:43.43]你在笑疯狂的人是我
[01:46.94]爱如火会温暖了心窝
[01:50.68]我看见爱的火焰闪烁
[02:09.44]燃烧那爱情的火焰
[02:13.19]取一把烈火在人间
[02:16.94]红尘里爱恨一瞬间
[02:20.68]可曾记得彼此的脸
[02:24.44]你的爱在眼里流淌
[02:28.18]爱情它如火般荡漾
[02:31.68]我的心早为你疯狂
[02:35.44]爱如火在燃烧碰撞
[02:42.69]心在跳是爱情如烈火
[02:46.18]你在笑疯狂的人是我
[02:49.68]爱如火会温暖了心窝
[02:53.43]我看见爱的火焰闪烁
[02:57.18]心在跳是爱情如烈火
[03:00.94]你在笑疯狂的人是我
[03:04.69]爱如火会温暖了心窝
[03:08.19]我看见爱的火焰闪烁`;

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
