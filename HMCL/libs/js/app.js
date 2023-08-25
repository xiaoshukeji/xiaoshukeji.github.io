function resizable(){is("largescreen"),ismdxl(),is("tabletscreen"),is("tabletscreen")&&(public_vars.$sidebarMenu.addClass("collapsed"),ps_destroy()),isxs(),jQuery(window).trigger("xenon.resize")}function get_current_breakpoint(){var c,d,e,f,a=jQuery(window).width(),b=public_vars.breakpoints;for(c in b)if(d=b[c],e=d[0],f=d[1],-1==f&&(f=a),a>=e&&f>=a)return c;return null}function is(a){return get_current_breakpoint()==a}function isxs(){return is("devicescreen")||is("sdevicescreen")}function ismdxl(){return is("tabletscreen")||is("largescreen")}function trigger_resizable(){public_vars.lastBreakpoint!=get_current_breakpoint()&&(public_vars.lastBreakpoint=get_current_breakpoint(),resizable(public_vars.lastBreakpoint)),jQuery(window).trigger("xenon.resized")}function setup_sidebar_menu(){if(public_vars.$sidebarMenu.length){var a=public_vars.$sidebarMenu.find("li:has(> ul)"),b=public_vars.$sidebarMenu.hasClass("toggle-others");a.filter(".active").addClass("expanded"),is("largescreen")&&0==public_vars.$sidebarMenu.hasClass("collapsed")&&$(window).on("resize",function(){is("tabletscreen")?(public_vars.$sidebarMenu.addClass("collapsed"),ps_destroy()):is("largescreen")&&(public_vars.$sidebarMenu.removeClass("collapsed"),ps_init())}),a.each(function(a,c){var d=jQuery(c),e=d.children("a"),f=d.children("ul");d.addClass("has-sub"),e.on("click",function(a){a.preventDefault(),b&&sidebar_menu_close_items_siblings(d),d.hasClass("expanded")||d.hasClass("opened")?sidebar_menu_item_collapse(d,f):sidebar_menu_item_expand(d,f)})})}}function sidebar_menu_item_expand(a,b){var c,d,g,j,k;a.data("is-busy")||a.parent(".main-menu").length&&public_vars.$sidebarMenu.hasClass("collapsed")||(a.addClass("expanded").data("is-busy",!0),b.show(),c=b.children(),d=b.outerHeight(),jQuery(window).height(),a.outerHeight(),g=public_vars.$sidebarMenu.scrollTop(),a.position().top+g,public_vars.$sidebarMenu.hasClass("fit-in-viewport"),c.addClass("is-hidden"),b.height(0),TweenMax.to(b,sm_duration,{css:{height:d},onUpdate:ps_update,onComplete:function(){b.height("")}}),j=a.data("sub_i_1"),k=a.data("sub_i_2"),window.clearTimeout(j),j=setTimeout(function(){c.each(function(a,b){var c=jQuery(b);c.addClass("is-shown")});var b=sm_transition_delay*c.length,d=parseFloat(c.eq(0).css("transition-duration")),e=parseFloat(c.last().css("transition-delay"));d&&e&&(b=1e3*(d+e)),window.clearTimeout(k),k=setTimeout(function(){c.removeClass("is-hidden is-shown")},b),a.data("is-busy",!1)},0),a.data("sub_i_1",j),a.data("sub_i_2",k))}function sidebar_menu_item_collapse(a,b){if(!a.data("is-busy")){var c=b.children();a.removeClass("expanded").data("is-busy",!0),c.addClass("hidden-item"),TweenMax.to(b,sm_duration,{css:{height:0},onUpdate:ps_update,onComplete:function(){a.data("is-busy",!1).removeClass("opened"),b.attr("style","").hide(),c.removeClass("hidden-item"),a.find("li.expanded ul").attr("style","").hide().parent().removeClass("expanded"),ps_update(!0)}})}}function sidebar_menu_close_items_siblings(a){a.siblings().not(a).filter(".expanded, .opened").each(function(a,b){var c=jQuery(b),d=c.children("ul");sidebar_menu_item_collapse(c,d)})}function setup_horizontal_menu(){if(public_vars.$horizontalMenu.length){var a=public_vars.$horizontalMenu.find("li:has(> ul)"),b=public_vars.$horizontalMenu.hasClass("click-to-expand");b&&public_vars.$mainContent.add(public_vars.$sidebarMenu).on("click",function(){a.removeClass("hover")}),a.each(function(c,d){var e=jQuery(d),f=e.children("a"),g=e.children("ul"),h=e.parent().is(".navbar-nav");e.addClass("has-sub"),f.on("click",function(a){isxs()&&(a.preventDefault(),sidebar_menu_close_items_siblings(e),e.hasClass("expanded")||e.hasClass("opened")?sidebar_menu_item_collapse(e,g):sidebar_menu_item_expand(e,g))}),b?f.on("click",function(b){if(b.preventDefault(),!isxs())if(h)a.filter(function(a,b){return jQuery(b).parent().is(".navbar-nav")}).not(e).removeClass("hover"),e.toggleClass("hover");else{var c;0==e.hasClass("expanded")?(e.addClass("expanded"),g.addClass("is-visible"),c=g.outerHeight(),g.height(0),TweenLite.to(g,.15,{css:{height:c},ease:Sine.easeInOut,onComplete:function(){g.attr("style","")}}),e.siblings().find("> ul.is-visible").not(g).each(function(a,b){var d=jQuery(b);c=d.outerHeight(),d.removeClass("is-visible").height(c),d.parent().removeClass("expanded"),TweenLite.to(d,.15,{css:{height:0},onComplete:function(){d.attr("style","")}})})):(c=g.outerHeight(),e.removeClass("expanded"),g.removeClass("is-visible").height(c),TweenLite.to(g,.15,{css:{height:0},onComplete:function(){g.attr("style","")}}))}}):e.hoverIntent({over:function(){isxs()||(h?e.addClass("hover"):(g.addClass("is-visible"),sub_height=g.outerHeight(),g.height(0),TweenLite.to(g,.25,{css:{height:sub_height},ease:Sine.easeInOut,onComplete:function(){g.attr("style","")}})))},out:function(){isxs()||(h?e.removeClass("hover"):(sub_height=g.outerHeight(),e.removeClass("expanded"),g.removeClass("is-visible").height(sub_height),TweenLite.to(g,.25,{css:{height:0},onComplete:function(){g.attr("style","")}})))},timeout:200,interval:h?10:100})})}}function stickFooterToBottom(){if(public_vars.$mainFooter.add(public_vars.$mainContent).add(public_vars.$sidebarMenu).attr("style",""),isxs())return!1;if(public_vars.$mainFooter.hasClass("sticky")){var a=jQuery(window).height(),b=public_vars.$mainFooter.outerHeight(!0),c=public_vars.$mainFooter.position().top+b,e=public_vars.$horizontalNavbar.outerHeight();a>c-parseInt(public_vars.$mainFooter.css("marginTop"),10)&&public_vars.$mainFooter.css({marginTop:a-c-e})}}function ps_update(a){if(jQuery.isFunction(jQuery.fn.perfectScrollbar)){if(public_vars.$sidebarMenu.hasClass("collapsed"))return;public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar("update"),a&&(ps_destroy(),ps_init())}}function ps_init(){if(jQuery.isFunction(jQuery.fn.perfectScrollbar)){if(public_vars.$sidebarMenu.hasClass("collapsed")||!public_vars.$sidebarMenu.hasClass("fixed"))return;public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar({wheelSpeed:1,wheelPropagation:public_vars.wheelPropagation})}}function ps_destroy(){jQuery.isFunction(jQuery.fn.perfectScrollbar)&&public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar("destroy")}function attrDefault(a,b,c){return"undefined"!=typeof a.data(b)?a.data(b):c}var public_vars,sm_duration,sm_transition_delay;!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(a){return"string"==typeof a?parseInt(a,10):~~a}var c={wheelSpeed:1,wheelPropagation:!1,swipePropagation:!0,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:!1},d=0,e=function(){var a=d++;return function(b){var c=".perfect-scrollbar-"+a;return void 0===b?c:b+c}},f="WebkitAppearance"in document.documentElement.style;a.fn.perfectScrollbar=function(d,g){return this.each(function(){function h(a,c){var f,d=a+c,e=C-K;L=0>d?0:d>e?e:d,f=b(L*(E-C)/(C-K)),z.scrollTop(f)}function i(a,c){var f,d=a+c,e=B-G;H=0>d?0:d>e?e:d,f=b(H*(D-B)/(B-G)),z.scrollLeft(f)}function j(a){return y.minScrollbarLength&&(a=Math.max(a,y.minScrollbarLength)),y.maxScrollbarLength&&(a=Math.min(a,y.maxScrollbarLength)),a}function k(){var b,a={width:I};a.left=N?z.scrollLeft()+B-D:z.scrollLeft(),T?a.bottom=S-z.scrollTop():a.top=U+z.scrollTop(),Q.css(a),b={top:z.scrollTop(),height:M},$?b.right=N?D-z.scrollLeft()-Z-Y.outerWidth():Z-z.scrollLeft():b.left=N?z.scrollLeft()+2*B-D-_-Y.outerWidth():_+z.scrollLeft(),X.css(b),R.css({left:H,width:G-V}),Y.css({top:L,height:K-ab})}function l(){z.removeClass("ps-active-x"),z.removeClass("ps-active-y"),B=y.includePadding?z.innerWidth():z.width(),C=y.includePadding?z.innerHeight():z.height(),D=z.prop("scrollWidth"),E=z.prop("scrollHeight"),!y.suppressScrollX&&D>B+y.scrollXMarginOffset?(F=!0,I=B-W,G=j(b(I*B/D)),H=b(z.scrollLeft()*(I-G)/(D-B))):(F=!1,G=0,H=0,z.scrollLeft(0)),!y.suppressScrollY&&E>C+y.scrollYMarginOffset?(J=!0,M=C-bb,K=j(b(M*C/E)),L=b(z.scrollTop()*(M-K)/(E-C))):(J=!1,K=0,L=0,z.scrollTop(0)),H>=I-G&&(H=I-G),L>=M-K&&(L=M-K),k(),F&&z.addClass("ps-active-x"),J&&z.addClass("ps-active-y")}function m(){var b,c,d=function(a){i(b,a.pageX-c),l(),a.stopPropagation(),a.preventDefault()},e=function(){Q.removeClass("in-scrolling"),a(P).unbind(O("mousemove"),d)};R.bind(O("mousedown"),function(f){c=f.pageX,b=R.position().left,Q.addClass("in-scrolling"),a(P).bind(O("mousemove"),d),a(P).one(O("mouseup"),e),f.stopPropagation(),f.preventDefault()}),b=c=null}function n(){var b,c,d=function(a){h(b,a.pageY-c),l(),a.stopPropagation(),a.preventDefault()},e=function(){X.removeClass("in-scrolling"),a(P).unbind(O("mousemove"),d)};Y.bind(O("mousedown"),function(f){c=f.pageY,b=Y.position().top,X.addClass("in-scrolling"),a(P).bind(O("mousemove"),d),a(P).one(O("mouseup"),e),f.stopPropagation(),f.preventDefault()}),b=c=null}function o(a,b){var d,c=z.scrollTop();if(0===a){if(!J)return!1;if(0===c&&b>0||c>=E-C&&0>b)return!y.wheelPropagation}if(d=z.scrollLeft(),0===b){if(!F)return!1;if(0===d&&0>a||d>=D-B&&a>0)return!y.wheelPropagation}return!0}function p(a,b){var c=z.scrollTop(),d=z.scrollLeft(),e=Math.abs(a),f=Math.abs(b);if(f>e){if(0>b&&c===E-C||b>0&&0===c)return!y.swipePropagation}else if(e>f&&(0>a&&d===D-B||a>0&&0===d))return!y.swipePropagation;return!0}function q(){function a(a){var b=a.originalEvent.deltaX,c=-1*a.originalEvent.deltaY;return(void 0===b||void 0===c)&&(b=-1*a.originalEvent.wheelDeltaX/6,c=a.originalEvent.wheelDeltaY/6),a.originalEvent.deltaMode&&1===a.originalEvent.deltaMode&&(b*=10,c*=10),b!==b&&c!==c&&(b=0,c=a.originalEvent.wheelDelta),[b,c]}function b(b){if(f||!(z.find("select:focus").length>0)){var d=a(b),e=d[0],g=d[1];c=!1,y.useBothWheelAxes?J&&!F?(g?z.scrollTop(z.scrollTop()-g*y.wheelSpeed):z.scrollTop(z.scrollTop()+e*y.wheelSpeed),c=!0):F&&!J&&(e?z.scrollLeft(z.scrollLeft()+e*y.wheelSpeed):z.scrollLeft(z.scrollLeft()-g*y.wheelSpeed),c=!0):(z.scrollTop(z.scrollTop()-g*y.wheelSpeed),z.scrollLeft(z.scrollLeft()+e*y.wheelSpeed)),l(),c=c||o(e,g),c&&(b.stopPropagation(),b.preventDefault())}}var c=!1;void 0!==window.onwheel?z.bind(O("wheel"),b):void 0!==window.onmousewheel&&z.bind(O("mousewheel"),b)}function r(){var c,b=!1;z.bind(O("mouseenter"),function(){b=!0}),z.bind(O("mouseleave"),function(){b=!1}),c=!1,a(P).bind(O("keydown"),function(d){var e,f,g;if((!d.isDefaultPrevented||!d.isDefaultPrevented())&&b){for(e=document.activeElement?document.activeElement:P.activeElement;e.shadowRoot;)e=e.shadowRoot.activeElement;if(!a(e).is(":input,[contenteditable]")){switch(f=0,g=0,d.which){case 37:f=-30;break;case 38:g=30;break;case 39:f=30;break;case 40:g=-30;break;case 33:g=90;break;case 32:case 34:g=-90;break;case 35:g=d.ctrlKey?-E:-C;break;case 36:g=d.ctrlKey?z.scrollTop():C;break;default:return}z.scrollTop(z.scrollTop()-g),z.scrollLeft(z.scrollLeft()+f),c=o(f,g),c&&d.preventDefault()}}})}function s(){function a(a){a.stopPropagation()}Y.bind(O("click"),a),X.bind(O("click"),function(a){var c=b(K/2),d=a.pageY-X.offset().top-c,e=C-K,f=d/e;0>f?f=0:f>1&&(f=1),z.scrollTop((E-C)*f)}),R.bind(O("click"),a),Q.bind(O("click"),function(a){var c=b(G/2),d=a.pageX-Q.offset().left-c,e=B-G,f=d/e;0>f?f=0:f>1&&(f=1),z.scrollLeft((D-B)*f)})}function t(){function b(){var a=window.getSelection?window.getSelection():document.getSlection?document.getSlection():{rangeCount:0};return 0===a.rangeCount?null:a.getRangeAt(0).commonAncestorContainer}function c(){e||(e=setInterval(function(){return A()?(z.scrollTop(z.scrollTop()+f.top),z.scrollLeft(z.scrollLeft()+f.left),l(),void 0):(clearInterval(e),void 0)},50))}function d(){e&&(clearInterval(e),e=null),Q.removeClass("in-scrolling"),X.removeClass("in-scrolling")}var e=null,f={top:0,left:0},g=!1;a(P).bind(O("selectionchange"),function(){a.contains(z[0],b())?g=!0:(g=!1,d())}),a(window).bind(O("mouseup"),function(){g&&(g=!1,d())}),a(window).bind(O("mousemove"),function(a){if(g){var b={x:a.pageX,y:a.pageY},e=z.offset(),h={left:e.left,right:e.left+z.outerWidth(),top:e.top,bottom:e.top+z.outerHeight()};b.x<h.left+3?(f.left=-5,Q.addClass("in-scrolling")):b.x>h.right-3?(f.left=5,Q.addClass("in-scrolling")):f.left=0,b.y<h.top+3?(f.top=5>h.top+3-b.y?-5:-20,X.addClass("in-scrolling")):b.y>h.bottom-3?(f.top=5>b.y-h.bottom+3?5:20,X.addClass("in-scrolling")):f.top=0,0===f.top&&0===f.left?d():c()}})}function u(b,c){function d(a,b){z.scrollTop(z.scrollTop()-b),z.scrollLeft(z.scrollLeft()-a),l()}function e(){r=!0}function f(){r=!1}function g(a){return a.originalEvent.targetTouches?a.originalEvent.targetTouches[0]:a.originalEvent}function h(a){var b=a.originalEvent;return b.targetTouches&&1===b.targetTouches.length?!0:b.pointerType&&"mouse"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_MOUSE?!0:!1}function i(a){if(h(a)){s=!0;var b=g(a);m.pageX=b.pageX,m.pageY=b.pageY,n=(new Date).getTime(),null!==q&&clearInterval(q),a.stopPropagation()}}function j(a){var b,c,e,f,i,j;!r&&s&&h(a)&&(b=g(a),c={pageX:b.pageX,pageY:b.pageY},e=c.pageX-m.pageX,f=c.pageY-m.pageY,d(e,f),m=c,i=(new Date).getTime(),j=i-n,j>0&&(o.x=e/j,o.y=f/j,n=i),p(e,f)&&(a.stopPropagation(),a.preventDefault()))}function k(){!r&&s&&(s=!1,clearInterval(q),q=setInterval(function(){return A()?.01>Math.abs(o.x)&&.01>Math.abs(o.y)?(clearInterval(q),void 0):(d(30*o.x,30*o.y),o.x*=.8,o.y*=.8,void 0):(clearInterval(q),void 0)},10))}var m={},n=0,o={},q=null,r=!1,s=!1;b&&(a(window).bind(O("touchstart"),e),a(window).bind(O("touchend"),f),z.bind(O("touchstart"),i),z.bind(O("touchmove"),j),z.bind(O("touchend"),k)),c&&(window.PointerEvent?(a(window).bind(O("pointerdown"),e),a(window).bind(O("pointerup"),f),z.bind(O("pointerdown"),i),z.bind(O("pointermove"),j),z.bind(O("pointerup"),k)):window.MSPointerEvent&&(a(window).bind(O("MSPointerDown"),e),a(window).bind(O("MSPointerUp"),f),z.bind(O("MSPointerDown"),i),z.bind(O("MSPointerMove"),j),z.bind(O("MSPointerUp"),k)))}function v(){z.bind(O("scroll"),function(){l()})}function w(){z.unbind(O()),a(window).unbind(O()),a(P).unbind(O()),z.data("perfect-scrollbar",null),z.data("perfect-scrollbar-update",null),z.data("perfect-scrollbar-destroy",null),R.remove(),Y.remove(),Q.remove(),X.remove(),z=Q=X=R=Y=F=J=B=C=D=E=G=H=S=T=U=K=L=Z=$=_=N=O=null}function x(){l(),v(),m(),n(),s(),t(),q(),(cb||db)&&u(cb,db),y.useKeyboard&&r(),z.data("perfect-scrollbar",z),z.data("perfect-scrollbar-update",l),z.data("perfect-scrollbar-destroy",w)}var B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,y=a.extend(!0,{},c),z=a(this),A=function(){return!!z};return"object"==typeof d?a.extend(!0,y,d):g=d,"update"===g?(z.data("perfect-scrollbar-update")&&z.data("perfect-scrollbar-update")(),z):"destroy"===g?(z.data("perfect-scrollbar-destroy")&&z.data("perfect-scrollbar-destroy")(),z):z.data("perfect-scrollbar")?z.data("perfect-scrollbar"):(z.addClass("ps-container"),N="rtl"===z.css("direction"),O=e(),P=this.ownerDocument||document,Q=a("<div class='ps-scrollbar-x-rail'>").appendTo(z),R=a("<div class='ps-scrollbar-x'>").appendTo(Q),S=b(Q.css("bottom")),T=S===S,U=T?null:b(Q.css("top")),V=b(Q.css("borderLeftWidth"))+b(Q.css("borderRightWidth")),W=b(Q.css("marginLeft"))+b(Q.css("marginRight")),X=a("<div class='ps-scrollbar-y-rail'>").appendTo(z),Y=a("<div class='ps-scrollbar-y'>").appendTo(X),Z=b(X.css("right")),$=Z===Z,_=$?null:b(X.css("left")),ab=b(X.css("borderTopWidth"))+b(X.css("borderBottomWidth")),bb=b(X.css("marginTop"))+b(X.css("marginBottom")),cb="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,db=null!==window.navigator.msMaxTouchPoints,x(),z)})}}),public_vars=public_vars||{},jQuery.extend(public_vars,{breakpoints:{largescreen:[991,-1],tabletscreen:[768,990],devicescreen:[420,767],sdevicescreen:[0,419]},lastBreakpoint:null}),function(a,b){"use strict";a(document).ready(function(){a('a[data-toggle="chat"]').each(function(c,d){a(d).on("click",function(c){c.preventDefault(),public_vars.$body.toggleClass("chat-open"),a.isFunction(a.fn.perfectScrollbar)&&setTimeout(function(){public_vars.$chat.find(".chat_inner").perfectScrollbar("update"),a(b).trigger("xenon.resize")},1)})}),a('a[data-toggle="settings-pane"]').each(function(c,d){a(d).on("click",function(c){var e,f;c.preventDefault(),e=attrDefault(a(d),"animate",!1)&&!isxs(),f={top:a(document).scrollTop(),toTop:0},public_vars.$body.hasClass("settings-pane-open")&&(f.toTop=f.top),TweenMax.to(f,e?.1:0,{top:f.toTop,roundProps:["top"],ease:f.toTop<10?null:Sine.easeOut,onUpdate:function(){a(b).scrollTop(f.top)},onComplete:function(){if(e)if(public_vars.$settingsPaneIn.addClass("with-animation"),public_vars.$settingsPane.is(":visible"))public_vars.$settingsPaneIn.addClass("closing"),TweenMax.to(public_vars.$settingsPane,.25,{css:{height:0},delay:.15,ease:Power1.easeInOut,onComplete:function(){public_vars.$body.removeClass("settings-pane-open"),public_vars.$settingsPane.css({height:""}),public_vars.$settingsPaneIn.removeClass("closing visible")}});else{public_vars.$body.addClass("settings-pane-open");var a=public_vars.$settingsPane.outerHeight(!0);public_vars.$settingsPane.css({height:0}),TweenMax.to(public_vars.$settingsPane,.25,{css:{height:a},ease:Circ.easeInOut,onComplete:function(){public_vars.$settingsPane.css({height:""})}}),public_vars.$settingsPaneIn.addClass("visible")}else public_vars.$body.toggleClass("settings-pane-open"),public_vars.$settingsPaneIn.removeClass("visible"),public_vars.$settingsPaneIn.removeClass("with-animation")}})})}),a('a[data-toggle="sidebar"]').each(function(c,d){a(d).on("click",function(c){c.preventDefault(),public_vars.$sidebarMenu.hasClass("collapsed")?(public_vars.$sidebarMenu.removeClass("collapsed"),ps_init()):(public_vars.$sidebarMenu.addClass("collapsed"),ps_destroy()),a(b).trigger("xenon.resize")})}),a('a[data-toggle="mobile-menu"]').on("click",function(c){c.preventDefault(),public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass("mobile-is-visible"),a("#main-menu").hasClass("mobile-is-visible")===!0?(public_vars.$sidebarMenu.removeClass("collapsed"),a(".sidebar-menu-inner").css("max-height",b.innerHeight),ps_init()):ps_destroy()}),a('a[data-toggle="mobile-menu-horizontal"]').on("click",function(a){a.preventDefault(),public_vars.$horizontalMenu.toggleClass("mobile-is-visible")}),a('a[data-toggle="mobile-menu-both"]').on("click",function(a){a.preventDefault(),public_vars.$mainMenu.toggleClass("mobile-is-visible both-menus-visible"),public_vars.$horizontalMenu.toggleClass("mobile-is-visible both-menus-visible")}),a('a[data-toggle="user-info-menu"]').on("click",function(a){a.preventDefault(),public_vars.$userInfoMenu.toggleClass("mobile-is-visible")}),a('a[data-toggle="user-info-menu-horizontal"]').on("click",function(a){a.preventDefault(),public_vars.$userInfoMenuHor.find(".nav.nav-userinfo").toggleClass("mobile-is-visible")}),a("body").on("click",'.panel a[data-toggle="remove"]',function(b){b.preventDefault();var c=a(this).closest(".panel"),d=c.parent();c.remove(),0==d.children().length&&d.remove()}),a("body").on("click",'.panel a[data-toggle="reload"]',function(b){var c,d;b.preventDefault(),c=a(this).closest(".panel"),c.append('<div class="panel-disabled"><div class="loader-1"></div></div>'),d=c.find(".panel-disabled"),setTimeout(function(){d.fadeOut("fast",function(){d.remove()})},500+300*5*Math.random())}),a("body").on("click",'.panel a[data-toggle="panel"]',function(b){b.preventDefault();var c=a(this).closest(".panel");c.toggleClass("collapsed")}),a("[data-loading-text]").each(function(b,c){var d=a(c);d.on("click",function(){d.button("loading"),setTimeout(function(){d.button("reset")},1800)})}),a('[data-toggle="popover"]').each(function(b,c){var d=a(c),e=attrDefault(d,"placement","right"),f=attrDefault(d,"trigger","click"),g=d.get(0).className.match(/(popover-[a-z0-9]+)/i);d.popover({placement:e,trigger:f}),g&&(d.removeClass(g[1]),d.on("show.bs.popover",function(){setTimeout(function(){var a=d.next();a.addClass(g[1])},0)}))}),a('[data-toggle="tooltip"]').each(function(b,c){var d=a(c),e=attrDefault(d,"placement","top"),f=attrDefault(d,"trigger","hover"),g=d.get(0).className.match(/(tooltip-[a-z0-9]+)/i);d.tooltip({placement:e,trigger:f}),g&&(d.removeClass(g[1]),d.on("show.bs.tooltip",function(){setTimeout(function(){var a=d.next();a.addClass(g[1])},0)}))})})}(jQuery,window),public_vars=public_vars||{},function(a,b){"use strict";a(document).ready(function(){if(public_vars.$body=a("body"),public_vars.$pageContainer=public_vars.$body.find(".page-container"),public_vars.$chat=public_vars.$pageContainer.find("#chat"),public_vars.$sidebarMenu=public_vars.$pageContainer.find(".sidebar-menu"),public_vars.$sidebarProfile=public_vars.$sidebarMenu.find(".sidebar-user-info"),public_vars.$mainMenu=public_vars.$sidebarMenu.find(".main-menu"),public_vars.$horizontalNavbar=public_vars.$body.find(".navbar.horizontal-menu"),public_vars.$horizontalMenu=public_vars.$horizontalNavbar.find(".navbar-nav"),public_vars.$mainContent=public_vars.$pageContainer.find(".main-content"),public_vars.$mainFooter=public_vars.$body.find("footer.main-footer"),public_vars.$userInfoMenuHor=public_vars.$body.find(".navbar.horizontal-menu"),public_vars.$userInfoMenu=public_vars.$body.find("nav.navbar.user-info-navbar"),public_vars.$settingsPane=public_vars.$body.find(".settings-pane"),public_vars.$settingsPaneIn=public_vars.$settingsPane.find(".settings-pane-inner"),public_vars.wheelPropagation=!0,public_vars.$pageLoadingOverlay=public_vars.$body.find(".page-loading-overlay"),public_vars.defaultColorsPalette=["#68b828","#7c38bc","#0e62c7","#fcd036","#4fcdfc","#00b19d","#ff6264","#f7aa47"],setup_sidebar_menu(),setup_horizontal_menu(),public_vars.$mainFooter.hasClass("sticky")&&(stickFooterToBottom(),a(b).on("xenon.resized",stickFooterToBottom)),a.isFunction(a.fn.perfectScrollbar)){public_vars.$sidebarMenu.hasClass("fixed")&&ps_init(),a(".ps-scrollbar").each(function(b,c){var d=a(c);d.hasClass("ps-scroll-down")&&d.scrollTop(d.prop("scrollHeight")),d.perfectScrollbar({wheelPropagation:!1})});var c=public_vars.$pageContainer.find("#chat .chat-inner");c.parent().hasClass("fixed")&&c.css({maxHeight:a(b).height()}).perfectScrollbar(),a(".dropdown:has(.ps-scrollbar)").each(function(){var d=a(this).find(".ps-scrollbar");a(this).on("click",'[data-toggle="dropdown"]',function(a){a.preventDefault(),setTimeout(function(){d.perfectScrollbar("update")},1)})}),a("div.scrollable").each(function(b,c){var d=a(c),e=parseInt(attrDefault(d,"max-height",200),10);e=0>e?200:e,d.css({maxHeight:e}).perfectScrollbar({wheelPropagation:!0})})}a("body").on("click",'a[rel="go-top"]',function(c){c.preventDefault();var d={pos:a(b).scrollTop()};TweenLite.to(d,.3,{pos:0,ease:Power4.easeOut,onUpdate:function(){a(b).scrollTop(d.pos)}})}),a(".breadcrumb.auto-hidden").each(function(b,c){var d=a(c),e=d.find("li a"),g=(e.width(),0);e.each(function(b,c){var d=a(c);g=d.outerWidth(!0)+5,d.addClass("collapsed").width(g),d.hover(function(){d.removeClass("collapsed")},function(){d.addClass("collapsed")})})})});var d=0;a(b).resize(function(){clearTimeout(d),d=setTimeout(trigger_resizable,200)})}(jQuery,window),sm_duration=.2,sm_transition_delay=150;