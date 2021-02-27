import {EnemyCard} from "@/card-quest/cards/content/monster/EnemyCard";
import {CardId} from "@/card-quest/cards/CardId";
import {Adventure} from "@/card-quest/adventure/Adventure";

export class LandMineCard extends EnemyCard {

    constructor(id: CardId, title: string, image: string, reward: number, countDown: number) {
        super(id, title, `Explodes when tapped. Self-destructs.`, image, Infinity, reward, 10, 0, countDown);
    }


    tap(adventure: Adventure): void {
        this.performAttack(adventure);
        this.health = 0;
        this.takeDamage(Infinity);

    }

    turnHasPassed(): void {
        this.nextAttack--;
        if (this.nextAttack <= 0) {
            this.health = 0;
            this.takeDamage(Infinity)
        }
    }

}