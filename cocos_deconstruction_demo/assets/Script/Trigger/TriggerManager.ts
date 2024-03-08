import { _decorator, Component, ModelComponent, Node, Sprite, SpriteComponent, SpriteFrame } from 'cc';
import { ItemStatusEnum, ItemTypeEnum, TriggerTypeEnum } from '../Enum/Index';
import DataManager from '../Runtime/DataManager';
import { RenderManager } from '../Base/RenderManager';
const { ccclass, property } = _decorator;

@ccclass('TriggerManager')
export abstract class TriggerManager extends RenderManager {
    type: TriggerTypeEnum

    render() {

    }

    abstract handleTrigger(): void;


}

