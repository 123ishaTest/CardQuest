import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export class LoseTurnsCard extends ActionCard {
    amount: number;


    constructor(id: CardId, image: string, amount: number) {
        super(id, `-${amount} turns`, `Travel ${amount} turns back to the past`, CardType.Action, image);
        this.amount = amount;
    }

    play(adventure: Adventure): void {
        // Substract one more, so playing this card won't count as a turn.
        adventure.currentTurn = Math.max(0, adventure.currentTurn - (this.amount + 1));
    }

}