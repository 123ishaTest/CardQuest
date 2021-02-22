import {HealthCard} from "@/card-quest/cards/abstract/HealthCard";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CurrencyType} from "@/ig-template/features/wallet/CurrencyType";
import {Currency} from "@/ig-template/features/wallet/Currency";
import {CardId} from "@/card-quest/cards/CardId";

export class EnemyCard extends HealthCard {
    reward: number

    attack: number;
    defense: number;

    attackInterval: number;
    nextAttack: number;


    constructor(id: CardId, title: string, description: string, image: string, health: number, reward: number, attack: number, defense: number, attackInterval: number) {
        super(id, title, description, image, health);
        this.reward = reward;
        this.attack = attack;
        this.defense = defense;
        this.attackInterval = attackInterval;
        this.nextAttack = attackInterval;
        this.goesToField = true;
    }

    canPlay(): boolean {
        return true;
    }

    defeated(adventure: Adventure): void {
        adventure.wallet.gainCurrency(new Currency(this.reward, CurrencyType.Souls))
    }

    play(): void {
        // Empty
    }

    tap(adventure: Adventure): void {
        const attack = adventure.playerStats.getAttack();
        const damage = attack - this.defense;
        this.takeDamage(damage);

    }

    turnHasPassed(adventure: Adventure): void {
        this.nextAttack--;
        if (this.nextAttack <= 0) {
            this.performAttack(adventure);
            this.nextAttack = this.attackInterval;
        }
    }

    private performAttack(adventure: Adventure) {
        adventure.playerStats.attackFor(this.attack);
    }
}