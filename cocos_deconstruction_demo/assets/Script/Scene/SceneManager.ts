import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { SceneEnum } from '../Enum/Index';
import { RenderManager } from '../Base/RenderManager';
import DataManager from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {
    @property(Node)
    items: Node = null;

    @property(Prefab)
    inventory: Prefab = null;

    @property(Prefab)
    menu: Prefab = null;

    type: SceneEnum;

    start() {
        super.start();

        if (this.inventory) {
            const inventory = instantiate(this.inventory);
            this.node.addChild(inventory);
        }

        if (this.menu) {
            const menu = instantiate(this.menu);
            this.node.addChild(menu);
        }
    }

    render() {
        if (DataManager.Instance.curScene === this.type) {
            return;
        }
        director.loadScene(DataManager.Instance.curScene);
    }

    changeScene(event: Event, scene: string) {
        DataManager.Instance.curScene = scene as SceneEnum;
      
    }

    update(deltaTime: number) {

    }
}

