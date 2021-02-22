import {Feature} from "@/ig-template/features/Feature";
import {CardCollectionSaveData} from "@/card-quest/features/card-collection/CardCollectionSaveData";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardId} from "@/card-quest/cards/CardId";
import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";

export class CardCollection extends Feature {
    cards: number[] = [];


    constructor() {
        super('card-collection');
        const ids = CardRepository.getAllCardsIds();

        for (let i = 0; i < ids.length; i++) {
            this.cards.push(0);
        }
    }

    gainCard(id: CardId, amount: number = 1) {
        const current = this.cards[id];
        if (current === undefined) {
            console.warn(`Card with id ${id} does not exist`);
            return;
        }
        const newAmount = this.cards[id] + amount
        this.cards.splice(id, 1, newAmount)
    }

    getCardsWithAmount(): [PlayableCard, number][] {
        return this.cards.map((amount, id) => {
            return [CardRepository.getCard(id as CardId), amount];
        });
    }

    initialize() {
        // Empty
    }

    load(data: CardCollectionSaveData): void {
        const cards = data.cards;
        for (const card of cards) {
            this.cards[card.id] = card.amount;
        }
    }

    save(): CardCollectionSaveData {
        const cards: {
            'id': CardId;
            'amount': number;
        }[] = [];

        this.cards.forEach((amount, id) => {
            cards.push({
                'id': id,
                'amount': amount
            });
        })
        return {
            'cards': cards,
        }
    }

}