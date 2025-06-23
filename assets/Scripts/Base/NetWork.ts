import { _decorator, Component, director, game, Node } from 'cc';
import Singleton from '../Use/Singleton';
const { ccclass, property } = _decorator;

@ccclass('NetWork')
export class NetWork extends Singleton<NetWork> {
    test: number = 3;//用以测试

    protected onLoad() {
        NetWork._instance = this;
        director.addPersistRootNode(this.node);
    }

    protected onDestroy() {
        if (NetWork._instance === this) {
            director.removePersistRootNode(this.node);
            NetWork._instance = null;
        }
    }
}


