import {AutomationStrategy} from "@/card-quest/features/automation/AutomationStrategy";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Random} from "@/ig-template/tools/probability/Random";
import {CardType} from "@/card-quest/cards/CardType";

export class DummyStrategy extends AutomationStrategy {

    constructor() {
        super();
    }

    performAction(adventure: Adventure): void {
        this.currentTurn++;

        let canPlay = false;
        for (let i = 0; i < adventure.playerHand.length; i++) {
            if (adventure.playerHand[i].canPlay(adventure) && adventure.playerHand[i].canAfford(adventure.wallet)) {
                canPlay = true;
            }
        }

        const canTap = !!adventure.field[0];


        // Draw if few cards
        if ((!canPlay && !canTap )|| (adventure.handSpace > 4 && Random.booleanWithProbability(0.5))) {
            // Wait if the deck is empty
            if (adventure.playerDeck.isEmpty()) {
                adventure.wait();
                return;
            }
            adventure.draw();
            return;
        }

        // Tap first monster if it exists
        for (let i = 0; i < adventure.field.length; i++) {
            if (adventure.field[i].cardType === CardType.Monster) {
                adventure.tap(i);
                return;
            }
        }

        // Play a card
        const playing = Random.booleanWithProbability(0.5) || !canTap;
        if (playing) {
            for (let i = 0; i < adventure.playerHand.length; i++) {
                if (adventure.playerHand[i].canPlay(adventure) && adventure.playerHand[i].canAfford(adventure.wallet)) {
                    adventure.play(i);
                    return;
                }
            }
        }

        // Otherwise tap first
        adventure.tap(0);
        return;


    }

}