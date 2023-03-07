var lrc = `[00:00.0]小城夏天 - LBI利比
[00:01.13]词 Lyrics：陶旧
[00:01.61]曲 Music：盛骁
[00:02.13]编曲 Arranger：WayMen歪门/KENNY妮妮
[00:03.21]吉他 Guitar：张赫伦/Kingtheta
[00:04.23]混音师 Mixing Engineer：LBI利比
[00:05.32]Atmos混音：刘三斤/苍白/31Studio
[00:06.6]合声 Backing vocals：LBI利比
[00:07.61]制作人 Produced by：蒋雪儿 Snow.J
[00:08.88]监制 Executive producer：蒋雪儿 Snow.J
[00:10.05]音乐统筹 Music co ordination：柯自俊
[00:11.32]OP：青风音乐Cheerful Music
[00:11.54]SP：乐无限Eternal Music
[00:11.73]【未经授权不得翻唱或使用】
[00:13.22]橘黄色的日落 吞没在海平线
[00:16.47]夜色慢慢摊开 露出星光点点
[00:19.4]我听着耳机中j a y的音乐
[00:22.95]从等你下课 到手写的从前
[00:26.44]冒泡汽水和你都是夏天感觉
[00:29.65]着迷你眉间柔情似海的双眼
[00:32.55]心动像风来的不知不觉
[00:36.02]此刻 世界聚焦你的出现
[00:39.59]Wo say wo
[00:46.11]Wo say wo
[00:52.21]我在小城夏天陪你遇见浪漫
[00:55.89]晚风吹过耳畔你显得很好看
[00:59.27]微醺的傍晚 时间过很慢
[01:05.4]我在小城夏天遇见了另一半
[01:09.03]这座城市有我的思念和喜欢
[01:12.41]闷热的季节 因你而梦幻
[01:32.17]橘黄色的日落 吞没在海平线
[01:35.380005]夜色慢慢摊开 露出星光点点
[01:38.29]我听着耳机中j a y的音乐
[01:41.78]从等你下课 到手写的从前
[01:45.3]冒泡汽水和你都是夏天感觉
[01:48.53]着迷你眉间柔情似海的双眼
[01:51.380005]心动像风来的不知不觉
[01:54.96]此刻 世界聚焦你的出现
[01:58.43]Wo say wo
[02:04.93]Wo say wo
[02:11.12]我在小城夏天陪你遇见浪漫
[02:14.74]晚风吹过耳畔你显得很好看
[02:18.1]微醺的傍晚 时间过很慢
[02:24.3]我在小城夏天遇见了另一半
[02:27.87]这座城市有我的思念和喜欢
[02:31.26]闷热的季节 因你而梦幻
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
