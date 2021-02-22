import {CardId} from "@/card-quest/cards/CardId";
import {HealthCard} from "@/card-quest/cards/abstract/HealthCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Currency} from "@/ig-template/features/wallet/Currency";

export class WoodCard extends HealthCard {
    reward: number;

    constructor(reward: number) {
        super(CardId.WoodCard, 'Forest', `Get ${reward} wood when cut down`, 'wood.png', 3);
        this.reward = reward;
    }

    defeated(adventure: Adventure): void {
        adventure.wallet.gainCurrency(new Currency(this.reward, CurrencyType.Wood));
    }


    canPlay(): boolean {
        return true;
    }

    play(): void {
        // Empty
    }

    tap(adventure: Adventure): void {
        this.takeDamage(adventure.playerStats.getWoodCuttingDamage());
    }

    turnHasPassed(): void {
        // Empty
    }

}