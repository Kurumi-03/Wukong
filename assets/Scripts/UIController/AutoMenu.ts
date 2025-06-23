import {
    _decorator,
    Component,
    Label,
    Node,
    Toggle
} from 'cc';
import { EventManager } from '../Manager/EventManager';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('AutoMenu')
export class AutoMenu extends Component {
    @property(Toggle)
    fastMode: Toggle | null = null;

    @property(Toggle)
    free: Toggle | null = null;

    @property(Label)
    betCount: Label | null = null;

    private currentCount: number = 0;//目前暂定-1为无限次
    private currentIndex: number = 0;

    private isFast: boolean = false;
    private isFree: boolean = false;

    protected start(): void {
        let array = DataManager.Instance(DataManager).countArray;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
        this.fastMode.isChecked = this.isFast;
        this.free.isChecked = this.isFree;
    }

    Add() {
        let array = DataManager.Instance(DataManager).countArray;
        if (this.currentIndex >= array.length - 1)
            return;
        this.currentIndex++;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
    }

    Delete() {
        let array = DataManager.Instance(DataManager).countArray;
        if (this.currentIndex <= 0)
            return;
        this.currentIndex--;
        this.currentCount = array[this.currentIndex];
        this.betCount.string = this.currentCount.toString();
    }

    FastMode() {
        this.isFast = !this.isFast;
    }

    Free() {
        this.isFree = !this.isFree;
    }

    AutoPlay() {
        this.node.active = false;
        DataManager.Instance(DataManager).autoCount = this.currentCount;
        DataManager.Instance(DataManager).isAutoToFree = this.isFree;
        EventManager.Send("EnableAutoBtn", false);
        EventManager.Send("AutoFastMode", this.isFast);
        EventManager.Send("AutoPlay");
    }
}
