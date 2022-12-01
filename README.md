# Development

### Link to Deployed Website
If you used the stencil code, this is https://hungryhippo888.github.io/development

### Goal and Value of the Application
This application was designed as a menu for a brunch restaurant. With a coffee-colored theming and dark animated blocks for the different menu items, I was going for a minimalistic, clean looking menu website for a brunch restaurant to display its menu items in a highly digestable manner.

The items are all updated where clicking the item will flip the card and display information about the food.
Note: I learned how to make flipping cards from https://bvgsoftware.com/blog/how-to-build-a-flip-card-component-with-react/ 

### Usability Principles Considered
For usability, I tried to incorporate a number of different filters that allowed the user to filter based on particular low-calorie options, vegan options, and/or gluten free options. On the left, I have an aggregator that shows the total number of calories of the favorited menu items. There's also an on-click feature for each card to make getting food data simple. Moreover, I added the ability to favorite items in the top right corner of each card to simulate familiar elements.

### Organization of Components
I organized my components into the App.js to render the single page with buttons, title, and flexbox holding the items, and MenuItem.js to render what an individaul menu item looks like. On the page itself, the entire page is a flexbox, with the title centered on the page, the filter options as a vertical bar directly under on the left hand side of the screen, and the menu items directly adjacent to the vertical bar.

### How Data is Passed Down Through Components
Each MenuItem has its own data with fields specified in the food-data.json file. Data is passed through the Components through props. We pass the values of the json objects to the MenuItem prop. To display the data, App.js filters, sorts, and maps all these items based on the current state of the data and the specified filters and sorts.

### How the User Triggers State Changes
The user triggers state changes by:
1) Favoriting a menu item by clicking the heart on top right of each menu item
2) Filtering by <250 Calories by clicking filter by calories
3) Filtering by vegan options by clicking filter by vegan options
4) Filtering by gluten-free options by clicking filter gluten-free options
5) Sorting by most popular items by selecting filter by most popular
6) Sorting by price by selecting sort by price
7) Sorting by calories by selecting sort by calories
8) Resetting all filters by selecting reset All Filters
9) Clicking a card to flip and showcase food specifics

Note: The reset button only resets the filters and does not reset aggregator and favorited menu items, as per a TA I spoke with