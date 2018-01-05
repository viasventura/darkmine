var immList = {};
var immTrig = {};

function loadImage(key, url) {
    if (immTrig[key]) {
        immTrig[key].val = [false, key];
    } else {
        if (!url) {
            MainApp.database().ref(fε.getValue("client") + "/users/" + key + "/imgUrl").once("value", function(snapImgUrl) {
                url = snapImgUrl.val();
            }).then(function() {
                immTrig[key] = {
                    keyx: key,
                    src: url,
                    value: false,
                    get val() {
                        return immList[this.value];
                    },
                    set val(x) {
                        this.value = x[0];
                        $("img[preload='" + this.keyx + "']").each(function(index, valImg) {
                            console.log(valImg);
                            $(valImg).attr("src", immTrig[x[1]].src);
                            $(valImg).removeAttr("preload");
                        });
                    }
                }
                immList[key] = new Image();
                immList[key].preload = key;
                immList[key].onload = function(event) {
                    immTrig[$(this).context.preload].val = [true, $(this).context.preload];
                }
                immList[key].src = url;
            });
        } else {
            immTrig[key] = {
                keyx: key,
                src: url,
                value: false,
                get val() {
                    return immList[this.value];
                },
                set val(x) {
                    this.value = x[0];
                    $("img[preload='" + this.keyx + "']").each(function(index, valImg) {
                        console.log(valImg);
                        $(valImg).attr("src", immTrig[x[1]].src);
                        $(valImg).removeAttr("preload");
                    });
                }
            }
            immList[key] = new Image();
            immList[key].preload = key;
            immList[key].onload = function(event) {
                immTrig[$(this).context.preload].val = [true, $(this).context.preload];
            }
            immList[key].src = url;
        }

    }

}

function forceLoadImage(keys) {
    if (keys.constructor === Array ? true : false) {
        for (var x in keys) {
            loadImage(keys[x]);
        }
    }else{
        loadImage(keys);
    }
}