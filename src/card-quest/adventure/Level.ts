import {PlayableCard} from "@/card-quest/cards/PlayableCard";

export class Level {
    cards: [number, PlayableCard][];


    constructor(cards: [number, PlayableCard][]) {
        this.cards = cards;
    }

    getFutureCards(level: number): [number, PlayableCard][] {
        return this.cards.filter(card => {
            return card[0] > level;
        })
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