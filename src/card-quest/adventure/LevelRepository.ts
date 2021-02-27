import {EnumHelpers} from "@/ig-template/tools/EnumHelpers";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {Level} from "@/card-quest/adventure/Level";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardId} from "@/card-quest/cards/CardId";
import {LevelRequirement} from "@/card-quest/LevelRequirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {StatisticId} from "@/ig-template/features/statistics/StatisticId";
import {App} from "@/App";
import {ArrayStatistic} from "@/ig-template/features/statistics/ArrayStatistic";

export class LevelRepository {
    public static getLevel(id: LevelId): Level {
        switch (id) {
            case LevelId.TutorialLevel:
                return new Level(LevelId.TutorialLevel, 'The Docks', 'A good place to start',
                    CardPackId.BeginnerPack,
                    50, [
                        [20, CardRepository.getCard(CardId.Chicken)],
                    ],
                    new NoRequirement(),
                );
            case LevelId.TheFarm:
                return new Level(LevelId.TheFarm, 'The farm', 'Watch out, the farmer has defense stats. You might need a stronger weapon!',
                    CardPackId.BronzeTierPack,
                    100, [
                        [15, CardRepository.getCard(CardId.Chicken)],
                        [20, CardRepository.getCard(CardId.Chicken)],
                        [25, CardRepository.getCard(CardId.Pig)],
                        [30, CardRepository.getCard(CardId.Cow)],
                        [40, CardRepository.getCard(CardId.Farmer)],
                    ],
                    new LevelRequirement(App.game.features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TutorialLevel, 1)
                );
            case LevelId.TheWizard:
                return new Level(LevelId.TheWizard, 'The Wizard', 'He will smite you down with his spells',
                    CardPackId.SilverTierPack,
                    200, [
                        [20, CardRepository.getCard(CardId.InstantDamageSmall)],
                        [25, CardRepository.getCard(CardId.InstantDamageSmall)],
                        [30, CardRepository.getCard(CardId.Skeleton)],
                        [35, CardRepository.getCard(CardId.InstantDamageMedium)],
                        [42, CardRepository.getCard(CardId.InstantDamageMedium)],
                        [50, CardRepository.getCard(CardId.InstantDamageLarge)],
                        [55, CardRepository.getCard(CardId.Skeleton)],
                    ],
                    new LevelRequirement(App.game.features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheFarm, 1)
                );
            case LevelId.TheTroll:
                return new Level(LevelId.TheTroll, 'The Troll', 'Prepare yourself for nonsense about to be thrown your way',
                    CardPackId.ActionCardPack,
                    300, [
                        [25, CardRepository.getCard(CardId.ForestFire)],
                        [28, CardRepository.getCard(CardId.LandMine)],
                        [32, CardRepository.getCard(CardId.InstantDamageMedium)],
                        [35, CardRepository.getCard(CardId.Skeleton)],
                        [45, CardRepository.getCard(CardId.DiscardHand)],
                        [50, CardRepository.getCard(CardId.BasicSword)],
                        [53, CardRepository.getCard(CardId.InstantDamageMedium)],
                        [60, CardRepository.getCard(CardId.Troll)],
                        [62, CardRepository.getCard(CardId.RodOfAsclepius)],
                        [70, CardRepository.getCard(CardId.InstantDamageLarge)],
                        [75, CardRepository.getCard(CardId.DiscardHand)],
                    ],
                    new LevelRequirement(App.game.features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheWizard, 1)
                );
            case LevelId.TheNecromancer:
                return new Level(LevelId.TheNecromancer, 'The Necromancer', 'Has the ability to raise enemies from the dead',
                    CardPackId.GoldTierPack,
                    600, [
                        [5, CardRepository.getCard(CardId.Skeleton)],
                        [10, CardRepository.getCard(CardId.LandMine)],
                        [15, CardRepository.getCard(CardId.SkeletonKing)],
                        [18, CardRepository.getCard(CardId.DiscardHand)],
                        [24, CardRepository.getCard(CardId.RodOfAsclepius)],
                        [31, CardRepository.getCard(CardId.SkeletonKing)],
                        [33, CardRepository.getCard(CardId.InstantDamageMedium)],
                    ],
                    new LevelRequirement(App.game.features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheTroll, 1)
                )
            default:
                throw new Error(`Level with id ${id} not found.`)
        }
    }

    public static getAllLevels(): Level[] {
        return this.getAllLevelsIds().map(id => {
            return this.getLevel(id);
        })
    }

    public static getLevelCount(): number {
        return this.getAllLevelsIds().length;
    }

    public static getAllLevelsIds(): LevelId[] {
        return EnumHelpers.getValues(LevelId);
    }
}