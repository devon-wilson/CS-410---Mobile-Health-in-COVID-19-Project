# CS 410: Mobile Health in COVID-19 - Final Project 

### Description

A simple health web application for weight watchers. Users can track their weight loss daily and see their progress with chart visuals.
Users can also record their peak heartrate to determine a correlation between their weight and heartrate.
An analytics tab is provided for users to see their current BMI and how much of a risk COVID might play at their current health.
In the era of COVID-19, a feature was also implemented to allow users to log whether or not they are exhibiting COVID symptoms or have been exposed to COVID.

### Tabs

#### Calendar
<img width="1440" alt="Screen Shot 2021-05-30 at 11 11 40 PM" src="https://user-images.githubusercontent.com/36141897/120148221-baebb300-c19c-11eb-8427-ab93ad72c92d.png">

#### Add/Delete Record
<img width="1440" alt="Screen Shot 2021-05-30 at 10 23 23 AM" src="https://user-images.githubusercontent.com/36141897/120113836-2f890800-c131-11eb-9fb1-0a699f39d239.png">

#### Progress
<img width="1440" alt="Screen Shot 2021-05-28 at 12 00 19 PM" src="https://user-images.githubusercontent.com/36141897/120032135-95995200-bfae-11eb-9b97-770de7a22089.png">

#### Analytics
<img width="1440" alt="Screen Shot 2021-05-30 at 11 14 53 PM" src="https://user-images.githubusercontent.com/36141897/120148307-dd7dcc00-c19c-11eb-9a6e-3abb166c8713.png">

### Development

The frontend was designed using React Native. The calendar component used react-big-calendar, the chart components used chart.js, and the analytics component used react-gauge-chart.

The backend was developed using AWS. Data was stored and queried/indexed using DynamoDB and Lambda. The REST API was integrated with API Gateway.

### To run the application
```
npm start
```
*You may have to install some components*
