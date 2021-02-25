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
                return new Level(LevelId.TheFarm, 'The farm', 'The scariest thing here is the smell', CardPackId.BronzeToolPack,
                    100, [
                    [15, CardRepository.getCard(CardId.Chicken)],
                    [22, CardRepository.getCard(CardId.Pig)],
                    [30, CardRepository.getCard(CardId.Cow)],
                ]);
            case LevelId.TheWizard:
                return new Level(LevelId.TheWizard, 'The wizard', 'He will smite you down with his spells', CardPackId.VarietyPack,
                    200,[
                    [10, CardRepository.getCard(CardId.InstantDamageSmall)],
                    [15, CardRepository.getCard(CardId.InstantDamageSmall)],
                    [20, CardRepository.getCard(CardId.InstantDamageSmall)],
                    [25, CardRepository.getCard(CardId.InstantDamageMedium)],
                    [32, CardRepository.getCard(CardId.InstantDamageMedium)],
                    [40, CardRepository.getCard(CardId.InstantDamageMedium)],
                    [45, CardRepository.getCard(CardId.Chicken)],
                ])
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