import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";
import {Adventure} from "@/card-quest/adventure/Adventure";

export class ExampleMagicCard extends PlayableCard {


    constructor() {
        super(CardId.CardMagicExample, 'title', 'Deal 1 damage to all resources', 'example.png');
    }

    defeated(): void {
        // Empty
    }

    play(adventure: Adventure): void {
        for (const card of adventure.field) {
            card.tap(adventure);
        }
    }

    turnHasPassed(): void {
        // Empty
    }

    canPlay(): boolean {
        return true;
    }

    tap(): void {
        // Empty
    }

}