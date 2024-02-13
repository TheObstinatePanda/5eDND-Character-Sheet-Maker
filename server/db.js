// Create an class/object for a sheet, it needs to have sub objects : Race, Class, Level, Stats, HP, Initiative, AC, Proficiency Bonus, Saves, Skills, Passives, Actions, Spells, Inventory, Features, Description, Notes, and Extras. When initialized each of these should be empty.

// Create a class/object for class rules - it needs to set the rules per level for the class including class hit dice, abilities, and features

// Create a class/object for race rules - it needs to set the rules for specific races including racial abilities, and features gained at specific levels

// Function to create new sheet, and return it as a new object. It should only require a name and race, and the rest of the fields should be empty. The race should pull 

// Create a function to add Class and level to a specific sheet by .name. The level will need to pull abilities from the class and add them to the sheet

// Create a function to add stats to a specific sheet by .name. The stats will affect the scores of HP, AC, Initiative, Saves, Skills, Passives, Attack Rolls, Damage Rolls, and Spell DC

// Create a function to calculate HP by class, level, and Con modifier (HP = (class hit dice + con modifier) * level)

// Create a function to se the proficiency bonus by level (Proficiency Bonus = 1 + (level / 4) rounded up). This proficiency bonus will be used in select saves, skills, and attack rolls. Sometimes it may be added to initiative as well.

// Create a function to calculate AC by stats (AC = 10 + Dex modifier + Armor Bonus + Shield Bonus + Other Bonuses)

// Create a function to calculate Initiative by stats (Initiative = Dex modifier + Proficiency Bonus(if applicable))

// Create a function to calculate Saves by stats and proficiency bonus (Save = Stat modifier + Proficiency Bonus(if applicable))

// Create a function to calculate Skills by stats and proficiency bonus (Skill = Stat modifier + Proficiency Bonus(if applicable)). Skill modifiers pull from the stats Str, Dex, Wis, Int, Str, and Cha. The skills are Acrobatics, Animal Handling, Arcana, Athletics, Deception, History, Insight, Intimidation, Investigation, Medicine, Nature, Perception, Performance, Persuasion, Religion, Sleight of Hand, Stealth, and Survival.

// Create a function to calculate Passives by stats (Passive = 10 + stat modifier)

// Create a function to add Actions to a specific sheet by .name. The actions will be added based off of equipped items, class and racial abilities, and prepared spells which require an attack roll. This should include the attack name, range (short and long range, when applicable), the attack modifier, the damage done by the action (including modifiers), and notes on the weapon or spell for relevant details.

// Create a function to add Spells to a specific sheet by .name. The top of the component should include the spell casting modifier, spell attack modifier, and spell save DC for any of the spells in the list. The spells will be added based off of class. It should include known and prepared spells in separate lists. Each spell require should have a name,  include the spell name, magic school, damage (may have to include conditional damage), casting time, range/area, components, duration, source, and description.

// Create a function to add Inventory to a specific sheet by .name. The inventory will pull from the inventoryList and should be searchable. Items should include the item name, the item type, the item weight, the item value, and notes on the item for relevant details. Magical items can effect things like spell save dc, stats, skills, proficiencies, actions, etc.

// Create a function to add Features to a specific sheet by .name. The features will pull from the class and race by character level. Features should include the source of the feature, feature name, a description of the feature, and a way to track charges or uses of the feature when necessary.

// Create a function to add Description to a specific sheet by .name. The description will be provided by the user and could include things like age, height, weight, eye color, hair color, distinguishing features, background, and alignment.

// Create a function to add Notes to a specific sheet by .name. The notes will be provided by the user and could include things like session notes, quest notes, and general notes.

class Sheet {
    constructor(name, race) {
      this.name = name;
      this.race = race;
      this.raceRules = null;
      this.class = {};
      this.classRules = null;
      this.level = 0;
      this.stats = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0
      };
      this.HP = 0;
      this.initiative = 0;
      this.AC = 0;
      this.proficiencyBonus = 0;
      this.saves = {};
      this.skills = {};
      this.passives = {};
      this.actions = [];
      this.spells = [];
      this.inventory = [];
      this.features = [];
      this.description = '';
      this.notes = '';
      this.extras = {};
    };

    // This method will be called whenever the characters level, race, or class is updated.
    updateRules(race, className) {
        if (!this.raceRules) {
            this.raceRules = new RaceRules(race);
        };
        if (!this.classRules[className]) {
            this.classRules[className] = new ClassRules(className);
        };
    };

    getCurrentRules() {
        const raceRules ={};
        const classRules = {};

        for (let i=0; i < this.level; i++) {
            raceRules[(`lvl${i}`)] = this.raceRules.levelRules[`lvl${i}`];
            classRules[(`lvl${i}`)] = this.classRules.levelRules[`lvl${i}`];
        }
    }
  }

  // Function to create level rules within class and race class constructors. This will initialize the class to include levels from 1 to 20.
  const generateLvlRules = () => {
    const lvlRules = {};
    for (let i = 1; i <= 20; i++) {
        lvlRules[`lvl${i}`] = {};
    }
    return lvlRules;
  }

  class ClassRules {
    constructor(className, hitDice) {
      this.className = className;
      this.hitDice = hitDice;
      this.levelRules = generateLvlRules(); 
    }
  }
  
  class RaceRules {
    constructor(raceName) {
      this.raceName = raceName;
      this.raceRules = generateLvlRules();
    }
  }
  
  // Function to create a new sheet
  function createNewSheet(name, race) {
    return new Sheet(name, race);
  }
  
  // Function to add class and level to a specific sheet
  function addClassAndLevel(sheet, className, level) {
    sheet.class = className;
    sheet.level = level;
    sheet.updateRules(sheet.race, className);
    sheet.proficiencyBonus = Math.ceil(sheet.level / 4) + 1;
  }
  
    // Function to add stats to a specific sheet
  function addStat(sheet, stat, num) {
    if (!num && num !== 0) {
        console.log('Please enter a number');
    } else {
        sheet[stat] = num;
    }
  }
  
    // Set the sheet HP = (class hit dice + con modifier) * level
  function calculateHP(sheet) {
    let hp = 0;
    for (let i = 0; i < sheet.level; i++) {
        hp += (Math.floor(Math.random()  * sheet.classRules.hitDice + 1) + sheet.stats.con);
    }
    sheet.HP = hp;
  }
  
  function calculateAC(sheet) {
    // AC = 10 + Dex modifier + Armor Bonus + Shield Bonus + Other Bonuses
  }
  
  function calculateInitiative(sheet) {
    // Initiative = Dex modifier + Proficiency Bonus(if applicable)
  }
  
  function calculateSaves(sheet) {
    // Save = Stat modifier + Proficiency Bonus(if applicable)
  }
  
  function calculateSkills(sheet) {
    // Skill = Stat modifier + Proficiency Bonus(if applicable)
  }
  
  function calculatePassives(sheet) {
    // Passive = 10 + stat modifier
  }
  
  function addActions(sheet, actions) {
    // Add actions to sheet
  }
  
  function addSpells(sheet, spells) {
    // Add spells to sheet
  }
  
  function addInventory(sheet, inventory) {
    // Add inventory to sheet
  }
  
  function addFeatures(sheet, features) {
    // Add features to sheet
  }
  
  function addDescription(sheet, description) {
    sheet.description = description;
  }
  
  function addNotes(sheet, notes) {
    sheet.notes = notes;
  }
