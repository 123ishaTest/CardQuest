import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {AutomationStrategy} from "@/card-quest/features/automation/AutomationStrategy";
import {DummyStrategy} from "@/card-quest/features/automation/DummyStrategy";
import {AutomationStrategyId} from "@/card-quest/features/automation/AutomationStrategyId";
import {App} from "@/App";

export class Automation extends Feature {

    private readonly AUTOMATION_INTERVAL = 1;
    private _nextTick = this.AUTOMATION_INTERVAL;

    private _adventure: Adventure | undefined = undefined;
    public strategies: AutomationStrategy[];

    public selectedStrategy: AutomationStrategyId;
    public selectedLevel: LevelId;

    public isActive: boolean = false;

    constructor() {
        super('automation');
        this.strategies = [
            new DummyStrategy(),
        ];
        this.selectedStrategy = AutomationStrategyId.Dummy;
        this.selectedLevel = LevelId.TutorialLevel;
    }

    registerAdventure(adventure: Adventure) {
        this._adventure = adventure;
    }

    update(delta: number) {
        if (!this.isActive) {
            return;
        }
        this._nextTick -= delta;
        if (this._nextTick <= 0) {
            this.performAutomation();
            this._nextTick = this.AUTOMATION_INTERVAL;

            if (!this._adventure?.isActive) {
                App.game.goOnAnAdventure(this.selectedLevel);
            }
        }
    }

    public performAutomation(): void {
        if (this._adventure == undefined || !this.isActive || !this._adventure.isActive) {
            return;
        }
        this.strategies[this.selectedStrategy].performAction(this._adventure);
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}