import { _decorator, Component, director, Node, Sprite } from 'cc';
import { TriggerManager } from './TriggerManager';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum/Index';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('DoorTriggerManager')
export class DoorTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.Door


    render() {
        super.render();

        this.getComponent(Sprite).enabled = DataManager.Instance.doorStutas === TriggerStatusEnum.Resolved;
    }

    handleTrigger() {
        if (DataManager.Instance.doorStutas === TriggerStatusEnum.Pengind) {
            DataManager.Instance.curScene = SceneEnum.H2A;
        } else {
            DataManager.Instance.curScene = SceneEnum.H3;
        }
    }

}

