import {Adventure} from "@/card-quest/adventure/Adventure";

export abstract class AutomationStrategy {
    currentTurn: number

    protected constructor() {
        this.currentTurn = 0;
    }

    abstract performAction(adventure: Adventure): void;

}