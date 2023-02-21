
    
    function play(){
    swal("您好，感谢您的下载，但本站运营成本极高，使用副站下载可以助力我们运营，您是否需要继续下载？十分感谢主子的理解与支持!", {
            buttons: {
                cancel: "取消下载",
                allow: "立即下载"
            }
        }).then(function(value) {
            if (value == "allow") {
              
              window.open("https://xiaoshukeji.github.io/X-Blog/xs-win/index.html") 
              
            } else {
        
              
            }
        });
    }
