import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {Random} from "@/ig-template/tools/probability/Random";

export class Level {
    id: LevelId;
    name: string;
    description: string;
    rewardPack: CardPackId;
    rewardCount: number
    moneyReward: number;
    cards: [number, PlayableCard][];

    requirement: Requirement
    shuffleDeck: boolean;

    constructor(id: LevelId, name: string, description: string, rewardPack: CardPackId, moneyReward: number, cards: [number, PlayableCard][], requirement: Requirement, rewardCount: number = 3, shuffleDeck: boolean = true) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rewardPack = rewardPack;
        this.rewardCount = rewardCount;
        this.moneyReward = moneyReward;
        this.cards = cards;
        this.requirement = requirement;
        this.shuffleDeck = shuffleDeck;
    }

    getMoneyReward() {
        return Random.floatBetween(0.8, 1.2) * this.moneyReward;
    }

    getCardsLeftCount() {
        return this.cards.length;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted;
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