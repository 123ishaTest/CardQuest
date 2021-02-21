import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";

export class ExampleCard extends PlayableCard {


    constructor() {
        super(CardId.CardExample, 'Example Card', 'example.png');
    }

    defeated(): void {
        // Empty
    }

    play(): void {
        // Empty
        console.log("I've been played");
    }


    canPlay(): boolean {
        return true;
    }

    tap(): void {
        // Empty
        console.log("I've been tapped");

    }

}