import {EnumHelpers} from "@/ig-template/tools/EnumHelpers";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {Level} from "@/card-quest/adventure/Level";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardId} from "@/card-quest/cards/CardId";

export class LevelRepository {
    public static getLevel(id: LevelId): Level {
        switch (id) {
            case LevelId.TheFarm:
                return new Level(LevelId.TheFarm, 'The farm', 'Not too difficult', CardPackId.BronzeToolPack, [
                    [10, CardRepository.getCard(CardId.Chicken)],
                    [15, CardRepository.getCard(CardId.Chicken)],
                    [20, CardRepository.getCard(CardId.Pig)],
                    [25, CardRepository.getCard(CardId.Pig)],
                    [30, CardRepository.getCard(CardId.Cow)],
                    [35, CardRepository.getCard(CardId.Cow)],
                ]);

            default:
                throw new Error(`Level with id ${id} not found.`)
        }
    }

    public static getAllLevels(): Level[] {
        return this.getAllLevelsIds().map(id => {
            return this.getLevel(id);
        })
    }

    public static getAllLevelsIds(): LevelId[] {
        return EnumHelpers.getValues(LevelId);
    }
}