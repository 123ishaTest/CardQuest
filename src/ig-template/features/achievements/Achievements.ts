import {Achievement} from "@/ig-template/features/achievements/Achievement";
import {AchievementId} from "@/ig-template/features/achievements/AchievementId";
import {Feature} from "@/ig-template/features/Feature";
import {AchievementsSaveData} from "@/ig-template/features/achievements/AchievementSaveData";
import {Features} from "@/ig-template/Features";
import {ArrayStatisticRequirement} from "@/ig-template/features/statistics/requirements/ArrayStatisticRequirement";
import {StatisticId} from "@/ig-template/features/statistics/StatisticId";
import {CardId} from "@/card-quest/cards/CardId";
import {ArrayStatistic} from "@/ig-template/features/statistics/ArrayStatistic";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {CustomAchievement} from "@/ig-template/features/achievements/CustomAchievement";
import {NumberStatisticRequirement} from "@/ig-template/features/statistics/requirements/NumberStatisticRequirement";
import {NumberStatistic} from "@/ig-template/features/statistics/NumberStatistic";
import {LevelId} from "@/card-quest/adventure/LevelId";

export class Achievements extends Feature {
    name: string = "Achievements";
    saveKey: string = 'achievements';

    list: Record<AchievementId, Achievement>

    // Delay between checking for achievements
    private readonly ACHIEVEMENT_CHECK_TIME: number = 2.0;
    private checkCounter: number = 0;

    private _onUnlock = new SimpleEventDispatcher<Achievement>();

    /**
     * Emitted whenever an achievement is unlocked.
     */
    public get onUnlock(): ISimpleEvent<Achievement> {
        return this._onUnlock.asEvent();
    }

    constructor() {
        super('achievements');
        this.list = {} as Record<AchievementId, Achievement>;
    }

    initialize(features: Features): void {
        this.registerAchievement(
            new Achievement(AchievementId.PlayedGobletOfFire,
                "Dumbledore asked calmly",
                'Play the Goblet of Fire card',
                'cards/chalice-red.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.CardsPlayed) as ArrayStatistic,
                    CardId.ChaliceMedium,
                    1
                )
            )
        );
        this.registerAchievement(
            new Achievement(AchievementId.EnemyPlayedForestFire,
                "Boy or Girl?",
                'Have your wood resources burned down',
                'cards/forest-fire.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.CardsPlayedByLevel) as ArrayStatistic,
                    CardId.ForestFire,
                    1
                )
            )
        );
        this.registerAchievement(
            new CustomAchievement(AchievementId.AtLeastOneSuperPower,
                "I wonder what inspired this feature",
                'Go on an Adventure with at least one bonus',
                'cards/hatchet-bronze.svg',
            )
        );
        this.registerAchievement(
            new Achievement(AchievementId.TotalMoney100,
                "It's something",
                'Gain 100 money in total',
                'coins.svg',
                new NumberStatisticRequirement(features.statistics.getStatistic(StatisticId.TotalMoneyGained) as NumberStatistic, 100),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.TotalMoney1000,
                "It's a bit more",
                'Gain 1000 money in total',
                'coins.svg',
                new NumberStatisticRequirement(features.statistics.getStatistic(StatisticId.TotalMoneyGained) as NumberStatistic, 1000),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.FirstLevelCompleted,
                "Nobody — calls me — chicken.",
                'Complete the first level',
                'cards/chicken.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TutorialLevel, 1),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.FarmLevelCompleted,
                "Won't somebody think of the animals?",
                'Complete the The Farm level',
                'cards/farmer.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheFarm, 1),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.SpiderLevelCompleted,
                "Poor Aragog",
                'Complete the The Spiders Den',
                'cards/spider-large.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.SpidersDen, 1),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.FarmLevelCompleted,
                "And it wasn't even in the dungeon...",
                'Complete the The Troll level',
                'cards/troll.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheTroll, 1),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.WizardLevelCompleted,
                "No thanks I'm stuffed",
                'Complete the The Wizard level',
                'cards/bread.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheWizard, 1),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.DragonLevelCompleted,
                "She wasn't a big negotiator",
                'Complete the Dragons Den',
                'cards/dragon.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheDragon, 1),
            ),
        );
        this.registerAchievement(
            new Achievement(AchievementId.NecromancerLevelCompleted,
                "Ah so it is possible",
                'Complete the The Necromancer level',
                'cards/skeleton-king.svg',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.LevelsCompleted) as ArrayStatistic, LevelId.TheNecromancer, 1),
            ),
        );


        this.registerAdventureSubscribers(features);
    }


    registerAdventureSubscribers(features: Features) {
        features.adventure.onStart.subscribe(() => {
            if (features.superPowers.getTotalCosts() > 0) {
                const achievement = this.getAchievement(AchievementId.AtLeastOneSuperPower);
                (achievement as CustomAchievement).forceComplete();
            }
        })
    }

    update(delta: number) {
        this.checkCounter += delta;
        if (this.checkCounter >= this.ACHIEVEMENT_CHECK_TIME) {
            this.checkForAchievementsCompleted();
            this.checkCounter = 0;
        }
    }

    public checkForAchievementsCompleted() {
        for (const key in this.list) {
            const achievement = this.list[key as AchievementId];
            if (achievement.requirementsCompleted()) {
                const isJustUnlocked = achievement.unlock();
                if (isJustUnlocked) {
                    this._onUnlock.dispatch(achievement);
                }
            }
        }
    }

    private registerAchievement(achievement: Achievement) {
        this.list[achievement.key] = achievement;
    }

    public getAchievement(key: AchievementId): Achievement | null {
        if (!this.hasAchievement(key)) {
            console.warn(`Could not find achievement with key ${key}`)

            return null;
        } else {
            return this.list[key];
        }
    }

    private hasAchievement(key: AchievementId): boolean {
        return key in this.list
    }


    load(data: AchievementsSaveData): void {
        for (const key of data.list) {
            const achievement = this.getAchievement(key);
            if (achievement !== null) {
                achievement.unlocked = true
            }
        }
    }


    save(): AchievementsSaveData {
        const data = new AchievementsSaveData();
        for (const key in this.list) {
            if (this.list[key as AchievementId].unlocked) {
                data.addAchievement(key as AchievementId);
            }
        }
        return data;
    }

}