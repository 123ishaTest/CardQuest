import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardId} from "@/card-quest/cards/CardId";

export class DrawCardsCard extends ActionCard {
    amount: number;


    constructor(id: CardId, image: string, amount: number) {
        super(id, `Draw ${amount} cards`, `Draw ${amount} cards in a single turn`, image);
        this.amount = amount;
    }

    play(adventure: Adventure): void {
        for (let i = 0; i < this.amount; i++) {
            adventure.draw(true);
        }
    }

}