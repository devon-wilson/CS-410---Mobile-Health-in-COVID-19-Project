# CS 410: Mobile Health in COVID-19 - Final Project 

### Description

A simple health web application for weight watchers. Users can track their weight loss daily and see their progress with chart visuals.
Users can also record their peak heartrate to determine a correlation between their weight and heartrate.
An analytics tab is provided for users to see their current BMI and how much of a risk COVID might play at their current health.
In the era of COVID-19, a feature was also implemented to allow users to log whether or not they are exhibiting COVID symptoms or have been exposed to COVID.

### Tabs

#### Add/Delete Form
<img width="1440" alt="Screen Shot 2021-05-28 at 12 00 10 PM" src="https://user-images.githubusercontent.com/36141897/120031138-4141a280-bfad-11eb-8179-ddc84a0b049d.png">

#### Progress
<img width="1440" alt="Screen Shot 2021-05-28 at 12 00 19 PM" src="https://user-images.githubusercontent.com/36141897/120032135-95995200-bfae-11eb-9b97-770de7a22089.png">

#### Analytics
<img width="1440" alt="Screen Shot 2021-05-28 at 12 00 31 PM" src="https://user-images.githubusercontent.com/36141897/120032160-a0ec7d80-bfae-11eb-996d-605dfffe04ab.png">

### Development

The frontend was designed using React Native. The calendar component used react-big-calendar, the chart components used chart.js, and the analytics component used react-gauge-chart.

The backend was developed using AWS. Data was stored and queried/indexed using DynamoDB and Lambda. The REST API was integrated with API Gateway.

### To run the application
```
npm start
```
*You may have to install some components*
