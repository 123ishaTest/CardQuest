import {HealthCard} from "@/card-quest/cards/abstract/HealthCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {CardId} from "@/card-quest/cards/CardId";
import {CardType} from "@/card-quest/cards/CardType";

export class OreCard extends HealthCard {
    reward: Currency;


    constructor(id: CardId, title: string, description: string, image: string, health: number, reward: Currency) {
        super(id, title, description, CardType.Resource, image, health);
        this.reward = reward;
    }

    defeated(adventure: Adventure): void {
        adventure.wallet.gainCurrency(this.reward);
    }


    canPlay(): boolean {
        return true;
    }

    play(): void {
        // Empty
    }

    tap(adventure: Adventure): void {
        this.takeDamage(adventure.playerStats.getMiningDamage());
    }

    turnHasPassed(): void {
        // Empty
    }

}