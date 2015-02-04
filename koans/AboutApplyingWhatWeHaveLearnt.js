var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(3);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _.filter(products, function(pizza) { return !pizza.containsNuts; });
      productsICanEat = _.filter(productsICanEat, function(pizza) { 
        return !_.any(pizza.ingredients, function(i) {
          return i == "mushrooms";
        })
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    // var sum = _.chain(_.range(1000)).reduce(function(acc, i) { if (i%3===0 || i%5===0) { return i; }}, 0).value();    

    var sum = _.reduce(_.range(1000), function(acc, i) { return (i%3===0||i%5===0) ? acc + i : acc;  }); 
    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    var ingredients = _.map(products, function(pizza) { return pizza.ingredients; });
    ingredients = _.flatten(ingredients);
    ingredients.forEach(function(i) { ingredientCount[i] = ingredientCount[i] + 1 || 1; });
    
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  it("should find the largest prime factor of a composite number", function () {
    var isPrime = function(n) {
      var prime = true;
      _.range(2, n).forEach(function(i) {
        if (n % i === 0) { prime = false; }
      });
      return prime;
    };
    var primeFactors = [];

    var largestPrimeFactor = function(n) {
      _.range(n, 1, -1).forEach(function(div) {
        if (n % div === 0 && isPrime(div)) {
          primeFactors.push(div);
        };
      });
      return _.max(primeFactors);
    };
    
    expect(largestPrimeFactor(210)).toBe(7);
  });
  
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var largestPalindrome = function() {
      var palindromes = [];
      _.range(100, 1000).forEach(function(i) {
        _.range(100, 1000).forEach(function(j) {
          if ((i*j).toString().split('').reverse().join('') === (i*j).toString()) {
            palindromes.push(i*j);
          }
        });
      });
      return _.max(palindromes);
    };

    expect(largestPalindrome()).toBe(906609);
  });
  
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    /**
     * This causes a stack overflow in Chrome, 
     * but it's a working recursive solution.

    var rangeIt = function(num) {
      _.range(2, 21).forEach(function(div) {
        if (num % div !== 0) {
          console.log("%d not div by %d", num, div);
          rangeIt(num+20);
        }
      });
      return num;
    };
    */

    
 }); 

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var scores = [10, 20, 30, 40, 50];

    var sumSquares = function(array) {
      var avg = array.reduce(function(acc, i) { return acc + i; }, 0) / array.length;
      return array.map(function(score) { return Math.pow(avg-score, 2); }).reduce(function(acc, i) { return acc + i; }, 0);  
    };
    var squareSums = function(array) {
      return Math.pow(array.reduce(function(acc, i) { return acc + i; }), 2);  
    };

  
    var diff = sumSquares - squareSums;
    return diff;
  });
  
  it("should find the 10001st prime", function () {
    // So I need to count primes. 10k of them, to be exact. Then another. 
    // My first thought is to repurpose my isPrime function from above. 
    // I can count up from 1 and push each "isPrime" number into an array, 
    // and just "pop" that array when its "length" equals "10001". 
    // That seems...EXCESSIVE. But hell, let's try that first. 
    var isPrime = function(n) {
      var prime = true;
       _.range(2, n).forEach(function(i) {
        if (n % i === 0) { prime = false; }
      });
      return prime;
    };
    
    var nthPrime = function(n) {
      var primes = [1, 2, 3, 5, 7],
          i = 11;

      while(primes.length <= n) {
        // Control loop? Too much?
        // primes.forEach(function(p) {
        //  if (i % p === 0) { return; }
        // });
        if (isPrime(i)) { 
          primes.push(i); 
          //console.log(i);
        }
        i += 2;
      }
      return primes.pop();
    };

    //expect(nthPrime(10001)).toBe(104743);
  });
  
});
