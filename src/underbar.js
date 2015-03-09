(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
     return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length -1] : 
      (n <= array.length ? array.slice(array.length - n) : array);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
     if(Array.isArray(collection)){
      for(var index=0; index< collection.length; index++){
        iterator(collection[index], index, collection);
      }
     }

     else{
      for(var index in collection){
        iterator(collection[index], index, collection);
      }
     }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {

    var newArray = [];



    _.each(collection, function(item, index){
     
      if(test(item, index)){
        newArray.push(item);
      }
    })

    return newArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
   

    return _.filter(collection, function(item){
      if(!test(item)){
        return true;}
    });
};

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    var duplicateCheck = function(item, index){
    
      return _.indexOf(array, item) === index;
    }

    return _.filter(array, duplicateCheck);

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArray = [];
    _.each(collection, function(item, index){
        newArray.push(iterator(item));

    });
    return newArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    
    //This was my error in reduce, causing error in _.contains causing error in _.memoize
    //if(collection.length === 1){
     // return collection[0];
    //}

    if(accumulator == undefined){
      var accumulator = collection.shift();
    }
    

    _.each(collection, function(item){
      accumulator = iterator(accumulator, item);

    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.


  if(collection.length < 1){
    return true;
  } 


  if(iterator == undefined){
    iterator = _.identity;
  }

  if(collection.length === 1){
    if(iterator === _.identity && collection[0] != false && collection[0] != null && collection[0] != undefined && collection[0] != NaN){
      return true;
    }
    return iterator(collection[0]) === true;
  }


  return _.reduce(collection, function(accumulator, item){
      if(accumulator && iterator(item)){
        accumulator = true;
      }
      else{
        accumulator = false;
      }
        return accumulator === true;
    }, true);


  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
 
    var testArray = []

    _.each(collection, function(item){
      var holdingArray = [item];
      if(_.every(holdingArray, iterator)){
        testArray.push("found one");
      }

      });
      
      if(testArray.length >= 1){
        return true;
      }
      else{
        return false;
      }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
      var newPropObjects = Array.prototype.slice.call(arguments, 1);
      _.each(newPropObjects, function(sourceObject){
        for(var key in sourceObject){
          obj[key] = sourceObject[key];
        }
      });

      return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
     var newPropObjects = Array.prototype.slice.call(arguments, 1);
      _.each(newPropObjects, function(sourceObject){
        for(var key in sourceObject){
          if(obj[key] === undefined){
          obj[key] = sourceObject[key];
          }
        }
      });

      return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    //Note: these must be created outside the internal function so that pushed items can be saved 
    //even after internal function is done running.
    var calledArguments = {};

    //I created an array of the target "keys" to check whether a key had been used.  Can also be done with 
    //just checking _.contains on calledArguments but since _.contains checks the values in an object 
    //rather than the keys, it seemed less intuitive than checking an array of just the keys.  
    //But since it is redundant, I have commented out the arrayTest code.
    //var arrayTest = [];  

   
    
    
    return function(){
  
    //This definition of target also works but arguments[0] seems more straightforward since we can assume one argument.
    //var target = _.identity.apply(this, arguments);
    var target = arguments[0];
   
    var alreadyCalled = _.contains(calledArguments, calledArguments[target]);

    //var alreadyCalled = _.contains(arrayTest, target);
   

      if(!alreadyCalled){
      //arrayTest.push(target);
      calledArguments[target] = func.apply(this, arguments);
      return calledArguments[target];
      }

      else{
      return calledArguments[target];
      }

    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      var args = Array.prototype.slice.call(arguments, 2);

      return setTimeout(function(){return func.apply(null, args);}, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //This makes array copy but not needed for my implementation:
    //var arrayCopy = array.slice();

    //Note that the third test of this function will fail if the random shuffle results
    //in the new array matching the original array which is possible with a random shuffle.
    
    var shuffledArray = [];
    var length = array.length;
    var random;

    _.each(array, function(item, index){
          random = Math.floor(Math.random() * length);
        while(shuffledArray[random] != undefined){
          random = Math.floor(Math.random() * length);
         }
          shuffledArray[random] = item;
    });

    return shuffledArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  
    return _.map(collection, function(item){

      if(typeof functionOrKey === 'function'){

        return functionOrKey.apply(item, args);
      } else{

        //Used if functionOrKey is a method.  Uses brackets rather than
        //dot because functionOrKey is in quotes.

        return item[functionOrKey].apply(item, args);
        }
    });

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    if(typeof iterator === "string"){

      return collection.sort(function(a, b){
        return a[iterator] - b[iterator];

      });

    } else{
       
        return collection.sort(function(a, b){
          return iterator(a) - iterator(b);
         });
      

    }



  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
   
   var args = Array.prototype.slice.call(arguments);

   var newArray = [];
   var longestInnerArrayLength = 0;


   _.each(args, function(item){
     if(item.length > longestInnerArrayLength){
       longestInnerArrayLength = item.length;
     }

   })

   for(var i=0; i< args.length; i++){
     for(var j=0; j< longestInnerArrayLength; j++){

        if(newArray[j] === undefined){
        
          var innerArray = [];
          newArray.push(innerArray);

        } else {
          innerArray = newArray[j];
          
        }

        innerArray.push(args[i][j]);

      }
        
    }

   return newArray;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    if(result === undefined){
      var result = [];
    }

    var recursiveFlatten = function(array){

      _.each(array, function(item){
        if(!Array.isArray(item)){
          result.push(item)
        } else {

          recursiveFlatten(item);
        }

      });

    }

    recursiveFlatten(nestedArray);

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    var args = Array.prototype.slice.call(arguments);

    var flattenedArray = _.flatten(args);

    var flattenedUniqArray = _.uniq(flattenedArray);

    var intersectionArray = [];

    _.each(flattenedUniqArray, function(target){
      if(_.every(args, function(item){
        return _.contains(item, target);
          })
        ){
          intersectionArray.push(target);
        }
    });

    return intersectionArray;

  

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

    var otherArray = _.flatten(Array.prototype.slice.call(arguments, 1));

    return _.filter(array, function(item){
      if(_.indexOf(otherArray, item) < 0){
        return true;
      }

    });


  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

    var lastCallTime = [];
   

    return function(){
      
      var currentTime = Date.now();

      if(lastCallTime.length < 1 || 
        currentTime - lastCallTime[lastCallTime.length -1] >= wait){
        lastCallTime.push(currentTime);
        return func;

      } else {

        var nextScheduledCall = lastCallTime[lastCallTime.length -1] + wait;

        var waitLeft = nextScheduledCall - currentTime;

        lastCallTime.push(nextScheduledCall);

        return _.delay(func, waitLeft);

      }



    }


  };
}());
