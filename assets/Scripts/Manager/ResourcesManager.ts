import {
    _decorator, Component, Node, Sprite, SpriteFrame
}
from 'cc';
import Singleton from '../Use/Singleton';
const {
    ccclass, property
}
= _decorator;

@ccclass('ResourcesManager') 
export class ResourcesManager extends Singleton<ResourcesManager > {
    protected onLoad():void {
        ResourcesManager._instance = this;
    }

    @property(SpriteFrame) 
    loopTextArrzy: SpriteFrame[] = [];

    @property(SpriteFrame) 
    iconArray: SpriteFrame[] =[];

    @property(SpriteFrame) 
    deskEmptyImg: SpriteFrame[] = [];

    @property(SpriteFrame) 
    fastBtnImg: SpriteFrame[] =[];

    @property(SpriteFrame)
    deskItemImg:SpriteFrame[] = [];
}
