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
                "Hey isn't that the thing from the name?",
                'Play the Goblet of Fire card',
                new ArrayStatisticRequirement(features.statistics.getStatistic(StatisticId.CardsPlayed) as ArrayStatistic,
                    CardId.ChaliceMedium,
                    1
                )
            )
        )
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