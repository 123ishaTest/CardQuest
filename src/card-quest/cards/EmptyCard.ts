import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export class EmptyCard extends PlayableCard {


    constructor() {
        super(-1 as CardId, '', '', -1 as CardType, 'default.svg');
    }

    canPlay(): boolean {
        return false;
    }

    defeated(): void {
        // Empty
    }

    play(): void {
        // Empty
    }

    tap(): void {
        // Empty
    }

    turnHasPassed(): void {
        // Empty
    }

}