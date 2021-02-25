import {EnemyCard} from "@/card-quest/cards/content/monster/EnemyCard";
import {CardId} from "@/card-quest/cards/CardId";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardRepository} from "@/card-quest/cards/CardRepository";

export class NecromancerCard extends EnemyCard {
    spawn: CardId;


    constructor(id: CardId, title: string, description: string, image: string, health: number, reward: number, defense: number, attackInterval: number, spawn: CardId) {
        super(id, title, description, image, health, reward, 0, defense, attackInterval);
        this.spawn = spawn;
    }

    protected performAttack(adventure: Adventure) {
        if (this.health <= 0) {
            return;
        }

        const cardToSpawn = CardRepository.getCard(this.spawn);
        adventure._play(cardToSpawn);
    }

}