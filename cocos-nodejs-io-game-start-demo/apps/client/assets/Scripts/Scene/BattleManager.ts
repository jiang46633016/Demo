import { _decorator, Component, instantiate, Node, Prefab, SpriteFrame } from 'cc';
import DataManager from '../Global/DataManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { ResourceManager } from '../Global/ResourceManager';
import { ActorManager } from '../Entity/Actor/ActorManager';
import { PrefabPathEnum, TexturePathEnum } from '../Enum';
import { EntityTypeEnum, InputTypeEnum } from '../Common/Enum';
import { BulletManager } from '../Entity/Bullet/BulletManager';
import { ObjectPoolManager } from '../Global/ObjectPoolManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    private stage: Node
    private ui: Node
    private shouldUpdate = false;

    async start() {
        await this.loadRes();
        this.initMap();
        this.shouldUpdate = true;
    }

    onLoad() {
        DataManager.Instance.stage = this.stage = this.node.getChildByName("Stage");
        this.ui = this.node.getChildByName("UI");
        this.stage.destroyAllChildren();
        DataManager.Instance.jm = this.ui.getComponentInChildren(JoyStickManager)
    }

    initMap() {
        const prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Map)
        const actor = instantiate(prefab);
        actor.setParent(this.stage);
    }

    async loadRes() {
        const list = [];
        for (const type in PrefabPathEnum) {
            const p = ResourceManager.Instance.loadRes(PrefabPathEnum[type], Prefab).then((prefab) => {
                DataManager.Instance.prefabMap.set(type, prefab)
            })
            list.push(p);
        }

        for (const type in TexturePathEnum) {
            const p = ResourceManager.Instance.loadDir(TexturePathEnum[type], SpriteFrame).then((spriteFrame) => {
                DataManager.Instance.textureMap.set(type, spriteFrame)
            })
            list.push(p);
        }
        await Promise.all(list);
    }

    update(deltaTime: number) {
        if (!this.shouldUpdate) {
            return;
        }
        this.render();
        this.tick(deltaTime);
    }

    tick(deltaTime) {
        this.tickActor(deltaTime);

        DataManager.Instance.applyInput({
            type: InputTypeEnum.TypePast,
            deltaTime: deltaTime
        })
    }

    tickActor(deltaTime) {
        for (const data of DataManager.Instance.state.actors) {
            const { id } = data;
            let am = DataManager.Instance.actorMap.get(id);
            am.tick(deltaTime);
        }
    }

    render() {
        this.renderActor();
        this.renderBullet();
    }

    async renderActor() {
        for (const data of DataManager.Instance.state.actors) {
            const { id, type } = data;
            let am = DataManager.Instance.actorMap.get(id);
            if (!am) {
                const prefab = DataManager.Instance.prefabMap.get(type)
                const actor = instantiate(prefab);
                actor.setParent(this.stage);
                am = actor.addComponent(ActorManager);
                DataManager.Instance.actorMap.set(data.id, am);
                am.init(data);
            } else {
                am.render(data);
            }
        }
    }

    renderBullet() {
        for (const data of DataManager.Instance.state.bullets) {
            const { id, type } = data;
            let bm = DataManager.Instance.bulletMap.get(id);
            if (!bm) {
                const bullet = ObjectPoolManager.Instance.get(type)
                bm = bullet.getComponent(BulletManager) || bullet.addComponent(BulletManager);
                DataManager.Instance.bulletMap.set(data.id, bm);
                bm.init(data);
            } else {
                bm.render(data);
            }
        }

    }
}

