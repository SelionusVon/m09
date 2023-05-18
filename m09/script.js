const trainers = {
  ash: {
    name: "Ash",
    age: 10,
    pokemon: [],
    friends: {
      childhood: ["Misty", "Brock"],
      current: ["Serena", "Clemont"],
    },
    talk() {
      console.log("Pikachu! I choose you!");
    },
  },
  brock: {
    name: "Brock",
    age: 15,
    pokemon: [],
    friends: {
      childhood: ["Ash", "Misty"],
      current: ["Tracey", "May"],
    },
    talk() {
      console.log("Onix, let's go!");
    },
  },
  misty: {
    name: "Misty",
    age: 10,
    pokemon: [],
    friends: {
      childhood: ["Ash", "Brock"],
      current: ["May", "Dawn"],
    },
    talk() {
      console.log("Starmie, go!");
    },
  },
};

function Pokemon(name, level) {
  this.name = name;
  this.level = level;
  this.startingHealth = level * 10;
  this.health = this.startingHealth;
  this.attack = level * 2;
  this.exp = 0;
}

const pikachu = new Pokemon("Pikachu", 1);
const onix = new Pokemon("Onix", 1);
const starmie = new Pokemon("Starmie", 1);

Pokemon.prototype.tackle = function (targetPokemon) {
  while (targetPokemon.health > 0) {
    console.log(`Enemy Pokémon - Name: ${targetPokemon.name}, Level: ${targetPokemon.level}, Health: ${targetPokemon.health}`);
    const input = prompt("Press any key to tackle.");
    targetPokemon.health -= this.attack;
    if (targetPokemon.health <= 0) {
      this.faint(targetPokemon);
      targetPokemon.health = targetPokemon.startingHealth; 
      this.exp += 10; 
      if (this.exp >= 100) {
        this.levelUp();
      }
      break;
    }
  }
};

Pokemon.prototype.faint = function (targetPokemon) {
  console.log(`${targetPokemon.name} has fainted.`);
};

Pokemon.prototype.levelUp = function () {
  this.level += 1;
  this.startingHealth = this.level * 10;
  this.health = this.startingHealth;
  this.attack = this.level * 5;
  this.exp = 0;
  console.log(`${this.name} leveled up to level ${this.level}!`);
};

function promptMenu() {
  const choice = prompt("Select an option: \n1. Select a trainer \n2. Select a Pokémon \n3. Fight a Pokémon \n4. Talk \n5. End the program");
  return parseInt(choice);
}

function promptTrainer() {
  const trainerChoice = prompt("Select a trainer: Ash, Brock, or Misty.");
  if (trainers.hasOwnProperty(trainerChoice.toLowerCase())) {
    return trainers[trainerChoice.toLowerCase()];
  } else {
    console.log("Invalid trainer choice.");
    return null;
  }
}

function promptPokemon() {
  const pokemonChoice = prompt("Select a Pokémon: Pikachu, Onix, or Starmie.");
  if (pokemonChoice.toLowerCase() === "pikachu") {
    return pikachu;
  } else if (pokemonChoice.toLowerCase() === "onix") {
    return onix;
  } else if (pokemonChoice.toLowerCase() === "starmie") {
    return starmie;
  } else {
    console.log("Invalid Pokémon choice.");
    return null;
  }
}

function displayInformation(trainer, pokemon) {
  if (trainer) {
    console.log(`Trainer: ${trainer.name} (${trainer.age} years old)`);
    console.log(`Friends: Childhood - ${trainer.friends.childhood.join(", ")}, Current - ${trainer.friends.current.join(", ")}`);
  }
  if (pokemon) {
    console.log(`Pokemon: ${pokemon.name} (Level: ${pokemon.level}, Health: ${pokemon.health}, Attack: ${pokemon.attack}, Exp: ${pokemon.exp})`);
  }
}

let isRunning = true;
let selectedTrainer = null;
let selectedPokemon = null;

while (isRunning) {
  const menuChoice = promptMenu();
  switch (menuChoice) {
    case 1:
      selectedTrainer = promptTrainer();
      if (!selectedTrainer) {
        console.log("Please choose a trainer.");
      }
      break;
    case 2:
      selectedPokemon = promptPokemon();
      if (!selectedPokemon) {
        console.log("Please choose a Pokémon.");
      }
      break;
    case 3:
      if (!selectedTrainer) {
        console.log("Please choose a trainer.");
        break;
      }
      if (!selectedPokemon) {
        console.log("Please choose a Pokémon.");
        break;
      }
      displayInformation(selectedTrainer, selectedPokemon);
      const enemyPokemon = promptPokemon();

      if (enemyPokemon) {
        selectedPokemon.tackle(enemyPokemon);
      }
      break;
    case 4:
      if (!selectedTrainer) {
        console.log("Please choose a trainer.");
        break;
      }
      selectedTrainer.talk();
      break;
    case 5:
      isRunning = false;
      break;

    default:
      console.log("Invalid choice. Please try again.");
      break;
  }
}
