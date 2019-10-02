  
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat

let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
	bestPhrase = createP("Best Phrase:");
	bestPhrase.class("best");

	allPhrases = createP("All Phrases:");
	allPhrases.position(600, 10);
	allPhrases.class("all");

	stats = createP("Stats");
	stats.class("stats");

	target = "To be or not to be.";
	popmax = 500;
	mutationRate = 0.01;

	// create a population with a target phrase, mutation rate, and population max
	population = new Population(target, mutationRate, popmax);
}

function draw() {
	// Generate the mating pool
	population.naturalSelection();

	// Create next generation
	population.generate();

	// Calulate the Fitness
	population.calcFitness();	

	// Evaluate the most fit individual in the population
	population.evaluate();

	// If the target phase is found, then stop
	if (population.isFinished()) {
		noLoop();
	}

	displayInfo();
}

function displayInfo() {
	// Display the current status of the population
	let answer = population.getBestPhrase();

	bestPhrase.html("Best Phrase:<br>" + answer);

	let statstext = "Total Generations:     " + population.getGenerations() + "<br>";
	statstext += "Average Fitness:       " + floor(population.getAverageFitness() * 100) + "<br>";
	statstext += "Total Population:      " + popmax + "<br>";
	statstext += "Mutaion Rate:          " + floor(mutationRate * 100) + "% <br>";

	stats.html(statstext);

	allPhrases.html("All Phrases:<br>" + population.getAllPhrases());
}