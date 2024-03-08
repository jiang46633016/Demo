import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { SceneManager } from './SceneManager';
import DataManager from '../Runtime/DataManager';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum/Index';
const { ccclass, property } = _decorator;

@ccclass('H4SceneManager')
export class H4SceneManager extends SceneManager {
    type: SceneEnum = SceneEnum.H4;
    @property(Prefab)
    mailPrefab: Prefab = null

    @property(Node)
    mailPlaceholder: Node = null

    render() {
        super.render();
        this.items.destroyAllChildren();

        const mail = DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail)
        if (mail && mail.status === ItemStatusEnum.Scene) {
            const mailNode = instantiate(this.mailPrefab);
            this.items.addChild(mailNode);
            mailNode.setPosition(this.mailPlaceholder.position); 
        }
    }
}

