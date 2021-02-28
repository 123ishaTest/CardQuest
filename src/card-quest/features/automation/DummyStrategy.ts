import {AutomationStrategy} from "@/card-quest/features/automation/AutomationStrategy";
import {Adventure} from "@/card-quest/adventure/Adventure";
import {Random} from "@/ig-template/tools/probability/Random";
import {CardType} from "@/card-quest/cards/CardType";
import {AutomationStrategyId} from "@/card-quest/features/automation/AutomationStrategyId";

export class DummyStrategy extends AutomationStrategy {

    constructor() {
        super(AutomationStrategyId.Dummy, 'Dummy Strategy', 'A basic algorithm I coded up, it tries its best.\n' +
            'It Taps monsters if they exist, and draws when its hand is empty\n' +
            'You can view the code <a class="text-blue-500" target="_blank" href="https://github.com/123ishaTest/CardQuest/blob/master/src/card-quest/features/automation/DummyStrategy.ts"/>Here!</a>', 0);
    }

    performAction(adventure: Adventure): void {
        this.currentTurn++;

        // Check if there is a card we can play
        let canPlay = false;
        for (let i = 0; i < adventure.playerHand.length; i++) {
            if (adventure.playerHand[i].canPlay(adventure) && adventure.playerHand[i].canAfford(adventure.wallet)) {
                canPlay = true;
            }
        }

        // We can tap if the field isn't empty
        const canTap = !!adventure.field[0];

        // Draw if few cards, or can't (tap or play)
        if ((!canPlay && !canTap) || (adventure.handSpace > 4 && Random.booleanWithProbability(0.5))) {
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
        for (let i = 0; i < adventure.playerHand.length; i++) {
            if (adventure.playerHand[i].canPlay(adventure) && adventure.playerHand[i].canAfford(adventure.wallet)) {
                adventure.play(i);
                return;
            }
        }

        // Otherwise tap first
        adventure.tap(0);
        return;


    }

}