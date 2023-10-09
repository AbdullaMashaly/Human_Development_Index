# project-3
UNC Chapel Hill - Data Analytics Boot Camp Project 3



## Table of Contents

- [About](#about)
- [Analysis](#analysis)
- [Contributing](#contributing)

## About

The UNDP publishes data available to the public to access specific indicies on Human Development over the years. The data our group used, investigated a few different published indicies and their components for the years 2011-2021. These indicies include the human development index (HDI), the inequality-adjusted HDI (IHDI) the gender inequality index (GII) and the gender human development index (GDI). 
The Human Development Index, for example, is a standardized metric used to measure the development of individual countries or regions and be able to compare them to one another on a single scale. The HDI is comprised of 4 components to help establish a HDI ranking for the country (0-1). The four components that go into calculating an HDI score are the life expectancy of an individual in a country at the time of birth, the expected number of years of school, the mean number of years of school, and the gross national income per capita.

The objective is to use the data to create a web based visual for users to investigate the metrics for individual countries or regions in a comprehensive, easy to follow way. We also performed our own analysis on the data to draw conclusions around the information provided to us from this report. The analysis performed helps to validate the accuracy of the calculations used for these metrics.



## Analysis

Is there a relationship between components of the HDI index?

Looking into the HDI components around education and life expectancy we can see a clear relationship between the expected number years of school vs the mean number years of school in each country. We can see from the graph that the countries with more years of schooling are also the countries with the higher life expectancy at the time of birth. This visual acts as quanitative data to support HDI index calculations, suggesting that the more developed countries (the countries with a higher hdi index) are also the countries that are expected to be more educated and live the longest lives.

When comparing the life expectancy in each of the different levels of developing countries to the gross national income made per capita, we can see a wider spread in both categories of the developed countries (in green) then we do in any of the other levels. This graph can give us a clear picture of the diversity in the highly developed countries compared to the lack of diversity in the least developed countries. We can conclude that in the countries with highest income levels, we recognize the longest life expectancy. We also see that in the countries with a higher life expectancy, there is an exponential growth in the GNI per capita that people earn within that country.



## Contributing
Charts.js --> This was a library that our group decided to use outside of the libraries we learned aobut in our class. We used this library to create the radar chart and the line grasph to compare the HDI and IHDI
Plotly --> This library was used for our analysis to create static references to support our conclusions.
UNHD --> Public data used from the United Nations Human Development API to build our project around.


