import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Utils')
export class Utils {
    // 将数字转为2位小数的千分位字符串
    static NumberToString(num: number): string {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    //将日期字符串转为日期数组 年 月 日 时 分
    static StringToDateArray(date: string): number[] {
        let array: number[] = [];
        let s = date.split("/");
        for (let i = 0; i < s.length; i++) {
            array[i] = parseInt(s[i]);
        }
        array[1] = parseInt(s[1]) - 1;//月份需要单独处理
        return array;
    }

    //将小于10的数字补齐为两位显示为字符串
    static NumberZero(num: number): string {
        return num < 10 ? "0" + num.toString() : num.toString();
    }
}
