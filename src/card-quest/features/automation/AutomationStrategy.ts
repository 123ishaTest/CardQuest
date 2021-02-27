import {Adventure} from "@/card-quest/adventure/Adventure";
import {AutomationStrategyId} from "@/card-quest/features/automation/AutomationStrategyId";

export abstract class AutomationStrategy {
    id: AutomationStrategyId;
    title: string;
    description: string;
    currentTurn: number

    protected constructor(id: AutomationStrategyId, title: string, description: string, currentTurn: number) {
        this.id = id;
        this.title = title
        this.description = description;
        this.currentTurn = currentTurn;
    }

    restart() {
        this.currentTurn = 0;
    }

    abstract performAction(adventure: Adventure): void;

}