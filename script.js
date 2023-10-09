// Initiate Variable to hold data
let allData ='';

// Fetch data from the API
d3.json("http://127.0.0.1:9500/").then(apiData => {
    allData = apiData;
    // Print fetched data to console
    console.log("Data", allData);



    // Append Countries to the dropdown list
    let countriesArray = allData.hdi.map(country => country.country);
    console.log(countriesArray);
    countriesArray.sort();
    countriesArray.map(function (name) {
    let option = d3.select("#selDataset").append("button").attr("class", "dropdown-item").attr('onclick', `optionChanged('${name}')`);
    option.text(`${name}`);
    });

    // Run the init function
    init();

    // Return all data
    return allData;
});

// Create a function to create the line chart
function lineChart(HDItrend, IHDItrend){
    
    // Clear the chart div
    let chartDiv = d3.select('#myChart');
    chartDiv.innerHTML = '';

    // Assign variables to carry the data
    let countryHDI = HDItrend
    let countryIHDI = IHDItrend

    // Create the chart
    const ctx = document.getElementById('myChart');
    new Chart (ctx, {
        type: 'line',

        data: {
            labels: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
            datasets: [{
                label: 'HDI Trends',
                data: [countryHDI.hdi_2011, countryHDI.hdi_2012, countryHDI.hdi_2013, countryHDI.hdi_2014, countryHDI.hdi_2015, countryHDI.hdi_2016, countryHDI.hdi_2017, countryHDI.hdi_2018, countryHDI.hdi_2019, countryHDI.hdi_2020, countryHDI.hdi_2021],
                borderColor: 'red',
                borderWidth: 1,
                backgroundColor: 'red',
                fill: false
                },
                {
                label: 'IHDI Trends',
                data: [countryIHDI.ihdi_2011, countryIHDI.ihdi_2012, countryIHDI.ihdi_2013, countryIHDI.ihdi_2014, countryIHDI.ihdi_2015, countryIHDI.ihdi_2016, countryIHDI.ihdi_2017, countryIHDI.ihdi_2018, countryIHDI.ihdi_2019, countryIHDI.ihdi_2020, countryIHDI.ihdi_2021],
                borderColor: 'teal',
                borderWidth: 1,
                backgroundColor: 'teal',
                fill: false
                }
            ]},
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

// Create a function to filter the data to a certain country and display its data on dashboard
function dashboard(countryName){
    // Filter the data to the selected country
    let countryHDI2021 = allData.hdi_2021.filter(function(country) {return country.country === countryName});
    let countryHDITrend = allData.hdi.filter(function(country) {return country.country === countryName});
    let countryIHDItrend = allData.ihdi.filter(function(country) {return country.country === countryName});

    console.log(countryHDI2021);
    console.log(countryHDITrend);
    console.log(countryIHDItrend);

    // Create the line chart for the selected country
    lineChart(countryHDITrend[0], countryIHDItrend[0]);
    // Fill the cards with the selected country's data
    fillCards(countryHDI2021[0]);

};


// Create a function to fill the cards with the selected country's data
function fillCards(HDI2021){

    // Clear the cards
    d3.select('#hdi').text('');
    d3.select('#rank').text('');
    d3.select('#level').text('');

    // Fill the cards with the selected country's data
    let hdiText = d3.select('#hdi')
    hdiText.text(`${HDI2021['Human Development Index 2021']}`);
    console.log(HDI2021['Human Development Index 2021'])

    let hdiRankText = d3.select('#rank');
    hdiRankText.text(HDI2021.HDI_Rank);
    console.log(HDI2021.HDI_Rank)

    let hdiLevelText = d3.select('#level');
    hdiLevelText.text(HDI2021.HDI_Code);
    console.log(HDI2021.HDI_Code)

}

// Create a function to update data when the dropdown option is changed
function optionChanged(country) { 
    let newCountry = country
    // Display the selected country in the dropdown box
    d3.select('.dropdown-toggle').text(newCountry);
    // Run the dashboard function with the selected country
    dashboard(newCountry);
}

// Create a function to toggle between the content divs
function showDiv(divId) {
    // Hide all content divs
    let divs = document.querySelectorAll('.allcontent');
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display = 'none';
    }
    
    // Show the selected div
    document.getElementById(divId).style.display = 'block';
}

// Create a function to initialize the page
function init() {
    showDiv('homeDiv');
    d3.select('.dropdown-toggle').text('United States');
    dashboard('United States');
}

// Create a function to scroll down the dropdown menu with the keyboard
document.getElementById("dropdownMenuButton").addEventListener("keydown", function(event) {
    // Get the pressed key
    let pressedKey = event.key.toUpperCase();

    // Find the dropdown options
    let options = document.querySelectorAll("#selDataset > button.dropdown-item");

    // Loop through options to find a match
    for (let option of options) {
        if (option.innerText.toUpperCase().startsWith(pressedKey)) {
            // Set focus to the matched option
            option.focus();  
            break;
        }
    }
    // Set focus back to the dropdown button
    document.getElementById("dropdownMenuButton").focus();
});






