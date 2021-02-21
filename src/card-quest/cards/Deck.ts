import {PlayableCard} from "@/card-quest/cards/PlayableCard";

export class Deck {
    cards: PlayableCard[]

    constructor(cards: PlayableCard[] = []) {
        this.cards = cards;
    }

    public fromDeckString(deckString: string): Deck {
        // TODO parse deck string
        return new Deck();
    }

    public toDeckString(): string {
        // TODO Implement
        return '';
    }
}