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


    constructor() {
        super('level-editor');
        this.currentCards = [];
        this.name = '';
        this.description = '';

        for (let i = 0; i < 10; i++) {
            this.currentCards.push([(i + 1) * 5, -1 as CardId]);
        }
    }

    getLevel(): Level | null {
        try {
            const cards = this.currentCards.filter(entry => {
                return entry[0] > 0 && entry[1] !== -1;
            }).map(entry => {
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