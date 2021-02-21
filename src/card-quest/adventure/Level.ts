import {PlayableCard} from "@/card-quest/cards/PlayableCard";

export class Level {
    cards: [number, PlayableCard][];


    constructor(cards: [number, PlayableCard][]) {
        this.cards = cards;
    }
}