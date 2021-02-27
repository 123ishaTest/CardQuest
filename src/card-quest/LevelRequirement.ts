import {ArrayStatisticRequirement} from "@/ig-template/features/statistics/requirements/ArrayStatisticRequirement";
import {ArrayStatistic} from "@/ig-template/features/statistics/ArrayStatistic";
import {LevelId} from "@/card-quest/adventure/LevelId";

export class LevelRequirement extends ArrayStatisticRequirement {

    constructor(statistic: ArrayStatistic, index: LevelId, targetValue: number) {
        super(statistic, index, targetValue);
    }

    get hint(): string {
        return `Complete level ${this.index} ${this.targetValue} times`;
    }
}