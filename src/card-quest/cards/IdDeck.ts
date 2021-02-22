import {CardId} from "@/card-quest/cards/CardId";
import {CardRepository} from "@/card-quest/cards/CardRepository";

export class IdDeck {
    cards: number[] = [];

    constructor() {
        const ids = CardRepository.getAllCardsIds();

        for (let i = 0; i < ids.length; i++) {
            this.cards.push(0);
        }

    }

    public addCard(id: CardId) {
        const newAmount = this.cards[id] + 1;
        this.cards.splice(id, 1, newAmount)
    }

    public removeCard(id: CardId) {
        const newAmount = Math.max(0, this.cards[id] - 1);
        this.cards.splice(id, 1, newAmount)

    }

    public getCountForCard(id: CardId): number {
        return this.cards[id];
    }

    public isEmpty() {
        return this.cards.length === 0;
    }

    public toDeckString(): string {
        return '';
    }

    public getSize(): number {
        return this.cards.length;
    }
}