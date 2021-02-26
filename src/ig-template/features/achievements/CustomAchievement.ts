import {Achievement} from "@/ig-template/features/achievements/Achievement";
import {ManualRequirement} from "@/ig-template/tools/requirements/ManualRequirement";
import {AchievementId} from "@/ig-template/features/achievements/AchievementId";

export class CustomAchievement extends Achievement {

    constructor(key: AchievementId, title: string, description: string, image: string) {
        super(key, title, description, image, new ManualRequirement());
    }

    forceComplete() {
        (this.requirement as ManualRequirement).forceCompletion();
    }
}