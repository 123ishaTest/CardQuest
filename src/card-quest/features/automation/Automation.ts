import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {AutomationStrategy} from "@/card-quest/features/automation/AutomationStrategy";
import {DummyStrategy} from "@/card-quest/features/automation/DummyStrategy";

export class Automation extends Feature {

    private readonly AUTOMATION_INTERVAL = 1;
    private _nextTick = this.AUTOMATION_INTERVAL;

    private _adventure: Adventure | undefined = undefined;
    private _strategy: AutomationStrategy;
    public isActive: boolean = false;
    public targetLevel: LevelId | undefined = undefined;

    constructor() {
        super('automation');
        this._strategy = new DummyStrategy();
    }

    registerAdventure(adventure: Adventure) {
        this._adventure = adventure;
    }

    update(delta: number) {
        this._nextTick -= delta;
        if (this._nextTick <= 0) {
            this.performAutomation();
            this._nextTick = this.AUTOMATION_INTERVAL;
        }
    }

    public performAutomation(): void {
        if (this._adventure == undefined || !this.isActive || !this._adventure.isActive) {
            return;
        }
        this._strategy.performAction(this._adventure);
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}