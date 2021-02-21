import {CardId} from "@/card-quest/cards/CardId";
import {HealthCard} from "@/card-quest/cards/HealthCard";
import {Adventure} from "@/card-quest/Adventure";

export class WoodCard extends HealthCard {
    reward: number;

    constructor(reward: number) {
        super(CardId.WoodCard, 'Wood card', 'wood.png', 10);
        this.reward = reward;
    }

    defeated(adventure: Adventure): void {
        adventure.resources.wood += this.reward;
    }

    play(adventure: Adventure): void {
        // Empty
    }

    tap(adventure: Adventure): void {
        // TODO take tools into accoutn
        this.health--;
    }

}