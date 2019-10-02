class Dna {
  constructor(geneSize) {
    // The genetic sequence
    this.genes = [];
    this.fitness = 0.0;

    for (let i = 0; i < geneSize; i++) {
      this.genes[i] = newChar(); // Pick from range of chars
    }
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join("");
  }

  // Fitness function
  // Returns floating poing % of "correct" character
  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }

    this.fitness = (score / target.length);
  }

  getFitness() {
    return this.fitness;
  }

  // Crossover
  crossover(partner) {
    // A new Child
    let child = new Dna(this.genes.length);

    // Pick a midpoint
    let midpoint = floor(random(this.genes.length)); 

    // Half from one, half from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      }
      else {
        child.genes[i] = partner.genes[i];
      }
    }

    return child;
  }

  // Based on mutation rate, pick a new random character
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}

function newChar() {
  let c = floor(random(63, 122));
  if (c == 63) c = 32;
  if (c == 64) c = 46;

  return String.fromCharCode(c);
}