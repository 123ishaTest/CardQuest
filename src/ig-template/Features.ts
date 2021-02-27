import {Wallet} from "@/ig-template/features/wallet/Wallet";
import {Settings} from "@/ig-template/features/settings/Settings";
import {Statistics} from "@/ig-template/features/statistics/Statistics";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {CardCollection} from "@/card-quest/features/card-collection/CardCollection";
import {SuperPowers} from "@/card-quest/adventure/super-powers/SuperPowers";
import {Achievements} from "@/ig-template/features/achievements/Achievements";
import {Automation} from "@/card-quest/features/automation/Automation";

export interface Features {
    wallet: Wallet;
    settings: Settings;
    statistics: Statistics;
    adventure: Adventure;
    automation: Automation;
    collection: CardCollection;
    superPowers: SuperPowers;
    achievements: Achievements;
}
