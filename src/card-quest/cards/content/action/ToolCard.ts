import {Adventure} from "@/card-quest/adventure/Adventure";
import {ToolTier} from "@/card-quest/adventure/tools/ToolTier";
import {CardId} from "@/card-quest/cards/CardId";
import {ActionCard} from "@/card-quest/cards/abstract/ActionCard";
import {ToolType} from "@/card-quest/adventure/tools/ToolType";

export class ToolCard extends ActionCard {
    type: ToolType;
    tier: ToolTier;


    constructor(id: CardId, title: string, description: string, image: string, type: ToolType, tier: ToolTier) {
        super(id, title, description, image);
        this.type = type;
        this.tier = tier;
    }

    play(adventure: Adventure): void {
        switch (this.type) {
            case ToolType.Axe:
                adventure.playerStats.activeAxe = Math.max(adventure.playerStats.activeAxe, this.tier);
                break;
            case ToolType.Pickaxe:
                adventure.playerStats.activePickaxe = Math.max(adventure.playerStats.activePickaxe, this.tier);
                break;
            case ToolType.Scythe:
                adventure.playerStats.activeScythe = Math.max(adventure.playerStats.activeScythe, this.tier);
                break;
        }
    }

}