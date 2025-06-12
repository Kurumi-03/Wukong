import {_decorator, Component, Node} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('EventManager')
export class EventManager {
    private static eventList : {
    [key: string]: Array < Function >
    } = {};

    public static Register(eventName : string, call : Function, autodelete : boolean = false): void {
        if (autodelete) {
            this.UnRegisterAll(eventName);
        }
        if (this.eventList[eventName] == null) {
            this.eventList[eventName] = [];
        }
        this.eventList[eventName].push(call);
    }

    public static UnRegisterAll(msgName : string) {
        if (this.eventList[msgName] != null) {
            delete this.eventList[msgName];
        }
    }

    public static UnRegister(msgName : string, onMsgReceived : Function) {
        if (this.eventList[msgName] != null) {
            let index = this.eventList[msgName].indexOf(onMsgReceived);
            if (index > -1) {
                this.eventList[msgName].slice(index, 1);
            }
            if (this.eventList[msgName].length < 1) {
                delete this.eventList[msgName];
            }
        }
    }

    public static Clear() {
        this.eventList = {};
    }

    public static Send(msgName : string, ...arge : any[]) {
        if (this.eventList[msgName] != null) {
            this.eventList[msgName].forEach((func) => {
                func(...arge); 
            });
        }
    }
}
