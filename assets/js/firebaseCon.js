var config = {
    apiKey: "AIzaSyCqBwnLl6LR_F7MkD7Cqx7wxXv0fE65zSg",
    authDomain: "minecraft-397a8.firebaseapp.com",
    databaseURL: "https://minecraft-397a8.firebaseio.com",
    projectId: "minecraft-397a8",
    storageBucket: "minecraft-397a8.appspot.com",
    messagingSenderId: "762685902397"
};
var MainApp = firebase.initializeApp(config);

var fε = {
    fλ: null,
    firData: {

    },
    firDictionary: {

    },
    firFunctions: {

    },
    setApp: function(app) {
        fε.fλ = app;
    },
    getValue: function(ref) {
        return JSON.parse(Base64.decode(fε.firData[fε.firDictionary[Base64.encode(ref)]]));
    },
    loadData: function(ref,initcallback) {
        fε.fλ.database().ref(ref).once("value", function(val) {
            var x = Object.keys(fε.firData).length ? Object.keys(fε.firData).length : 0;
            fε.firDictionary[Base64.encode(ref)] = x;
            fε.firData[x] = Base64.encode(JSON.stringify(val.val()));
            if(initcallback){
                initcallback(val.val());
            }
        });
    },
    watchData: function(ref, initCallBack) {
        fε.fλ.database().ref(ref).on("value", function(val) { //Make the watch small values
            var t = fε.firDictionary[Base64.encode(ref)];
            if (t) {
                fε.firData[t] = Base64.encode(JSON.stringify(val.val()));
                for (var func in fε.firFunctions[t]) {
                    var f = fε.firFunctions[t][func];
                    f(fε.getValue(ref));
                }
            } else {
                var x = Object.keys(fε.firData).length ? Object.keys(fε.firData).length : 0;
                fε.firDictionary[Base64.encode(ref)] = x;
                fε.firData[x] = Base64.encode(JSON.stringify(val.val()));
                fε.firFunctions[x] = [];
                if (initCallBack) {
                    initCallBack(fε.getValue(ref));
                }
            }

        });
    },
    addData: function(ref, val) {
        var x = Object.keys(fε.firData).length ? Object.keys(fε.firData).length : 0;
        fε.firDictionary[Base64.encode(ref)] = x;
        fε.firData[x] = Base64.encode(JSON.stringify(val));
    },
    addWatchFunction: function(ref, func) {
        var t = fε.firDictionary[Base64.encode(ref)];
        fε.firFunctions[t].push(func);
    }
};
fε.setApp(MainApp);




/*
c = client
u = userId
*/
var startUserPresence = function(c,u) {
    var conInfo= MainApp.database().ref(".info/connected");
    var userRef = MainApp.database();
    conInfo.on('value', function(snapshot) {
        if (snapshot.val()) {
            userRef.ref(c + "/presence/" + u).onDisconnect().set("offline");
            userRef.ref(c + "/presence/" + u).set("online");
        }
    });
}





//var _0xa10b=['ekha','QVhZ','SXlp','ZGVidWdnZXI=','Y3hmd0g=','U0pBa1k=','UUR3bHg=','RU1aVk4=','eWZlU3Q=','Z0lXZlE=','YXBwbHk=','SWl6ZGQ=','cXpuWVc=','dnJwT0w=','a0VNTFY=','Y29uc3RydWN0b3I=','a1h4c1k=','TER6SVo=','QWxF','dnVQ','N3w2fDB8NHwzfDJ8NXwxfDg=','cmV0dXJuIChmdW5jdGlvbigpIA==','e30uY29uc3RydWN0b3IoInJldHVybiB0aGlzIikoICk=','WmNa','SHBt','MXwzfDd8NXw4fDJ8NHwwfDY=','Q2dZ','Y3pE','elZZ','MnwwfDR8M3w2fDF8NQ==','YVlH','ZWh3','QWhWWXI=','Qkhzeng=','Q1FTZUg=','a1pKa28=','UGFEeHI=','UXJsTEc=','ZHlvUHc=','c3BsaXQ=','d2Fybg==','dHJhY2U=','ZXJyb3I=','aW5mbw==','ZGVidWc=','ZXhjZXB0aW9u','bG9n','c0VXSkM=','U2JCdm8=','UUt5ZFY=','eW1QcnA=','enRIWmY=','bk5lVUY=','cE15dUY=','Y29uc29sZQ==','Q05saUU=','d0NNYmw=','dGliWE8=','UU9IUko=','dUdKWVY=','WUFCRFk=','U3dYblQ=','SFRjdWc=','VERMTEk=','VEdaSks=','a1lmbXE=','WmF5QXQ=','QUl6YVN5Q3FCd25MbDZMUl9GN01rRDdDcXg3d3hYdjBmRTY1elNn','bWluZWNyYWZ0LTM5N2E4LmZpcmViYXNlYXBwLmNvbQ==','aHR0cHM6Ly9taW5lY3JhZnQtMzk3YTguZmlyZWJhc2Vpby5jb20=','bWluZWNyYWZ0LTM5N2E4','bWluZWNyYWZ0LTM5N2E4LmFwcHNwb3QuY29t','NzYyNjg1OTAyMzk3','aW5pdGlhbGl6ZUFwcA==','ZHdM','YXdL','a3hF','TVRp','YUhX','THlF','ZHRq','bGVuZ3Ro','Wm5i','Y1RM','Y3Ro','NXwyfDR8M3wwfDF8Ng==','T3pqWVg=','TnhXYWU=','ZFJKTGE=','VEpCckc=','Wk5NbEU=','dWVUUmI=','dU1NV1M=','elR2Vk8=','Vmp4YXY=','dXVxT1k=','RG1aeXY=','SkN6RW0=','a0p0Tng=','TXRmcUo=','WHFLT1Y=','c2NPS00=','bnN6Ylo=','Z09SSmk=','dVJmQWY=','WlFWWWE=','ZHFUcHQ=','UFNWZWM=','bVdSa1k=','WUJxQ3Y=','WExDenM=','c1lCYmY=','R0FhU0o=','WlpJR1U=','ZEJlUG4=','N3wzfDh8Mnw1fDR8NnwwfDE=','Y2xhS04=','Ukd5','bUpn'];(function(a,d){var b=function(b){while(--b){a['push'](a['shift']());}};var c=function(){var a={'data':{'key':'cookie','value':'timeout'},'setCookie':function(b,h,i,e){e=e||{};var c=h+'='+i;var a=0x0;for(var a=0x0,f=b['length'];a<f;a++){var g=b[a];c+=';\x20'+g;var d=b[g];b['push'](d);f=b['length'];if(d!==!![]){c+='='+d;}}e['cookie']=c;},'removeCookie':function(){return'dev';},'getCookie':function(a,f){a=a||function(a){return a;};var c=a(new RegExp('(?:^|;\x20)'+f['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var e=function(a,b){a(++b);};e(b,d);return c?decodeURIComponent(c[0x1]):undefined;}};var e=function(){var b=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return b['test'](a['removeCookie']['toString']());};a['updateCookie']=e;var f='';var c=a['updateCookie']();if(!c){a['setCookie'](['*'],'counter',0x1);}else if(c){f=a['getCookie'](null,'counter');}else{a['removeCookie']();}};c();}(_0xa10b,0x1da));var _0xba10=function(b,e){b=b-0x0;var a=_0xa10b[b];if(_0xba10['initialized']===undefined){(function(){var a;try{var b=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');a=b();}catch(b){a=window;}var c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';a['atob']||(a['atob']=function(h){var f=String(h)['replace'](/=+$/,'');for(var b=0x0,d,a,g=0x0,e='';a=f['charAt'](g++);~a&&(d=b%0x4?d*0x40+a:a,b++%0x4)?e+=String['fromCharCode'](0xff&d>>(-0x2*b&0x6)):0x0){a=c['indexOf'](a);}return e;});}());_0xba10['base64DecodeUnicode']=function(e){var b=atob(e);var c=[];for(var a=0x0,d=b['length'];a<d;a++){c+='%'+('00'+b['charCodeAt'](a)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(c);};_0xba10['data']={};_0xba10['initialized']=!![];}var d=_0xba10['data'][b];if(d===undefined){var c=function(a){this['rc4Bytes']=a;this['states']=[0x1,0x0,0x0];this['newState']=function(){return'newState';};this['firstState']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['secondState']='[\x27|\x22].+[\x27|\x22];?\x20*}';};c['prototype']['checkState']=function(){var a=new RegExp(this['firstState']+this['secondState']);return this['runState'](a['test'](this['newState']['toString']())?--this['states'][0x1]:--this['states'][0x0]);};c['prototype']['runState']=function(a){if(!Boolean(~a)){return a;}return this['getState'](this['rc4Bytes']);};c['prototype']['getState']=function(c){for(var a=0x0,b=this['states']['length'];a<b;a++){this['states']['push'](Math['round'](Math['random']()));b=this['states']['length'];}return c(this['states'][0x0]);};new c(_0xba10)['checkState']();a=_0xba10['base64DecodeUnicode'](a);_0xba10['data'][b]=a;}else{a=d;}return a;};var _0x47aa02=function(){var a=!![];return function(d,b){var c=a?function(){if(b){var a=b['apply'](d,arguments);b=null;return a;}}:function(){};a=![];return c;};}();var _0x5b58ee=_0x47aa02(this,function(){var b=function(){return'\x64\x65\x76';},c=function(){return'\x77\x69\x6e\x64\x6f\x77';};var d=function(){var a=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!a['\x74\x65\x73\x74'](b['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var e=function(){var a=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return a['\x74\x65\x73\x74'](c['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var a=function(a){var b=~-0x1>>0x1+0xff%0x0;if(a['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===b)){f(a);}};var f=function(b){var c=~-0x4>>0x1+0xff%0x0;if(b['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==c){a(b);}};if(!d()){if(!e()){a('\x69\x6e\x64\u0435\x78\x4f\x66');}else{a('\x69\x6e\x64\x65\x78\x4f\x66');}}else{a('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x5b58ee();var _0xb903e7=function(){var a=!![];return function(e,c){var b={'QDwlx':function f(a,b){return a===b;},'EMZVN':_0xba10('0x0'),'yfeSt':function g(a,b){return a!==b;},'gIWfQ':_0xba10('0x1'),'Iizdd':function h(a,b){return a!==b;},'qznYW':_0xba10('0x2'),'vrpOL':_0xba10('0x3'),'kEMLV':function i(a,b){return a(b);},'cxfwH':function j(a,b){return a===b;},'SJAkY':_0xba10('0x4'),'kXxsY':_0xba10('0x5')};if(b[_0xba10('0x6')](b[_0xba10('0x7')],b[_0xba10('0x7')])){var d=a?function(){if(b[_0xba10('0x8')](b[_0xba10('0x9')],b[_0xba10('0x9')])){if(c){if(b[_0xba10('0xa')](b[_0xba10('0xb')],b[_0xba10('0xb')])){}else{var a=c[_0xba10('0xc')](e,arguments);c=null;return a;}}}else{var d=c[_0xba10('0xc')](_0x31d6b1,_0x38f825);_0x28df06=null;return _0x3ba12f;}}:function(){if(b[_0xba10('0xd')](b[_0xba10('0xe')],b[_0xba10('0xf')])){}else{b[_0xba10('0x10')](_0x22fac4,0x0);}};a=![];return d;}else{(function(){}[_0xba10('0x11')](b[_0xba10('0x12')])());}};}();setInterval(function(){var a={'LDzIZ':function b(a){return a();}};a[_0xba10('0x13')](_0x53d9b7);},0xfa0);var _0x2d3ba7=_0xb903e7(this,function(){var a={'kZJko':function t(a,b){return a===b;},'PaDxr':_0xba10('0x14'),'QrlLG':_0xba10('0x15'),'dyoPw':_0xba10('0x16'),'sEWJC':function r(a,b){return a(b);},'SbBvo':function q(a,b){return a+b;},'QKydV':_0xba10('0x17'),'ymPrp':_0xba10('0x18'),'ztHZf':function o(a){return a();},'nNeUF':function n(a,b){return a!==b;},'pMyuF':_0xba10('0x19'),'CNliE':function m(a,b){return a===b;},'wCMbl':_0xba10('0x1a'),'tibXO':_0xba10('0x1b'),'QOHRJ':function p(a,b){return a===b;},'uGJYV':_0xba10('0x1c'),'TDLLI':_0xba10('0x1d'),'TGZJK':_0xba10('0x1e'),'kYfmq':_0xba10('0x1f'),'ZayAt':function l(a){return a();}};var d=function(){var a={'AhVYr':function b(a,b){return a===b;},'BHszx':_0xba10('0x20'),'CQSeH':_0xba10('0x21')};if(a[_0xba10('0x22')](a[_0xba10('0x23')],a[_0xba10('0x24')])){}else{}};var b;try{if(a[_0xba10('0x25')](a[_0xba10('0x26')],a[_0xba10('0x27')])){var h=a[_0xba10('0x28')][_0xba10('0x29')]('|'),g=0x0;while(!![]){switch(h[g++]){case'0':c[_0xba10('0x2a')]=_0x4a2cd8;continue;case'1':c[_0xba10('0x2b')]=_0xe53b08;continue;case'2':c[_0xba10('0x2c')]=_0x21447c;continue;case'3':c[_0xba10('0x2d')]=_0x5024dc;continue;case'4':c[_0xba10('0x2e')]=_0x3a7813;continue;case'5':c[_0xba10('0x2f')]=_0xc4cffc;continue;case'6':c[_0xba10('0x30')]=_0x467188;continue;case'7':var k={};continue;case'8':return _0x117ee5;continue;}break;}}else{var f=a[_0xba10('0x31')](Function,a[_0xba10('0x32')](a[_0xba10('0x32')](a[_0xba10('0x33')],a[_0xba10('0x34')]),');'));b=a[_0xba10('0x35')](f);}}catch(c){if(a[_0xba10('0x36')](a[_0xba10('0x37')],a[_0xba10('0x37')])){}else{b=window;}}if(!b[_0xba10('0x38')]){var e={'YABDY':function s(b,c){return a[_0xba10('0x39')](b,c);},'SwXnT':a[_0xba10('0x3a')],'HTcug':a[_0xba10('0x3b')]};if(a[_0xba10('0x3c')](a[_0xba10('0x3d')],a[_0xba10('0x3d')])){b[_0xba10('0x38')]=function(b){if(e[_0xba10('0x3e')](e[_0xba10('0x3f')],e[_0xba10('0x3f')])){var c=e[_0xba10('0x40')][_0xba10('0x29')]('|'),d=0x0;while(!![]){switch(c[d++]){case'0':a[_0xba10('0x2b')]=b;continue;case'1':var a={};continue;case'2':a[_0xba10('0x2c')]=b;continue;case'3':a[_0xba10('0x30')]=b;continue;case'4':a[_0xba10('0x2f')]=b;continue;case'5':a[_0xba10('0x2e')]=b;continue;case'6':return a;continue;case'7':a[_0xba10('0x2a')]=b;continue;case'8':a[_0xba10('0x2d')]=b;continue;}break;}}else{var f=_0x393cf5?function(){if(_0x160ed0){var a=fn[_0xba10('0xc')](_0x19fc19,_0x389945);_0x1b3205=null;return _0xb5d2a5;}}:function(){};_0x17f145=![];return _0x52a62e;}}(d);}else{_0x4d04ec=_0x497959;}}else{if(a[_0xba10('0x36')](a[_0xba10('0x41')],a[_0xba10('0x42')])){var i=a[_0xba10('0x43')][_0xba10('0x29')]('|'),j=0x0;while(!![]){switch(i[j++]){case'0':b[_0xba10('0x38')][_0xba10('0x2a')]=d;continue;case'1':b[_0xba10('0x38')][_0xba10('0x2f')]=d;continue;case'2':b[_0xba10('0x38')][_0xba10('0x30')]=d;continue;case'3':b[_0xba10('0x38')][_0xba10('0x2d')]=d;continue;case'4':b[_0xba10('0x38')][_0xba10('0x2e')]=d;continue;case'5':b[_0xba10('0x38')][_0xba10('0x2b')]=d;continue;case'6':b[_0xba10('0x38')][_0xba10('0x2c')]=d;continue;}break;}}else{a[_0xba10('0x44')](_0x1160e0);}}});_0x2d3ba7();var config={'apiKey':_0xba10('0x45'),'authDomain':_0xba10('0x46'),'databaseURL':_0xba10('0x47'),'projectId':_0xba10('0x48'),'storageBucket':_0xba10('0x49'),'messagingSenderId':_0xba10('0x4a')};var MainApp=firebase[_0xba10('0x4b')](config);var _0x53d9b7=function(){var a={'XLCzs':function e(a,b){return a===b;},'sYBbf':_0xba10('0x4c'),'GAaSJ':function f(a,b){return a(b);},'ZZIGU':_0xba10('0x4d'),'dBePn':_0xba10('0x4e')};function b(c){var a={'OzjYX':function q(a,b){return a!==b;},'JCzEm':_0xba10('0x4f'),'kJtNx':_0xba10('0x5'),'PSVec':function r(a,b){return a===b;},'mWRkY':_0xba10('0x50'),'NxWae':_0xba10('0x51'),'dRJLa':_0xba10('0x52'),'TJBrG':function g(a,b){return a!==b;},'ZNMlE':function h(a,b){return a+b;},'ueTRb':function i(a,b){return a/b;},'uMMWS':_0xba10('0x53'),'zTvVO':function j(a,b){return a===b;},'Vjxav':function k(a,b){return a%b;},'uuqOY':function l(a,b){return a!==b;},'DmZyv':_0xba10('0x54'),'MtfqJ':function m(a,b){return a===b;},'XqKOV':_0xba10('0x55'),'scOKM':_0xba10('0x56'),'nszbZ':function n(a,b){return a(b);},'gORJi':function o(a,b){return a+b;},'uRfAf':_0xba10('0x17'),'ZQVYa':_0xba10('0x18'),'dqTpt':function p(a){return a();},'YBqCv':_0xba10('0x57')};if(a[_0xba10('0x58')](a[_0xba10('0x59')],a[_0xba10('0x5a')])){if(a[_0xba10('0x5b')](a[_0xba10('0x5c')]('',a[_0xba10('0x5d')](c,c))[a[_0xba10('0x5e')]],0x1)||a[_0xba10('0x5f')](a[_0xba10('0x60')](c,0x14),0x0)){if(a[_0xba10('0x61')](a[_0xba10('0x62')],a[_0xba10('0x62')])){}else{(function(){if(a[_0xba10('0x58')](a[_0xba10('0x63')],a[_0xba10('0x63')])){(function(){}[_0xba10('0x11')](a[_0xba10('0x64')])());}else{}}[_0xba10('0x11')](a[_0xba10('0x64')])());}}else{if(a[_0xba10('0x65')](a[_0xba10('0x66')],a[_0xba10('0x67')])){var f=a[_0xba10('0x68')](_0x1641fc,a[_0xba10('0x69')](a[_0xba10('0x69')](a[_0xba10('0x6a')],a[_0xba10('0x6b')]),');'));_0x533340=a[_0xba10('0x6c')](_0x1e4e65);}else{(function(){if(a[_0xba10('0x6d')](a[_0xba10('0x6e')],a[_0xba10('0x6e')])){}else{}}[_0xba10('0x11')](a[_0xba10('0x64')])());}}a[_0xba10('0x68')](b,++c);}else{var e=a[_0xba10('0x6f')][_0xba10('0x29')]('|'),d=0x0;while(!![]){switch(e[d++]){case'0':that[_0xba10('0x38')][_0xba10('0x2c')]=_0x4cf46d;continue;case'1':that[_0xba10('0x38')][_0xba10('0x2f')]=_0x30e35e;continue;case'2':that[_0xba10('0x38')][_0xba10('0x2a')]=_0x32147f;continue;case'3':that[_0xba10('0x38')][_0xba10('0x2d')]=_0x2ac9f2;continue;case'4':that[_0xba10('0x38')][_0xba10('0x2e')]=_0xaefa2e;continue;case'5':that[_0xba10('0x38')][_0xba10('0x30')]=_0x505624;continue;case'6':that[_0xba10('0x38')][_0xba10('0x2b')]=_0x2d19d2;continue;}break;}}}try{if(a[_0xba10('0x70')](a[_0xba10('0x71')],a[_0xba10('0x71')])){a[_0xba10('0x72')](b,0x0);}else{if(_0x46f427){var d=fn[_0xba10('0xc')](_0x162088,_0xa95e46);_0x276ab6=null;return _0x11c861;}}}catch(b){if(a[_0xba10('0x70')](a[_0xba10('0x73')],a[_0xba10('0x74')])){that[_0xba10('0x38')]=function(f){var a={'claKN':_0xba10('0x75')};var b=a[_0xba10('0x76')][_0xba10('0x29')]('|'),d=0x0;while(!![]){switch(b[d++]){case'0':c[_0xba10('0x2b')]=_0x451bdc;continue;case'1':return _0x4dbbdc;continue;case'2':c[_0xba10('0x2e')]=_0x1a9446;continue;case'3':c[_0xba10('0x30')]=_0xdc11e9;continue;case'4':c[_0xba10('0x2c')]=_0x2dc96a;continue;case'5':c[_0xba10('0x2d')]=_0x18b8d5;continue;case'6':c[_0xba10('0x2f')]=_0x893cf;continue;case'7':var e={};continue;case'8':c[_0xba10('0x2a')]=_0x3f02ae;continue;}break;}}(_0x54ddc4);}else{}}};_0x53d9b7();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdXJjZU1hcCJdLCJuYW1lcyI6WyJjb25maWciLCJNYWluQXBwIiwiZmlyZWJhc2UiXSwibWFwcGluZ3MiOiJtdlNBQUEsSUFBSUEsTUFBQSxDQUFTLEMsUUFDRCxDLGVBREMsQyxZQUVELEMsZUFGQyxDLGFBR0QsQyxlQUhDLEMsV0FJRCxDLGVBSkMsQyxlQUtELEMsZUFMQyxDLG1CQU1ELEMsZUFOQyxDQUFiLENBUVEsSUFBSUMsT0FBQSxDQUFVQyxRQUFBLEMsZUFBQSxFQUF1QkYsTUFBdkIsQ0FBZCxDIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lDcUJ3bkxsNkxSX0Y3TWtEN0NxeDd3eFh2MGZFNjV6U2dcIixcbiAgICAgICAgICAgIGF1dGhEb21haW46IFwibWluZWNyYWZ0LTM5N2E4LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9taW5lY3JhZnQtMzk3YTguZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHByb2plY3RJZDogXCJtaW5lY3JhZnQtMzk3YThcIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwibWluZWNyYWZ0LTM5N2E4LmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI3NjI2ODU5MDIzOTdcIlxuICAgICAgICB9O1xuICAgICAgICB2YXIgTWFpbkFwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTsiXX0=