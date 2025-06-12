import {_decorator, Component, Node} from 'cc';
import Singleton from '../Use/Singleton';
const {ccclass, property} = _decorator;

@ccclass('ConstManager')
export class ConstManager extends Singleton < ConstManager > {
    protected onLoad(): void {
        ConstManager._instance = this;
    }

    betArray : number[] = [
        0.4,
        0.8,
        1.6,
        3.2,
        6.4,
        16,
        20,
        80
    ];

    countArray : number[] = [
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90
    ];
}
