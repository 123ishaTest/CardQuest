import {EnumHelpers} from "@/ig-template/tools/EnumHelpers";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {Level} from "@/card-quest/adventure/Level";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardId} from "@/card-quest/cards/CardId";

export class LevelRepository {
    public static getLevel(id: LevelId): Level {
        switch (id) {
            case LevelId.TutorialLevel:
                return new Level(LevelId.TutorialLevel, 'The Docks', 'A good place to start',
                    CardPackId.BronzeToolPack, 3,
                    50, [
                        [20, CardRepository.getCard(CardId.Chicken)],
                    ]);
            case LevelId.TheFarm:
                return new Level(LevelId.TheFarm, 'The farm', 'The scariest thing here is the smell',
                    CardPackId.BronzeToolPack, 2,
                    100, [
                        [15, CardRepository.getCard(CardId.Chicken)],
                        [20, CardRepository.getCard(CardId.Chicken)],
                        [25, CardRepository.getCard(CardId.Pig)],
                        [30, CardRepository.getCard(CardId.Cow)],
                        [40, CardRepository.getCard(CardId.Farmer)],
                    ]);
            case LevelId.TheWizard:
                return new Level(LevelId.TheWizard, 'The Wizard', 'He will smite you down with his spells',
                    CardPackId.VarietyPack, 3,
                    200, [
                        [10, CardRepository.getCard(CardId.InstantDamageSmall)],
                        [15, CardRepository.getCard(CardId.InstantDamageSmall)],
                        [20, CardRepository.getCard(CardId.ForestFire)],
                        [25, CardRepository.getCard(CardId.InstantDamageMedium)],
                        [32, CardRepository.getCard(CardId.InstantDamageMedium)],
                        [40, CardRepository.getCard(CardId.InstantDamageMedium)],
                        [45, CardRepository.getCard(CardId.Chicken)],
                    ]
                )
                    ;
            case LevelId.TheNecromancer:
                return new Level(LevelId.TheNecromancer, 'The Necromancer', 'Has the ability to raise enemies from the dead',
                    CardPackId.VarietyPack, 3,
                    400, [
                        [5, CardRepository.getCard(CardId.Skeleton)],
                        [10, CardRepository.getCard(CardId.LandMine)],
                        [15, CardRepository.getCard(CardId.SkeletonKing)],
                        [18, CardRepository.getCard(CardId.DiscardHand)],
                        [24, CardRepository.getCard(CardId.RodOfAsclepius)],
                        [31, CardRepository.getCard(CardId.SkeletonKing)],
                        [33, CardRepository.getCard(CardId.InstantDamageMedium)],
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