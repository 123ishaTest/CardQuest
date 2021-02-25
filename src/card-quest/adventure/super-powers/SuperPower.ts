export class SuperPower {
    description: string;

    costs: number[];
    level: number;
    bonuses: number[]
    descriptions: string[]


    constructor(description: string, costs: number[], bonuses: number[], descriptions: string[]) {
        this.costs = costs;
        this.description = description;
        this.level = 0;
        this.bonuses = bonuses;
        this.descriptions = descriptions;
    }

    get maxLevel() {
        return this.costs.length - 1;
    }

    get value() {
        return this.bonuses[this.level];
    }

    get valueText() {
        return this.descriptions[this.level];
    }

    get cost() {
        return this.costs[this.level];
    }
}