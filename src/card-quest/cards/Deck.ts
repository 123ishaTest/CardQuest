import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {Random} from "@/ig-template/tools/probability/Random";

export class Deck {
    cards: PlayableCard[]

    constructor(cards: PlayableCard[] = []) {
        this.cards = cards;
        this.shuffle();
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

    public toDeckString(): string {
        return this.cards.join('.');
    }

    public getSize(): number {
        return this.cards.length;
    }
}