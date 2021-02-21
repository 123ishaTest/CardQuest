import {CardId} from "@/card-quest/cards/CardId";
import {HealthCard} from "@/card-quest/cards/HealthCard";
import {Adventure} from "@/card-quest/Adventure";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Currency} from "@/ig-template/features/wallet/Currency";

export class WoodCard extends HealthCard {
    reward: number;

    constructor(reward: number) {
        super(CardId.WoodCard, 'Wood card', 'wood.png', 3);
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

    tap(): void {
        // TODO take tools into account;
        this.takeDamage(1);
    }

}