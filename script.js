// Initialize region var
let allDataRegions ='';
// Fetch regions data from the API
d3.json("http://127.0.0.1:9500/regions").then(apiData => {
    allDataRegions = apiData;
    // Print fetched data to console
    console.log("Regions", allDataRegions);

    // Run function to create line chart
    lineChartRegion(allDataRegions.hdi_trends_regions, allDataRegions.ihdi_trends_regions);
    // Run function to create bar chart
    barChartRegion(allDataRegions.ihdi_regions_2021);
    // Return all data
    return allDataRegions;
});

// Initiate Variable to hold data
let allData ='';

// Fetch coiuntries data from the API
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


//////////////////////////////////////////////
// Functions to populate the HDI by regions page
// Create a function to create the line chart
function lineChartRegion(hdiRegionsTrend, ihdiRegionsTrend) {
    // Sort the datasets based on the 'region' property
    hdiRegionsTrend.sort((a, b) => a.region.localeCompare(b.region));
    ihdiRegionsTrend.sort((a, b) => a.region.localeCompare(b.region));

    let regionsHDI = hdiRegionsTrend.map(region => ({
        'region' : region.region,
        'HDI' : [region.hdi_2011, region.hdi_2012, region.hdi_2013, region.hdi_2014, region.hdi_2015, region.hdi_2016, region.hdi_2017, region.hdi_2018, region.hdi_2019, region.hdi_2020, region.hdi_2021]}));
    
    let regionsIHDI = ihdiRegionsTrend.map(region => ({
        'region' : region.region,
        'IHDI' : [region.ihdi_2011, region.ihdi_2012, region.ihdi_2013, region.ihdi_2014, region.ihdi_2015, region.ihdi_2016, region.ihdi_2017, region.ihdi_2018, region.ihdi_2019, region.ihdi_2020, region.ihdi_2021]}));

    let years = [2011, 2012, 2013, 2014, 2015, 2016, 2017 ,2018, 2019, 2020, 2021];

    const hdiColors = ['#D32F2F', '#1976D2', '#388E3C', '#FBC02D', '#8E24AA', '#E64A19', '#0288D1'];
    const ihdiColors = ['#E57373', '#64B5F6', '#81C784', '#FFEB3B', '#BA68C8', '#FF8A65', '#4FC3F7'];

    let traces = [];
    // HDI traces
    for (let i = 0; i < regionsHDI.length; i++) {
        traces.push({
            x: years,
            y: regionsHDI[i].HDI,
            type: 'line',
            name: regionsHDI[i].region + ' HDI',
            line: {
                color: hdiColors[i]
            }
        });
    }
    // IHDI traces
    for (let i = 0; i < regionsIHDI.length; i++) {
        traces.push({
            x: years,
            y: regionsIHDI[i].IHDI,
            type: 'line',
            name: regionsIHDI[i].region + ' IHDI',
            line: {
                color: ihdiColors[i]
            }
        });
    }

    const layout = {
        title: 'HDI vs IHDI Trends by Region',
        xaxis: {
            title: 'Years'
        },
        yaxis: {
            title: 'HDI & IHDI'
        },
        width: 1100,
        autosize: true,
        updatemenus: [
            {
                // Dropdown settings
                buttons: getDropdownButtons(hdiRegionsTrend, ihdiRegionsTrend),
                direction: 'down',
                showactive: true,
                x: 0,
                xanchor: 'left',
                y: 1.2,
                yanchor: 'top'
            }
        ]
    };

    Plotly.newPlot('regionChart', traces, layout);

}

// Create a function to create the dropdown buttons for the line chart in the HDI by regions page
function getDropdownButtons(hdiRegionsTrend, ihdiRegionsTrend) {
    let buttons = []; 

    // Loop through each region in the hdiRegionsTrend array.
    for (let i = 0; i < hdiRegionsTrend.length; i++) {
        // Create an array for HDI visibility.
        let hdiVisibility = [];
        for (let j = 0; j < hdiRegionsTrend.length; j++) {
            // If the current index matches the region's index, set visibility to true, otherwise false.
            hdiVisibility.push(i === j);
        }
    
        // Create an array for IHDI visibility.
        let ihdiVisibility = [];
        for (let j = 0; j < ihdiRegionsTrend.length; j++) {
            // If the current index matches the region's index, set visibility to true, otherwise false.
            ihdiVisibility.push(i === j);
        }
    
        // Combine the visibility arrays and create a button for the region.
        let button = {
            label: hdiRegionsTrend[i].region,
            method: 'update',
            args: [{
                'visible': hdiVisibility.concat(ihdiVisibility)
            }]
        };
    
        // Add the button to the buttons array.
        buttons.push(button);
    }

    return buttons;
};

// Creat a function to create a bar chart for the HDI by regions page
function barChartRegion(ihdi2021) {
    // Sort the datasets based on the 'region' property
    ihdi2021.sort((a, b) => a.region.localeCompare(b.region));

    let regions = ihdi2021.map(region => region.region);
    let inequalityInLifeExpectancy = ihdi2021.map(region => region['Inequality_in_life_expectancy(%)']);
    let inequalityInEducation = ihdi2021.map(region => region['Inequality_in_eduation(%)']);
    let inequalityInIncome = ihdi2021.map(region => region['Inequality_in_income(%)']);


    let traces = [{
            x: regions,
            y: inequalityInLifeExpectancy,
            type: 'bar',
            name: 'Inequality in Life Expectancy',
            marker: {
                color: '#D32F2F'
                }
            },{
            x: regions,
            y: inequalityInEducation,
            type: 'bar',
            name: 'Inequality in Education',
            marker: {
                color: '#1976D2'
                }
            },{
            x: regions,
            y: inequalityInIncome,
            type: 'bar',
            name: 'Inequality in Income',
            marker: {
                color: '#388E3C'
                }
        }];

    const layout = {
        title: 'Inequality in HDI Components by Region',
        xaxis: {
            title: 'Regions',
            tickfont:{
                size: 10
            },
        },
        yaxis: {
            title: 'Inequality (%)'
        },
        width: 1100,
        autosize: true,
        barmode: 'group',
        responsive: true,
        margin: {
            b: 120
        }
    };

    Plotly.newPlot('regionBar', traces, layout);
};

//////////////////////////////////////////////
// Functions to populate the HDI by countries page
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
    let countryGII = allData.gii.filter(function(country) {return country.country === countryName});

    console.log(countryHDI2021);
    console.log(countryHDITrend);
    console.log(countryIHDItrend);

    // Create the line chart for the selected country
    lineChart(countryHDITrend[0], countryIHDItrend[0]);
    // Fill the cards with the selected country's data
    fillCards(countryHDI2021[0]);
    
    //Fill the radar chart
    radar_chart(countryHDI2021[0]);

    //Fill the gauge chart
    updateGauge(countryGII[0]);
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

// Create a function to create the radar chart
function radar_chart(country, data = allDataRegions) {
    
    //Filter data for the world averages
    let world_hdi = data['hdi_regions_2021'].filter(function(regions) {return regions.region === "World"});
    //Grab data for the chart
    let chrt= document.getElementById("radarChart");


    //Create chart to hold data

    new Chart(chrt, {
        type: 'radar',
        data: {
            labels: ['Life Expectancy at Birth',
            'Expected Years of Schooling',
            'Mean Years of Schooling',
            'Gross National Income Per Capita(Thousands $)'
            ],
            datasets: [{
            label: `${country.country} HDI Components`,
            data: [country["Life Expectancy at Birth"],country["Expected Years of Schooling"],
            country["Mean Years of Schooling"],country["Gross National Income Per Capita"]/1000],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
            pointRadius: 6,
            radius: 6
            },
            //Dataset for the world averages
            {
            label: 'World Average HDI Components',
            data: [world_hdi[0]["Life Expectancy at Birth"],world_hdi[0]["Expected Years of Schooling"],
                    world_hdi[0]["Mean Years of Schooling"],world_hdi[0]["Gross National Income Per Capita"]/1000],
            fill: true,
            backgroundColor: 'rgb(0, 0, 255, 0.2)',
            borderColor: 'rgb(0, 0, 255)',
            pointBackgroundColor: 'rgb(0,0,255)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(0, 0, 255)',
            pointRadius: 6,
            radius: 6
            }],

        },
        options:
            {   
                resonsive: true,
                maintainAspectRatio: true,
                scale: {
                gridLines: {
                    color: "white",
                    lineWidth: 3
                },
                angleLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 10
                },
                pointLabels: {
                    fontSize: 8,
                    fontColor: "red"
                }
                },
                legend: {
                position: 'top'
                }
            }
        }
    );
};

function updateGauge(country) {
    console.log(country);
    let gii = country['Gender Inequality Index'];
    console.log(gii);
    let data =[
        {   
            type: "indicator",
            mode: "gauge+number",
            value : gii,
            gauge: {
                axis:{
                    range: [0, 1],
                    tickmode: 'linear',
                    tickfont: {
                        size: 15
                    }
                },
                bar: { color: 'brown'},
                steps: [
                    { range: [0, 0.1], color: 'rgb(173,216,230)' },  
                    { range: [0.1, 0.2], color: 'rgb(100,149,237)' },  
                    { range: [0.2, 0.3], color: 'rgb(0,191,255)' },  
                    { range: [0.3, 0.4], color: 'rgb(30,144,255)' },  
                    { range: [0.4, 0.5], color: 'rgb(0,128,128)' },  
                    { range: [0.5, 0.6], color: 'rgb(32,178,170)' },  
                    { range: [0.6, 0.7], color: 'rgb(0,206,209)' },  
                    { range: [0.7, 0.8], color: 'rgb(70,130,180)' },  
                    { range: [0.8, 0.9], color: 'rgb(95,158,160)' },  
                    { range: [0.9, 1], color: 'rgb(25,25,112)' }
                ]
            }
        }
    ]

    let layout = {
        paper_bgcolor :'white',
        annotations: [{
            x: 0.5,
            y: 1,
            xref: 'paper',
            yref: 'paper',
            text: `<b>${country.country}</b><br><b>GII</b>`,
            font: {
                size: 12
            },
            showarrow: false,
            align: 'center'
        }]
    };

    Plotly.newPlot('gauge', data, layout);
};

//////////////////////////////////////////////

// Create a function to initialize the page
function init() {
    showDiv('homeDiv');
    d3.select('.dropdown-toggle').text('United States');
    dashboard('United States');
}