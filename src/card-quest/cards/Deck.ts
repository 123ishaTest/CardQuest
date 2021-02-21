import {PlayableCard} from "@/card-quest/cards/PlayableCard";
import {Random} from "@/ig-template/tools/probability/Random";

export class Deck {
    cards: PlayableCard[]

    constructor(cards: PlayableCard[] = []) {
        this.cards = cards;
    }

    public shuffle() {
        this.cards = Random.shuffle(this.cards);
    }

    public draw(): undefined | PlayableCard {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.cards.shift();
    }

    public isEmpty() {
        return this.cards.length === 0;
    }

    public fromDeckString(deckString: string): Deck {
        // TODO parse deck string
        return new Deck();
    }

    public toDeckString(): string {
        // TODO Implement
        return '';
    }

    public getSize(): number {
        return this.cards.length;
    }
}