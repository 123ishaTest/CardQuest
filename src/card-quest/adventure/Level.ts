import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {LevelId} from "@/card-quest/adventure/LevelId";

export class Level {
    id: LevelId;
    name: string;
    description: string;
    rewardPack: CardPackId;
    moneyReward: number;
    cards: [number, PlayableCard][];


    constructor(id: LevelId, name: string, description: string, rewardPack: CardPackId, moneyReward: number, cards: [number, PlayableCard][]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rewardPack = rewardPack;
        this.moneyReward = moneyReward;
        this.cards = cards;
    }

    getCardsLeftCount() {
        return this.cards.length;
    }

    getFutureCards(turn: number): [number, PlayableCard][] {
        return this.cards.filter(card => {
            return card[0] > turn;
        })
    }

    getNextCard(turn: number): PlayableCard {
        return this.getFutureCards(turn)[0][1];
    }

    getCardAtTurn(level: number): PlayableCard | undefined {
        const card = this.cards.find(card => {
            return card[0] === level;
        })
        if (!card) {
            return undefined
        }
        const index = this.cards.indexOf(card);
        this.cards.splice(index, 1);
        return card[1];
    }
}