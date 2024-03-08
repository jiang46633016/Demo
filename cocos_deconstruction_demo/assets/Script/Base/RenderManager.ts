import { _decorator, Component, Node } from 'cc';
import EventManager from '../Runtime/EventManager';
import { EventEnum } from '../Enum/Index';
const { ccclass, property } = _decorator;

@ccclass('RenderManager')
export abstract class RenderManager extends Component {

    onLoad() {
        EventManager.Instance.on(EventEnum.Render, this.render, this);
    }

    onDisable() {
        EventManager.Instance.off(EventEnum.Render, this.render);
    }

    start() {
        this.render();
    }

    abstract render(): void;
}

