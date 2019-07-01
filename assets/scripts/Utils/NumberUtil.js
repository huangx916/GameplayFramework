var timeOutArr = {};
//获取最大值
function getMax(a, b) {
    var result = [a, b];
    //如果a长度小于b长度
    if (a.length < b.length) {
        //b放前面
        result[0] = b;
        result[1] = a;
        //返回result长度为3，为了减法的不够减而准备
        result[2] = 'not';
        //返回最终数组
        return result;
    }
    //如果a长度等于b长度
    if (a.length == b.length) {
        //循环对比a,b里面的单个元素
        for (var i = 0; i < a.length; i++) {
            if (result[0][i] > result[1][i]) {
                result[0] = a;
                result[1] = b;
                return result;
            }
            if (result[0][i] < result[1][i]) {
                result[0] = b;
                result[1] = a;
                result[2] = 'not';
                return result;
            }
            //假如全部相等，当最后一个元素，以上条件都不执行，则执行默认的返回结果
            if (i == a.length - 1) {
                return result;
            }
        }
    }
    if (a.length > b.length) {
        return result;
    }
}

//删除字符串前面多余的0
function shanchuling(result) {
    //首先判断是否全部都是0，是的话直接返回一个0
    if (result == 0) {
        result = 0;
        //返回最终字符串
        return result;
    }
    //把字符串分割成数组
    result = result.split('');
    //获取数组长度
    var hebing = result.length;
    for (var j = 0; j < hebing; j++) {
        //判断数组首位是否为0
        if (result[0] == 0) {
            //把数组首位删掉
            result.splice(0, 1);
        }
        else {
            //删除完了就跳出循环
            break;
        }
    }
    //返回最终字符串
    return result;
}

// 获取小数的位数
function getDecimalDigits(n) {
    if (typeof n == 'number')
        return n.toString().split(".")[1] != null ? n.toString().split(".")[1].length : 0;
    else if (typeof n == 'string')
        return n.split(".")[1] != null ? n.split(".")[1].length : 0;
}

// var UNIT = ["", "K", "M", "B", "T", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH"];
var UNIT = ["", "K", "M", "B", "T"];
for (let aaa = 0;aaa < 2;aaa++){
    for (let bbb = 0;bbb < 26;bbb++){
        UNIT.push(String.fromCharCode(65+aaa)+String.fromCharCode(65+bbb));
    }
}
module.exports = {
    /***
     * 筹码转换为单位
     * @param number
     * @returns {string}
     */
    unit_format: function (number) {
        number = number.toString();
        var unit = "";
        var decimals = 0;
        if (number.length > 6) {
            var length = parseInt(number.length / 3);
            var remainder = number.length % 3;
            if(remainder == 0) {
                length = length - 2;
            } else {
                length = length - 1;
            }
            unit = UNIT[length];
            number = number.substr(0, number.length - length * 3);
        }
        return this.number_format(number, decimals, ",") + unit;
    },
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * thousands_sep：千分位符号
    * */
    number_format: function (number, decimals, thousands_sep) {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = '.',
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    },

    //检查是不是n位数字，不足补全
    setNumberLength:function(num,length){
        num=num.toString();
        while (num.length<length){
            num='0'+ num;
        }
        return num;
    },

    /*
    * 参数说明：
    * number：要格式化的时间，单位秒
    * */
    time_format: function (number) {
        var hour = this.setNumberLength(Math.floor(number/3600),2);
        number = number%3600;
        var min = this.setNumberLength(Math.floor(number/60),2);
        var sec = this.setNumberLength(number%60,2);
        return hour+":"+min+":"+sec;
    },

    /***
     * 数组排序
     */
    sortByType: function (array, type) {
        var by = function (type) {
            return function (o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[type];
                    b = p[type];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return a < b ? -1 : 1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                }
                else {
                    throw ("error");
                }
            }
        };
        return array.sort(by(type));
    },

    /***
     * 倒计时
     */
    countTime: function (second, callback) {
        callback(second);
        let id = setInterval(function () {
            second--;
            if (second >= 0) {
                callback(second);
            } else {
                cc.log('stop Interval='+id)
                clearInterval(id);
            }
        }.bind(this), 1000);
        return id;
    },

    clearInterval: function (id) {
        cc.log('clearInterval='+id)
        clearInterval(id);
    },

    /***
     * 是否是同一天
     */
    isOneDay: function (perTime, nowTime) {
        var per = new Date(parseInt(perTime));
        var now = new Date(parseInt(nowTime));
        if(per.getFullYear() == now.getFullYear()) {
            if(per.getMonth() == now.getMonth()) {
                if(per.getDate() == now.getDate()) {
                    return true;
                }
            }
        }
        return false;
    },

    /***
     * 随机数
     */
    randomNum: function (minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },


    /***
     * 大数相加
     */
    galaxyAdd: function (a, b) {
        //把a,b放进zong数组
        var zong = [String(a), String(b)];
        //创建fen数组
        var fen = [];
        //把a,b较大的放在前面
        zong = getMax(zong[0], zong[1]);
        //把zong数组里面的元素分成单个数字
        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        //创建加0变量
        var jialing;
        //判断两个参数是否相同长度
        if (!(zong[0].length == zong[1].length)) {
            //创建0
            jialing = new Array(zong[0].length - zong[1].length + 1).join('0');
            //把0放进zong[1]前面
            zong[1] = jialing.split('').concat(zong[1]);
        }
        //创建补充上一位的数字
        var next = 0;
        //从个位数起对应单个计算
        for (var i = (zong[0].length - 1); i >= 0; i--) {
            //求和
            var he = Number(zong[0][i]) + Number(zong[1][i]) + next;
            //把求和的个位数先放进数组
            fen.unshift(he % 10);
            //把求和的十位数放进补充上一位的数字，留在下一次循环使用
            next = Math.floor(he / 10);
            //判断最后一次如果求和的结果为两位数则把求和的十位数加在最前面
            if (i == 0 && !(next == 0)) {
                fen.unshift(next);
            }
        }
        //把最后的结果转化成字符串
        var result = fen.join('');
        //返回字符串
        return result;
    },

    /***
     * 大数相减
     */
    galaxySub: function (a, b) {
        var zong = [String(a), String(b)];
        var fen = [];
        zong = getMax(zong[0], zong[1]);
        if (zong.length == 3) {
            // alert("金币不足");
            return false;
        }
        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        var jialing;
        if (!(zong[0].length == zong[1].length)) {
            jialing = new Array(zong[0].length - zong[1].length + 1).join('0');
            zong[1] = jialing.split('').concat(zong[1]);
        }
        var next = 0;
        for (var i = (zong[0].length - 1); i >= 0; i--) {
            var cha = Number(zong[0][i]) - Number(zong[1][i]) - next;
            next = 0;
            if (cha < 0) {
                cha = cha + 10;
                next = 1;
            }
            fen.unshift(cha % 10);
        }
        var result = fen.join('');
        if (result[0] == 0) {
            result = shanchuling(result);
        }
        let number = '';
        for (let index = 0; index < result.length; index++) {
            number += '' + result[index];
        }
        if (number == "") number = '0';
        return number;
    },

    /***
     * 大数相乘 b可以是小数 返回是整数
     */
    galaxyMut: function (a, b) {
        var decdigs = getDecimalDigits(b);
        if (decdigs > 0) {
            b = String(b).replace('.', '');
        }
        var zong = [String(a), String(b)];
        var fen = [];
        zong = getMax(zong[0], zong[1]);

        zong[0] = zong[0].split('');
        zong[1] = zong[1].split('');
        if (zong[0].indexOf('N') != -1 || zong[1].indexOf("N") != -1) {
            return a;
        }
        //获取b的长度,处理乘法分配率的乘法
        for (var j = (zong[1].length - 1); j >= 0; j--) {
            var next = 0;
            var fentemp = [];
            var jialing = '';
            //获取a的长度处理乘法
            for (var i = (zong[0].length - 1); i >= 0; i--) {
                var ji = Number(zong[0][i]) * Number(zong[1][j]) + next;
                fentemp.unshift(ji % 10);
                next = Math.floor(ji / 10);
                if (i == 0 && !(next == 0)) {
                    fentemp.unshift(next);
                }
            }
            //后面添加0
            jialing = new Array((zong[1].length - (j + 1)) + 1).join('0');
            fentemp.push(jialing);
            fen[j] = fentemp.join('');
        }
        //处理乘法后的求和
        var cishu = fen.length;
        for (var k = 1; k < cishu; k++) {
            var hebing = this.galaxyAdd(fen[0], fen[1]);
            fen.splice(0, 2, hebing);
        }

        var result = fen.join('');
        if (result[0] == 0) {
            result = shanchuling(result);
        }
        let number = '';
        for (let index = 0; index < result.length - decdigs; index++) {
            if (parseInt(result[index]) >= 0) {
                number += '' + result[index];
            }
        }
        if (number == "") number = '0';
        //result = result.substring(0, result.length - decdigs);
        return number;
    },

    /***
     * 大数相除
     * @param a
     * @param b
     * @returns {string}
     */
    galaxyDiv: function (a, b) {
        a = String(a);
        b = String(b);
        var alen = a.length, blen = b.length;
        var quotient = 0, remainder = 0;
        var result = [], temp = 0;
        for (var i = 0; i < alen; i++) {
            temp = remainder * 10 + parseInt(a[i]);
            if (temp < b) {
                remainder = temp;
                result.push(0);
            } else {
                quotient = parseInt(temp / b);
                remainder = temp % b;
                result.push(quotient);
            }

        }
        //return result.join("").replace(/\b(0+)/gi, "");
        quotient = result.join("").replace(/\b(0+)/gi, "");
        quotient = quotient == "" ? "0" : quotient;
        //return [result.join("").replace(/\b(0+)/gi, ""), remainder];//结果返回[商，余数]
        return [quotient, remainder];
    },

    /***
     * 比较大小
     * @param a
     * @param b
     * @returns 0为相等，1为a大，-1为b大
     */
    cmpBigInt: function (a, b) {
        //cc.log('a=' + a + '     b=' + b)
        a = String(a);
        b = String(b);

        if (a.length > b.length) {
            return 1;
        }

        if (a.length < b.length) {
            return -1;
        }

        //循环对比a,b里面的单个元素
        for (var i = 0; i < a.length; i++) {
            if (a[i] > b[i]) {
                return 1;
            }
            if (a[i] < b[i])
                return -1;
        }

        return 0;
    },

    /***
     * 比较大小
     * @param a
     * @param b
     * @returns a是否大于等于b
     */
    compare: function(a, b) {
        return this.cmpBigInt(a, b) >= 0;
    },

    millisecondToDate: function(msd) {

        //let msd = 0.699999975040555;
        if(msd < 500)
        {
            msd = 0;
        }

        var time = parseFloat(msd) / 1000;

        var hours = parseInt(time / 3600.0);
        var minutes = parseInt((parseFloat(time / 3600.0) -parseInt(time / 3600.0)) * 60);
        var seconds = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    },

    millisecondToMinute: function(msd) {
        if(msd < 500)
        {
            msd = 0;
        }

        var remainTime = parseFloat(msd) / 1000;
        var minit = parseInt((remainTime / 60).toString());
        var second = parseInt((remainTime - minit * 60).toString());
        let time = (minit < 10 ? ('0' + minit) : minit) + ':' + (second < 10 ? ('0' + second) : second);
        return time;
    },


    /***
     * 占位符替换
     */
    format: function (result, args) {
        if(result) {
            if (typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
        }
        return result;
    },

    /***
     * 复制到剪切板
     * @param str
     * @returns {boolean}
     */
    webCopyString : function(str){
        var input = str + '';
        const el = document.createElement('textarea');
        el.value = input;
        el.setAttribute('readonly', '');
        el.style.contain = 'strict';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.fontSize = '12pt'; // Prevent zooming on iOS

        const selection = getSelection();
        var originalRange = false;
        if (selection.rangeCount > 0) {
            originalRange = selection.getRangeAt(0);
        }
        document.body.appendChild(el);
        el.select();
        el.selectionStart = 0;
        el.selectionEnd = input.length;

        var success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) {
        }
        document.body.removeChild(el);
        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }
        return success;
    },
}