// A class to describe a population of virtual organisms
// In this example, each organism is an instance of the Dna object

class Population {
  constructor(phrase, mrate, popmax) {
    this.population; // Array to hold the current population
    this.matingPool; // ArrayList used for the "mating pool"
    this.generations = 0; // Number of generations
    this.finished = false; // Are we finished evolving?
    this.targetPhrase = phrase; // The Target Phrase
    this.mutationRate = mrate; // The Mutation rate
    this.perfectScore = 1;

    this.bestPhrase = "";
    
    this.population = [];
    for (let i = 0; i < popmax; i++) {
      this.population[i] = new Dna(this.targetPhrase.length);
    }

    this.matingPool = [];

    // Call calculate fitness from constructor once since
    // the population class is never re-constructed.
    this.calcFitness();
  }

  // Fill our fitness array with a value for every member of the population
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.targetPhrase);
    }
  }

  // Generate a mating pool
  naturalSelection() {
    // Clear the array list
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > maxFitness) {
        maxFitness = this.population[i].getFitness();
      }
    }

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }    
  }

  // Create a new Generation
  generate() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));

      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];

      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }

    this.generations++;
  }

  getBestPhrase() {
    return this.bestPhrase;
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    let mostfit = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > mostfit) {
        index = i;
        mostfit = this.population[i].getFitness();
      }
    }

    this.bestPhrase = this.population[index].getPhrase();
    if (mostfit == this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute Average Fitness for the population
  getAverageFitness() {
    let total = 0.0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].getFitness();
    }

    return (total / this.population.length);
  }

  getAllPhrases() {
    let everything = "";
    let displayLimit = min(this.population.length, 50);

    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }

    return everything;
  }
}