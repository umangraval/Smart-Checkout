# Smart-Checkout

[![Actions Status](https://github.com//umangraval/Smart-Checkout/workflows/Build/badge.svg)](https://github.com/umangraval/Smart-Checkout/actions)


With the pandemic affecting everyone overall, small businesses have been affected the most. While the entire world is going online, local businesses do not have the budget nor the technical background. This is exactly what our product solves. It lets the user scan the bar codes of all items in the grocery store, and proceeds to online payment thus keeping in check the no contact rule. With the data analytics feature, the admin of the store gets an insight into the inventory, visualizations of items in surplus, shortages, profit, or loss over any item. With our solution, both customers and business owners are kept in the loop.

The owner would have access to the dashboard where he can manage his products while adding a product QR Code would be generated and he can take the printout to stick it on the counter. They will be following a canteen type system.

Whenever a user wants to buy a product, he can scan the code and get the details through a mobile app (Flutter). He will get an option to buy and if the customer clicked yes, the amount of product will be added to his credits. The customer has a minimum of a few days to pay the price through online mode (UPI, debit card, etc).

Products will be managed in real-time in the dashboard if a person buys and the owner can see his paid status.

This will also allow the owner to understand the customers and their needs and help recognize loyal and recurring customers. They can then use this to give them special discounts and offers to reward their loyalty. This will also allow them to retain customers by giving them comeback offers.

The inventory management system will allow the owner to monitor the trends of sales and buy supplies accordingly.
QR code will be secured through token authentication from API. So not anyone without a login can access the qrcode.

## Development

Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ docker-compose -f docker-compose.dev.yml up
```

Running the above commands results in 
* ⚙️**React Frontend** running at `http://localhost`
* 🌏**API Server** running at `http://localhost:8080`
* 🛢️**MongoDB** running at `mongodb://smart_mongodb:27017`

