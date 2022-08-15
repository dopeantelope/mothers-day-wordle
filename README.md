# Mother's Day Wordle
This was made for my mum for Mother's Day due to her love for Wordle. Disguised as an everyday Wordle, there are six levels with each word being an adjective to describe my mum. Upon finishing the sixth level, when 'view stats' is clicked the game board populates with the six adjectives with the green 'correct letter' animation. Once the animation has ended, "Happy Mothers Day" appears underneath.

**Link to project:** https://mdwordle.netlify.app

![Alt Text](https://i.ibb.co/pWb6vzJ/Screenshot-2022-08-14-at-21-54-27-1.jpg)

## How It's Made:

**Tech used:** HTML, CSS & JavaScript

The board is made in-situ using JavaScript and words are selected from an external words.js array. Wordle uses keyup event listeners to allow keyboard input and logic to determine letters that match the randomly selected word. For this version there are 6 levels each word corresponding to an adjective to describe my mum. Once a level is completed a win modal pops up to progress to the next level. Play continues until you reach the final level where 'stats' can be viewed. The final page shows all of the adjectives in the Wordle game board as they animate green column by column using setTimeouts.

The code must be ran using Live Server.

## Optimizations

Further optimizations I would like to implement would be converting this into a web app where people can customize the words themselves and the message at the end and then send it to someone. Essentially a dynamic card.

## Lessons Learned:

- [x] Using Live Server
- [x] Animating using Promises
- [x] Toastr CSS library
