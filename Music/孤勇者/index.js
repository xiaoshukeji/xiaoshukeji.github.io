var lrc = `[00:00.0]孤勇者 - 陈奕迅
[00:00.68]词：唐恬
[00:01.11]曲：钱雷
[00:01.51]编曲：钱雷
[00:01.87]吉他：高飞
[00:02.21]人声录音师：利伟明
[00:02.55]人声录音棚：雅旺录音室
[00:02.91]Vocal edite：汝文博@SBMS Beijing
[00:03.26]混音&母带：周天澈@Studio 21A
[00:03.59]词版权管理方：北京梦织音传媒有限公司
[00:04.05]曲版权管理方：索尼音乐版权代理（北京）有限公司
[00:04.37]录音作品及MV版权：EAS MUSIC LTD
[00:04.71]出品监制：霍锦&卢泓宇
[00:05.13]联合出品方：拳头游戏&腾讯游戏&腾讯视频
[00:05.48]制作人：钱雷
[00:22.67]都是勇敢的
[00:28.81]你额头的伤口你的不同你犯的错
[00:37.29]都不必隐藏
[00:43.67]你破旧的玩偶你的面具你的自我
[00:52.16]他们说要带着光驯服每一头怪兽
[00:58.97]他们说要缝好你的伤没有人爱小丑
[01:06.25]为何孤独不可光荣
[01:09.29]人只有不完美值得歌颂
[01:13.64]谁说污泥满身的不算英雄
[01:21.13]爱你孤身走暗巷
[01:22.87]爱你不跪的模样
[01:24.72]爱你对峙过绝望
[01:26.54]不肯哭一场
[01:28.45]爱你破烂的衣裳
[01:30.15]却敢堵命运的枪
[01:32.09]爱你和我那么像
[01:33.95]缺口都一样
[01:35.84]去吗配吗这褴褛的披风
[01:39.55]战吗战啊以最卑微的梦
[01:43.240005]致那黑夜中的呜咽与怒吼
[01:50.65]谁说站在光里的才算英雄
[02:09.17]他们说要戒了你的狂
[02:11.96]就像擦掉了污垢
[02:16.45999]他们说要顺台阶而上而代价是低头
[02:23.76]那就让我不可乘风
[02:26.93]你一样骄傲着那种孤勇
[02:31.09]谁说对弈平凡的不算英雄
[02:38.67]爱你孤身走暗巷
[02:40.32]爱你不跪的模样
[02:42.25]爱你对峙过绝望
[02:44.1]不肯哭一场
[02:45.98]爱你破烂的衣裳
[02:47.70999]却敢堵命运的枪
[02:49.67]爱你和我那么像
[02:51.43]缺口都一样
[02:53.43]去吗配吗这褴褛的披风
[02:57.04001]战吗战啊以最卑微的梦
[03:00.78]致那黑夜中的呜咽与怒吼
[03:08.21]谁说站在光里的才算英雄
[03:12.95]你的斑驳与众不同
[03:20.31]你的沉默震耳欲聋
[03:24.91]You Are The Hero
[03:26.35]爱你孤身走暗巷
[03:28.34]爱你不跪的模样
[03:30.19]爱你对峙过绝望
[03:32.08]不肯哭一场 (You Are The Hero)
[03:34.08]爱你来自于蛮荒
[03:35.73]一生不借谁的光
[03:37.63]你将造你的城邦
[03:39.49]在废墟之上
[03:41.39]去吗去啊以最卑微的梦
[03:45.04001]战吗战啊以最孤高的梦
[03:48.86]致那黑夜中的呜咽与怒吼
[03:56.16]谁说站在光里的才算英雄`;

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
