import {
    _decorator, Component, Node
}
    from 'cc';
import Singleton from '../Use/Singleton';
const {
    ccclass, property
}
    = _decorator;

export interface DeskInfo {
    isClock: boolean; // 是否被锁定
    isEmpty: boolean; // 是否有人
    isClockMe: boolean;//被自己锁定
    index: number; // 桌子编号
    percent: number; // 赔率
    data: {
        data1: number;
        data2: number;
        data3: number;
        todayAll: number;
        totalPercent: number;
        lastAll: number;
        lastPercent: number;
    }
}

@ccclass('ConstManager')
export class ConstManager extends Singleton<ConstManager> {
    protected onLoad(): void {
        ConstManager._instance = this;
    }

    betArray: number[] = [0.4, 0.8, 1.6, 3.2, 6.4, 16, 20, 80];

    countArray: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    deskInfos: DeskInfo[][] = [
        [
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1001, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: true, isEmpty: false, isClockMe: false, index: 1002, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: true, isClockMe: true, index: 1003, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1005, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: true, isEmpty: false, isClockMe: false, index: 1006, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: true, isClockMe: false, index: 1007, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1008, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
        ],
        [
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1008, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1008, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1008, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1008, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
            {
                isClock: false, isEmpty: false, isClockMe: false, index: 1008, percent: 87.12, data: {
                    data1: 11,
                    data2: 12,
                    data3: 13,
                    todayAll: 123154,
                    totalPercent: 123.21,
                    lastAll: 546531,
                    lastPercent: 121.1,
                }
            },
        ]
    ]
}
