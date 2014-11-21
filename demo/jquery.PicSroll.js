/*!
 * Name PicSroll
 * Author zhangycx
 * Created by zhangycx on 14-11-17.
 * Version Beta 2.2
 */
(function ($) {
    $.fn.PicSroll = function (options) {
        var defaultVal = {          //默认参数设置
            roll: "banner",       //滚动容器(position: relative;)
            prev: "prev",         //上翻容器
            next: "next",         //下翻容器
            n: null,             //翻动个数,默认为空(为空时自动获取)
            autoTime: 3000,       //自动间隔时间,默认值3000ms
            speed: 800,           //切换花费时间默认800ms
            autoFun: null,       //自动执行方法过度
            numBtnId: "num123",        //按钮控制容器
            numBtnStyle: 'num',        //按钮控制选中样式
            numBtnPosition: 960,       //按钮位置
            numBtnMargin: 30,          //按钮间距
            numBtnTag: 'span'            //按钮html标签
        };
        var setting = $.extend(defaultVal, options);    //配置参数扩展
        var _self = {               //方法封装开始
            _init: function () {
                _self.defaultParam();
                _self.numBtnInit();
                _self.auto();
                _self.clickFn();
            },
            defaultParam: function () {
                if (setting.n == null) {
                    setting.n = $('#' + setting.roll + ' li').length;
                }
            },
            numBtnInit: function () {//按钮初始化
                if (setting.numBtnId == null) {
                    return;
                } else {
                    if ($('#' + setting.numBtnId).length > 0) {
                        $('#' + setting.numBtnId).empty();
                    }
                    for (var j = 0; j < setting.n; j++) {
                        $('#' + setting.numBtnId).append('<' + setting.numBtnTag + '></' + setting.numBtnTag + '>');
                        $('#' + setting.numBtnId).has(setting.numBtnTag).children().addClass(setting.numBtnStyle);
                        var r = (setting.numBtnPosition - j * setting.numBtnMargin) + "px";
                        $('#' + setting.numBtnId + " ." + setting.numBtnStyle).eq(j).css({"right": r, "position": "absolute"});
                        $('#' + setting.numBtnId + " ." + setting.numBtnStyle).eq(j).attr("id", setting.numBtnId + "_" + j);
                    }
                }
            },
            auto: function () {
                var next_img = $('#' + setting.next);
                if (next_img.length > 0) {
                    setting.autoFun = setInterval(function () {
                        next_img.trigger('click');//模拟点击
                    }, setting.autoTime);
                }
            },
            clearAuto: function () {
                clearTimeout(setting.autoFun);
            },
            clearFn: function (e) {//清除自动滑动
                e.hover(function () {
                    _self.clearAuto();
                }, function () {
                    _self.auto();
                });
            },
            clickFn: function () {//事件绑定集
                var next_img = $('#' + setting.next), prev_img = $('#' + setting.prev), imgL = $('#' + setting.roll), btn_con = $('#' + setting.numBtnId);
                if (next_img.length > 0) {
                    _self.clearFn(next_img);
                    next_img.click(function () {//右翻事件绑定
                        _self.RightRoll();
                    });
                }
                if (prev_img.length > 0) {
                    _self.clearFn(prev_img);
                    prev_img.click(function () {//左翻事件绑定
                        _self.LeftRoll();
                    });
                }
                if (btn_con.length > 0) {
                    _self.clearFn(btn_con);
                    btn_con.children().click(function () {//数字按钮方法绑定
                        var id = $(this).attr("id");
                        var __num = setting.numBtnId.length + 1;//实际按钮id前缀长度获取
                        _self.ClickNumBtn(id.substring(__num));
                    })
                }
                if (imgL.length > 0) {
                    _self.clearFn(imgL);
                }
            },
            ClickNumBtn: function (num) {
                if (num) {
                    var imgL = $('#' + setting.roll);
                    if (!imgL.is(":animated")) {    //防止重复执行动画
                        imgL.animate({"left": '-' + num * 100 + "%"}, setting.speed / 2);
                    } else {
                        console.log("The last action(numBtn_click) is not the end!");
                    }
                }
            },
            LeftRoll: function () {
                var imgL = $('#' + setting.roll);
                if (!imgL.is(":animated")) {    //防止重复执行动画
                    var left = parseInt(imgL.css('left'));
                    var l = (Math.ceil(left / 100)) * 100 + 100;//左按钮向上取整
                    if (l > 0) {
                        l = -setting.n * 100 + 100;
                    }
                    imgL.animate({"left": l + "%"}, setting.speed);
                } else {
                    console.log("The last action(prev) is not the end!");
                }
            },
            RightRoll: function () {
                var imgL = $('#' + setting.roll);
                if (!imgL.is(":animated")) {    //防止重复执行动画
                    var left = parseInt(imgL.css('left'));
                    var l = (Math.floor(left / 100)) * 100 - 100;//右按钮向下取整
                    if (l <= -setting.n * 100) {
                        l = 0;
                    }
                    imgL.animate({"left": l + "%"}, setting.speed);
                } else {
                    console.log("The last action(next) is not the end!");
                }
            }
        };
        $(function () {
            _self._init();
        });
    };
})(jQuery);