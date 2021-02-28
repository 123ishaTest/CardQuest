import {CardId} from "@/card-quest/cards/CardId";
import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Level} from "@/card-quest/adventure/Level";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {PlayableCard} from "@/card-quest/cards/abstract/PlayableCard";

export class LevelEditor extends Feature {
    name: string;
    description: string;

    currentCards: [number, CardId][];

    private readonly MAX_SIZE = 10;

    constructor() {
        super('level-editor');
        this.currentCards = [];
        this.name = '';
        this.description = '';

        this.currentCards = [];
        this.resetToDefault()
    }

    resetToDefault() {
        this.currentCards = [];
        for (let i = 0; i < this.MAX_SIZE; i++) {
            this.currentCards.push([0, -1 as CardId]);
        }
    }

    toLevelString(): string {
        return this.getCleanLevel().map(entry => {
            return `${entry[0]}:${entry[1]}`;
        }).join(".");
    }

    fromLevelString(levelString: string) {
        const split = levelString.split(".");
        const cards = split.map(entry => {
            const test = entry.split(":");
            const turn = parseInt(test[0]) || 0;
            const card = parseInt(test[1]) || 0;
            return [turn, card]
        })

        for (let i = 0; i < this.MAX_SIZE; i++) {
            if(cards[i]) {
                this.currentCards.splice(i, 1, [cards[i][0], cards[i][1]]);
            }
        }

    }

    getCleanLevel() {
        return this.currentCards.filter(entry => {
            return entry[0] > 0 && entry[1] !== -1;
        }).sort(function (a, b) {
            return a[0] - b[0];
        })
    }

    getLevel(): Level | null {
        try {
            const cards = this.getCleanLevel().map(entry => {
                return [entry[0], CardRepository.getCard(entry[1])] as [number, PlayableCard];
            })
            return new Level(
                -1 as LevelId,
                this.name,
                this.description,
                CardPackId.BeginnerPack,
                0,
                cards,
                new NoRequirement(),
            )
        } catch (e) {
            return null
        }
    }


    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};

    }
}