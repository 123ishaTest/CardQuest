import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";

export abstract class HealthCard extends PlayableCard {
    health: number;

    protected constructor(id: CardId, description: string, image: string, health: number) {
        super(id, description, image);
        this.health = health;
    }

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health === 0) {
            this.dispatchDefeat();
        }
    }

}