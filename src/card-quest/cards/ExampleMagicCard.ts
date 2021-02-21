import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";
import {Adventure} from "@/card-quest/Adventure";

export class ExampleMagicCard extends PlayableCard {


    constructor() {
        super(CardId.CardMagicExample, 'Deal 1 damage to all resources', 'example.png');
    }

    defeated(): void {
        // Empty
    }

    play(adventure: Adventure): void {
        for (const card of adventure.field) {
            card.tap(adventure);
        }
    }


    canPlay(): boolean {
        return true;
    }

    tap(): void {
        // Empty
    }

}