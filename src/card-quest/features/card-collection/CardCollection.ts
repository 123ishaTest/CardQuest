import {Feature} from "@/ig-template/features/Feature";
import {CardCollectionSaveData} from "@/card-quest/features/card-collection/CardCollectionSaveData";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardId} from "@/card-quest/cards/CardId";

export class CardCollection extends Feature {
    cards: Map<CardId, number> = new Map<CardId, number>();


    constructor() {
        super('card-collection');
        const ids = CardRepository.getAllCardsIds();

        for (const id of ids) {
            this.cards.set(id, 0);
        }
    }


    initialize() {
        // Empty
    }

    load(data: CardCollectionSaveData): void {
        const cards = data.cards;
        for (const card of cards) {
            this.cards.set(card.id, card.amount);
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