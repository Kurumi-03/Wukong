import {_decorator, Component, Label, Node} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('Utils')
export class Utils { // 将数字转为2位小数的千分位字符串
    static NumberToString(num : number): string {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

}
