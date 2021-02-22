import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardId} from "@/card-quest/cards/CardId";

export abstract class HealthCard extends PlayableCard {
    health: number;

    protected constructor(id: CardId, title: string, description: string, image: string, health: number) {
        super(id, title, description, image);
        this.health = health;
        this.goesToField = true;
    }

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.dispatchDefeat();
        }
    }

}