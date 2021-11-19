# Hop.io

## HACKATON WINNER PROJECT

## T-Reds submission - Sorint Hackaton 2021

Group members:

-   Davide Campagnola
-   Lorenzo Romagnoni

## Project

We started with an initial brainstorming, during which we analyzed the different points of view related to the proposed theme:

> Offer a solution that improves the travel experience of people, solving critical issues arising as a result of the pandemic.

In the complete theme, not only travelers intended as tourists are mentioned, but also workers and students, who take advantage of urban mobility (both private and public) to go to their destinations every day.

## Focus

We have decided to focus on the problems related to urban mobility.
In particular, following the events of recent months, the awareness of situations that can make various subjects uncomfortable, such as gatherings in public transport stations, and the failure to comply with the safety regulations on them has arisen.

A willingness to take better care of ourself has also been found, we want to dedicate part of our's time to leisure, hobbies and playful activities.

## Output -> Hop.io

The Hop.io platform proposes itself as an innovator of the experience of shared public transport.
Through this service, passengers can register and book the routes they need, to make their travels within a safe and controlled environment, in which the customer's safety and well-being are the priority and the value that represents the difference between the main competitors.

The idea is to be able to offer a new possibility to all those who need to regularly make urban routes, so that they can solve their need in total safety and comfort.

The means of transport used in the service guarantee a minimum capacity of 5 passengers, a maximum of 10 (an intermediate solution between a taxi and a bus).
In this way, the safety of passengers can be treated with greater attention, the possibility of being able to define the pickup and dropout position according to the user's preferences, allows to avoid possible gatherings at the stations.

Even from a social point of view, it can allow for the creation of new relations. Being geared towards those who regularly take advantage of the service, and the capacity of vehicles being limited, people are more likely to meet several times and become "hop mates".

From the point of view of pricing, the business model is based on subscriptions, so that the continuous use of the service over time is encouraged.

A further advantage over the use of a "classic" pass for public transport is the fact that the consumption of Hop.io is assessed on the basis of use (for example the kilometers traveled).
In this way, in the event that restrictive measures are necessary that prevent the use of urban mobility, there will be no economic waste caused by the non-use of the service.

Furthermore, with the resumption of production, many subjects will return to occupy the streets. As a result of what happened, many will prefer to use their own vehicle rather than public transport. As a result of these consequences, it is very likely that problems due to excessive car traffic will arise.

Hop.io is also the solution to this type of problem, in fact through algorithms that can calculate the most efficient route to satisfy the requests of all passengers, it is possible to significantly reduce the number of vehicles in circulation.

Linked to this, the implementation of a solution of this type would also bring significant advantages from the point of view of CO2 emissions.

## Platform Developed

Within the 48 hours, we have developed a Hop.io MVP, consisting of a backend application that manage data storage and the exposure of REST API for their manipulation, and a web app that uses these APIs.

### BACKEND

The API's were developed using the Express framework, and the Typescript programming language.
About 110 unit tests have been implemented to ensure the correct functioning of the application.

### FRONTEND

The webapp was developed using React, Typescript as a language and Redux as a state management solution.

### HIGHLIGHTS

Through the developed product, it is possible:

- Register and log in to the service as a passenger
- Register and log into the service as a driver
- Create a trip and view upcoming trips [passenger]
- Give an availability (shift), view those dates [driver]
- Calculate the most efficient route based on the trips requested by users and the availability of the driver
- View the route to be taken during a shift, with timetables, the possibility of calling passengers, integration with google maps. [driver]

We also took care of the graphic aspect of the site, making it responsive, mainly using Boostrap as a style framework.

### PATH OPTIMIZING ALGORITHM

The algorithm can use the following information to work out the best path:

Trip of users
Availability of the driver
Vehicle capacity

Each trip consists of:
Departure time slot (a user can say: "I am available for pickup from 8:00 to 8:15").
Arrival by (a user can say: "I want to arrive at my destination by 10:00")

This is a complete NP problem. For his solution we have implemented heuristics that identify our solution as greedy.

In short, first of all we take the trips that are in the same time slot as the availability provided by the driver.
We then leave with the closest ones (in terms of travel time), trying to fill the vehicle.
If there is a route that allows you to take all passengers to their destination, satisfying their requests, then we take them all to their destination.
If you can't, try calculating it with one less passenger in the car, and so on.
Once brought to the destination we repeat until there are no more users that can be satisfied.

### External REST API used

For the implementation of the present functionalities, external APIs were used, in particular:
Google Map API
RouteXL API

# How to install and run:

### API

Clone the repo.
Then:
```sh
cd api
npm i
npm run build && npm run start
```

To execute tests: 

```sh
cd api
npm t
```

### WebApp React

Clone the repo.
Then:
```sh
cd frontend
npm i
npm run start
```

## Deploy

We have deployed the project on Heroku. It can be found on:

https://hop-io-hackaton-sorint-app.herokuapp.com/

## Greetings

We would like to thank the organizers of the event who allowed us to test ourselves and verify how much we could produce in such a short time!
