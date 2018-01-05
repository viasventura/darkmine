var isResized = false;
$(window).on("resize",function(){
    if(isResized == false){
       $(".chatContainer .chatHeader .chatHide").trigger("click"); 
       isResized=true;
    }
});

$(".chatContainer .chatHeader .chatHide").click(function(event) {
    event.stopPropagation();
    $(".chatContainer").animate({
        "left": "100%"
    }, 500, function() {
        $(".chatToggle").animate({
                "left": "98%"
            },
            200);
    });
    $(".chatBaseWorking").animate({
        "width": "100%"
    }, 500);
    $(".chatBaseReserved").animate({
        "width": "0%"
    }, 500);
});
$(".chatToggle").click(function() {
        isResized = false;
    $(this).animate({
        "left": "100%"
    }, 200, function() {
        console.log($("body").css("width"));
        $(".chatContainer").animate({
            "left": parseInt($("body").css("width").replace("px","")) - parseInt($(".chatContainer").css("width").replace("px",""))
        }, 500);
    });
    $(".chatBaseWorking").animate({
        "width": parseInt($("body").css("width").replace("px","")) - parseInt($(".chatContainer").css("width").replace("px",""))
    }, 500);
    $(".chatBaseReserved").animate({
        "width": parseInt($(".chatContainer").css("width").replace("px",""))
    }, 500);
});

var chatOpa = true;
$(".chatOpacity").click(function() {
    if (chatOpa == true) {
        $(".chatContainer").animate({
            "opacity": "0.2"
        }, 500, function() {
            chatOpa = false;
        });
        $(".chatBaseWorking").animate({
            "opacity": "0.2"
        }, 500);
    } else {
        $(".chatContainer").animate({
            "opacity": "1"
        }, 500, function() {
            chatOpa = true;
        });
        $(".chatBaseWorking").animate({
            "opacity": "1"
        }, 500);
    }
});


var chatUsers = {};

function chatFilter(data, callback) {
    var userList = fε.getValue(fε.getValue("client") + "/low_users");
    if (data) {
        var c_user = fε.getValue("user");
        for (var userid in data) {
            if (c_user != userid) {
                if (chatUsers[userid]) {
                    chatUsers[userid].val = data[userid];
                } else {
                    var cl = "";
                    if (data[userid] === "offline") {
                        cl = "thumb-sm img-circle thumb-br-r";
                    } else if (data[userid] === "ideal") {
                        cl = "thumb-sm img-circle thumb-br-y";
                    } else if (data[userid] === "online") {
                        cl = "thumb-sm img-circle thumb-br-g";
                    }
                    var st = '<div class="col-sm-12" id="chatStats_' + userid + '"><a href="javascript:void(0);"><img src="assets/images/users/default_profile.png" alt="img" class="' + cl + '"></a><label>&nbsp ' +
                        userList[userid] +
                        '</label></div>';
                    $(st).insertBefore('#chatInsertBefore');
                    //var ct_temp = 
                    $("#chatStats_" + userid).click(function() {
                        var _temp = $(this).attr("id").replace("chatStats_", "");
                        if ($("#chatBase_" + _temp).length == 0) {
                            var cls = "";
                            if ($("#chatStats_" + _temp + " a img").hasClass("thumb-br-g") == true) {
                                cls = "fa fa-circle onlClass";
                            } else if ($("#chatStats_" + _temp + " a img").hasClass("thumb-br-y") == true) {
                                cls = "idlClass";
                            } else {
                                cls = "offClass";
                            }
                            var msg = '<br>';
                            $('<div class="chatMinContainer" id="chatBase_' + _temp + '"><div class="chatMinHeader">&nbsp<label><label class="' + cls + '">&nbsp&nbsp</label> ' + userList[_temp] + '</label><label class="fa fa-close chatMinClose"></label></div><div class="chatMinBody chat scrollbar style-1">' + msg + '</div><div class="chatMinFooter"><textarea class="form-control" maxlength="150"></textarea></div><div class="clearfix"></div></div>').insertBefore('#chatBaseInsertBefore');
                            createChatNode(_temp);
                        }
                    });


                    chatUsers[userid] = {
                        usx : userid,
                        value: data[userid],
                        get val() {
                            return this.value;
                        },
                        set val(x) {
                            if (this.value != x) {
                                this.value = x;
                                if (x === "offline") {
                                    $("#chatStats_" + this.usx + " a img").attr("class", "thumb-sm img-circle thumb-br-r");
                                    $("#chatBase_" + this.usx + " .chatMinHeader label label").attr("class", "offClass");
                                } else if (x === "ideal") {
                                    $("#chatStats_" + this.usx + " a img").attr("class", "thumb-sm img-circle thumb-br-y");
                                    $("#chatBase_" + this.usx + " .chatMinHeader label label").attr("class", "idlClass");
                                } else if (x === "online") {
                                    $("#chatStats_" + this.usx + " a img").attr("class", "thumb-sm img-circle thumb-br-g");
                                    $("#chatBase_" + this.usx + " .chatMinHeader label label").attr("class", "onlClass");
                                }

                            }
                        }
                    }
                }
            }


        }
        if (callback) {
            callback(data);
        }
    }

}


function createChatNode(to) {
    var u = fε.getValue("user");
    fε.loadData(fε.getValue("client") + "/chatConvos/" + u + "-" + to, function(dt) {
        if (dt) {
            watchChatNode(dt.d, to);
        } else {
            var timeStampData = (new Date()).getTime();
            var nodePath = Base64.encode((randomString(12) + timeStampData));
            var ins = {
                d: nodePath
            }
            MainApp.database().ref(fε.getValue("client") + "/chatConvos/" + u + "-" + to).set(ins).then(function() {

            });
            MainApp.database().ref(fε.getValue("client") + "/chatConvos/" + to + "-" + u).set(ins).then(function() {

            });
            var preChat = {};
            preChat[timeStampData + "-sysChat"] = "Hello! Start the day with Hi.";
            MainApp.database().ref(fε.getValue("client") + "/chatData/" + nodePath).set(preChat).then(function() {
                setTimeout(function() { watchChatNode(nodePath, to); }, 3000);

            });
        }
        
    });
}


function watchChatNode(nd, to) {
    var u = fε.getValue("user");
    $("#chatBase_" + to + " .chatMinHeader .chatMinClose").click(function(){
            $(this).parent().parent().remove();
            MainApp.database().ref(fε.getValue("client") + "/chatData/" + nd).off();

        });
    $("#chatBase_" + to + " .chatMinFooter textarea").on("keypress", function(e) {
        var key = e.keyCode;

        // If the user has pressed enter
        if (key == 13) {
            var _obj = $(this);
            var ux =(new Date()).getTime() + "-" + u;
            MainApp.database().ref(fε.getValue("client") + "/chatData/" + nd + "/"+ux).set($(this).val()).then(function() {
                
                $(_obj).val("");
                $("#chatBase_" + to + " .chatMinBody").scrollTop($("#chatBase_" + to + " .chatMinBody")[0].scrollHeight);
            });
            return false;
        } else {
            return true;
        }
    });
    MainApp.database().ref(fε.getValue("client") + "/chatData/" + nd).orderByKey().limitToFirst(100).on("child_added", function(addedData) {
        var dt = addedData.val();
        var p = addedData.key;
        if (p.indexOf(u) > -1) {
            $("#chatBase_" + to + " .chatMinBody").append('<div class="col-sm-12"><div class="bubble you">' + dt + '</div></div>');
            $("#chatBase_" + to + " .chatMinBody").scrollTop($("#chatBase_" + to + " .chatMinBody")[0].scrollHeight);
        } else {
            $("#chatBase_" + to + " .chatMinBody").append('<div class="col-sm-12"><div class="bubble me">' + dt + '</div></div>');
            $("#chatBase_" + to + " .chatMinBody").scrollTop($("#chatBase_" + to + " .chatMinBody")[0].scrollHeight);
        }
    });
}