# Memory Game Project
The Memory Game Project is to build a complete browser-based card matching game using JavaScript,HTML and css.

## Table of Contents

* [Instructions to build the game ](#instructions)


## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality following this steps:

1) fetch and store all HTML cards.

2) shuffle the cards.

3) after shuffling the cards, create HTML for each card, add it the page and restore the cards.

4) add click event for each card.

5) open the cards when clicked.

6) start timer when the player start to open the cards.

7) compare the open cards with the previous opened card:

if the two cards are match then:

* set the classes of the two cards to "match".
* increment number of moves.

if the two cards are not match then:

* lock the cards.
* increment number of moves.

8) while the number of moves increase, the star rating will decrease.

9) if the all cards are match:

* display Congratulations Popup that tell the user how much time it took to win the game, and what the star rating was and ask if they want to play again.

10) add click event to restart button to restart the game.



