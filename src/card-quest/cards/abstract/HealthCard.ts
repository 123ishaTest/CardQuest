import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export abstract class HealthCard extends PlayableCard {
    health: number;

    protected constructor(id: CardId, title: string, description: string, cardType: CardType, image: string, health: number) {
        super(id, title, description, cardType, image);
        this.health = health;
        this.goesToField = true;
    }

    takeDamage(amount: number) {
        amount = Math.max(0, amount);
        this.health -= amount;
        if (this.health <= 0) {
            this.dispatchDefeat();
        }
    }

}