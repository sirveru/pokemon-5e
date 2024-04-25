export class Pokemon {
    name = "";
    pokedexEntry = 0;
    types = [];
    classification = "";
    sr = 0;
    minLevelFound = 0;
    eggGroups = [];
    genderRate = {
        male: "",
        female: ""
    }
    evolutionStage = "";
    ac = 0;
    hp = 0;
    hitDice = "";
    speed = {
        walking: 0,
        swimming: 0,
        flying: 0,
        climbing: 0,
        burrowing: 0,
    }
    stats = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    }
    proficientSkills = [];
    saveThrows = [];
    vulnerabilities = [];
    resistances = [];
    immunities = [];
    senses = [];
    abilities = [];
    hiddenAbility = "";
    evolution = "";
    moves = {
        starting: [],
        level: {},
        tm: [],
        egg: []
    }
    
    constructor(otherPokemon) {
        if (!otherPokemon) return;

        this.ac = otherPokemon.AC ? otherPokemon.AC : otherPokemon.ac;
        this.abilities = otherPokemon.Abilities ? [...otherPokemon.Abilities] : [...otherPokemon.abilities];
        this.hp = otherPokemon.HP ? otherPokemon.HP : otherPokemon.hp;
        this.hiddenAbility = otherPokemon["Hidden Ability"] ? otherPokemon["Hidden Ability"] : otherPokemon.hiddenAbility;
        this.hitDice = otherPokemon["Hit Dice"] ? otherPokemon["Hit Dice"] : otherPokemon.hitDice;
        this.minLevelFound = otherPokemon["MIN LVL FD"] ? otherPokemon["MIN LVL FD"] : otherPokemon.minLevelFound;
        this.moves = otherPokemon.Moves ? this._parseMoves(otherPokemon.Moves) : otherPokemon.moves;
        this.sr = otherPokemon.SR ? otherPokemon.SR : otherPokemon.sr;
        this.senses = otherPokemon.Senses ? [...otherPokemon.Senses] : (otherPokemon.senses ? [...otherPokemon.senses] : []);
        this.proficientSkills = otherPokemon.Skill ? [...otherPokemon.Skill] : [...otherPokemon.proficientSkills];
        this.types = otherPokemon.Type ? [...otherPokemon.Type] : [...otherPokemon.types];
        this.speed = otherPokemon.speed ? otherPokemon.speed : this._parseSpeed(otherPokemon);
        this.pokedexEntry = otherPokemon.index ? otherPokemon.index : otherPokemon.pokedexEntry;
        this.saveThrows = otherPokemon.saving_throws ? [...otherPokemon.saving_throws] : [...otherPokemon.saveThrows];
        this.classification = otherPokemon.size ? otherPokemon.size : otherPokemon.classification;
    }

    _parseMoves(otherMoves) {
        if (!otherMoves) return {};

        const moves = {};
        moves.starting = otherMoves["Starting Moves"] ? [...otherMoves["Starting Moves"]] : [];
        moves.tm = otherMoves.TM ? [...otherMoves.TM] : [];
        moves.egg = otherMoves.egg ? [...otherMoves.egg] : [];
        moves.level = { ...otherMoves.Level };
        return moves;
    }

    _parseSpeed(otherPokemon) {
        if (!otherPokemon) return {};

        const speed = {};
        speed.walking = otherPokemon.WSp ? otherPokemon.WSp : 0;
        speed.flying = otherPokemon.Fsp ? otherPokemon.Fsp : 0;
        speed.swimming = otherPokemon.Ssp ? otherPokemon.Ssp : 0;
        speed.burrowing = otherPokemon["Burrowing Speed"] ? otherPokemon["Burrowing Speed"] : 0;
        speed.climbing = otherPokemon["Climbing Speed"] ? otherPokemon["Climbing Speed"] : 0;
        return speed;
    }
}