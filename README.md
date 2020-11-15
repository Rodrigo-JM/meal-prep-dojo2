# Meal Prep Dojo

Original application for those who are looking for a way to stay on point with their diet.

With MPD you can create your meals by picking and choosing ingredients from FatSecret's official collection. With realiable nutritional information for each of your meals, you can then distribute them along the week/month with an easy to use drag-and-drop functionality. Each day will have information about total macronutrients. By selecting days you can go the groceries store, you can print out lists with the ingredients you need to accomplish you desired meal plan.

# Technologies

Firebase for database, authentication and cloud functions.

React.Js and Redux for state driven front-end code.

Express.js as my back-end framework. I need to have a server to bypass CORS restriction and use FatSecret's API. Otherwise, I would go with serverless for this application.

# Components Architecture

![My Beautiful Components](https://i.imgur.com/nOD30U7.jpg)

 - Landing Page: Well, supposedely I would have a landing page, but right now there isn't one
 - Get Started: This would be a little onboarding section, but again, haven't got the time to finish this
 - Auth: Handling logins and creating accounts (I know, the password is not hidden)
 - App: This is the front door of the app. Holding all three tabs: Meal Container, Calendar and Dashboard.
 - MealContainer: This is the section for creating new meals. This holds NewFoodMain and NewMealInfo. Additionally, it shows the current state of the new meal being created, like the selection of ingredients, and let's you submit it with a name.
 - NewMealInfo: Shows the current macronutrients profile of the meal being created
 - NewFoodMain: This holds SearchFood, ViewResults, PrepareMeal, tieing all togheter for meal creation
 - SearchFood: Basically a text input to call FatSecret's API. It fires with every key stroke so I can display results in an autocompletion fashion
 - ViewResult: Displays a list with the current results of the FatSecret's API response and allows the user to click an item to select an ingredient
 - PrepareMeal: Allows the user to control the amount in grams (oz are properly converted along the app) of the current ingredient to add to the meal and submit it. Holds FoodInfoCard.
 - FoodInfoCard: Displays the macronutrients for the ingredient being added according to its serving size
 - Dashboard: This is the front door of the groceries lists section. Displays mapped out requirements based on the current day selected and allows the user to schedule a groceries haul, adjusting the requirements accordingly. The user can select a day and it will remap the requirements based on that day ownwards. The premiss is that groceries hauls can only satisfy requirements of future days. Holds DatePicker and HaulsBox
 - HaulsBox: Displays a list with all the groceries hauls the user had scheduled. Holds HaulCard
 - HaulCard: Displays information of a single groceries haul
 - DatePicker: Displays available days for a groceries haul. Disable days with a previously scheduled groceries haul
 - Calendar: This is planner section. The user can see his meals and a calendar with the next 30 days. The user can then drag and drop his meals into days to add them to his plan. For each day, the user can see total macronutrients. Holds MealsBox and DayCard
 - DayCard: A card to display daily information. Has the dropping (drag-n-drop) logic for each meal. Holds DailyMacros and MealCard.
 - DailyMacros: Maps out total info passed down from DayCard
 - MealCard: Displays information for the meal and holds IngredientsCard
 - IngredientsCard: Displays all the ingredients and their quantities for a given meal
 - MealsBox: Displays a list with the user's meals. Holds MealCard.
 
 # Redux
 
 I am using redux as my state managment library. The reason for this is simple, I need shared state between a lot of my components while communicating and monitoring data from Firestore
 
 My store looks like this:
 
 ![My beautiful store](https://imgur.com/a/s3lV21n)
 
 GroceryBank, Days and Meals are basically pipelining snapshots from Firestore and firing actions to adjust state. I won't go deep into the logic I used. Feel free to contact me if you are interested. 
 
 User holds the current user
 
 Total and ingredients are holding and mapping information
 
 # Cloud Functions
 
 There are three cloud functions (Firestore) I am using in this project
 
- CreateRequiredDataForNewUSer: Creates a grocery_bank document for a new user. ({hauls: [], required_ingredients: [], user_id: ""})

- UpdateIngredientRequirements: Whenever the user adds or removes meals from a day, the required ingredients for his meal plan need to be adjusted. This logic is a little bit tricky since I need to store requirements based on timestamp, because I am remapping those requirements whenever the user selects a different day to go to the groceries store.

- UpdateHaulAssociatedRequirements: Whenever a groceries haul is created or deleted I need to update the user requirements. This logic is also tricky considering the timestamp relationship. There is A LOT of mapping involved. A lot of caffeine as well. 

# Challenges and Next Steps

One the biggest challenges is keeping this working. I had to implement FixieSocks to have a static IP and request nutritional data from FatSecret's API, but it's USD 29.99 a month (for a reasonable amount of requests, remember autocomplete logic and calling the api for evey key stroke), and I do not allow myself to pay that when this is still so unrefined. If anyone wants to try this out live, I have to make adjustments beforehand.

While coding this, the biggest challenge was making sure my cloud functions where mapping required ingredients correcly. The biggest issue is matching ingredients and timestamps togheter so that both functions can communicated adequately. 

Finding a proper application state that could provide all the information I needed was also a big obstacle. Some information only come in after certain calls are made to the database, and it could break the state if those aren't registered, but at the same time I can't use some variables that are connected to firestore because if they are undefined at the time of rendering all hell breaks loose.

Next steps are: clean useless boilerplate code, refactoring component names, deleting console.logs, implementing material-ui for better cards, menus, lists, buttons, forms and possibily some good modals.

I would really appreciate if MyFitnessPal gave me access to their API, since FatSecret is making me run a server just for calling them.

