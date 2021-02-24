import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export class HealingCard extends ActionCard {
    amount: number;


    constructor(id: CardId, title: string, description: string, image: string, amount: number) {
        super(id, title, description, CardType.Action, image);
        this.amount = amount;
    }

    play(adventure: Adventure): void {
        adventure.playerStats.health += this.amount;
    }

}