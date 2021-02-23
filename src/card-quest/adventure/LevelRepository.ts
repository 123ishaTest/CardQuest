import {EnumHelpers} from "@/ig-template/tools/EnumHelpers";
import {LevelId} from "@/card-quest/adventure/LevelId";
import {Level} from "@/card-quest/adventure/Level";
import {CardPackId} from "@/card-quest/features/card-collection/CardPackId";
import {CardRepository} from "@/card-quest/cards/CardRepository";
import {CardId} from "@/card-quest/cards/CardId";

export class LevelRepository {
    public static getLevel(id: LevelId): Level {
        switch (id) {
            case LevelId.FirstLevel:
                return new Level(LevelId.FirstLevel, 'First level', 'Not too difficult', CardPackId.BronzeToolPack, [
                    [15, CardRepository.getCard(CardId.EnemyCard)],
                    [30, CardRepository.getCard(CardId.EnemyCard)],
                ]);
            case LevelId.SecondLevel:
                return new Level(LevelId.SecondLevel, 'Second level', 'More enemies this time', CardPackId.BronzeToolPack, [
                    [20, CardRepository.getCard(CardId.EnemyCard)],
                    [25, CardRepository.getCard(CardId.EnemyCard)],
                    [30, CardRepository.getCard(CardId.EnemyCard)],
                    [35, CardRepository.getCard(CardId.EnemyCard)],
                    [40, CardRepository.getCard(CardId.EnemyCard)],
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