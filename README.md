# CS 410: Mobile Health in COVID-19 - Final Project 

# Description

A simple health web application for weight watchers. Users can track their weight loss daily and see their progress with chart visuals.
Users can also record their peak heartrate to determine a correlation between their weight and heartrate.
An analytics tab is provided for users to see their current BMI and how much of a risk COVID might play at their current health.
In the era of COVID-19, a feature was also implemented to allow users to log whether or not they are exhibiting COVID symptoms or have been exposed to COVID.

# Development

The frontend was designed using React Native. The calendar component used react-big-calendar, the chart components used chart.js, and the analytics component used react-gauge-chart.

The backend was developed using AWS. Data was stored and queried/indexed using DynamoDB and Lambda. The REST API was integrated with API Gateway.

## To run the application
```
npm start
```
*You may have to install some components*
