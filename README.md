# Mother's Day Wordle
There are six levels of wordle, each word being an adjective to describe mom. Upon finishing the sixth level, when 'view stats' is clicked the game board populates with the six adjectives with the green 'correct letter' animation. Once the animation has ended, "Happy Mothers Day" appears underneath.

**Link to project:** https://mdwordle.netlify.app

![Alt Text](https://i.ibb.co/wcJ8bvx/Screenshot-2022-08-14-at-21-54-27.png)

## How It's Made:

**Tech used:** HTML, CSS & JavaScript

The board is made in-situ using JavaScript and words are selected randomly from an external words.js array. Wordle uses keyup event listeners to allow keyboard input and logic to determine letters that match the randomly selected word. A countdown timer was implemented depending on which time selected and will countdown. Progression to the next level occurs when the right answer is obtained. Wordle matches each word input to the words.js array and if the word is not present then a modal pops up saying that the word is not in the list. This modal was created using a CSS library called Toastr. Using ChartJS and local storage stats of Wordle are retained and shown in the form of a bar chart. This shows highschores for each mode alongside how many guesses it took for each level. 

## Optimizations

Other additions I would like to make is an arcade version where if you get a word correct it would add time to your time remaining. Depending on how quick you got it, more time is added. Fully implement a dark mode, at the moment the button is there for it but it is not functional. 

## Lessons Learned:

- [x] How to use ChartJS
- [x] Implementing a countdown 
- [x] Using local storage to store scoresA Mothers' Day Wordle
