let allData =[];
d3.json("http://127.0.0.1:9500/").then(apiData => {
    allData = apiData;
    // Print fetched data to console
    console.log("Data", allData);

    let dataHDI = allData.hdi.filter(function(country) {return country.id === "USA"})
    let dataIHDI = allData.ihdi.filter(function(country) {return country.id === "USA"})
    let dataGII = allData.gii.filter(function(country) {return country.id === "USA"})

    let USAHDI = dataHDI[0]
    let USAIHDI = dataIHDI[0]
    let USAGII = dataGII[0]
    
    const hdiText = document.getElementById('hdi');
    hdiText.innerHTML = USAHDI.hdi_2021;


    const ctx = document.getElementById('myChart');
    

    
    new Chart (ctx, {
        type: 'line',

        data: {
            labels: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
            datasets: [{
                label: 'HDI Trends',
                data: [USAHDI.hdi_2011, USAHDI.hdi_2012, USAHDI.hdi_2013, USAHDI.hdi_2014, USAHDI.hdi_2015, USAHDI.hdi_2016, USAHDI.hdi_2017, USAHDI.hdi_2018, USAHDI.hdi_2019, USAHDI.hdi_2020, USAHDI.hdi_2021],
                borderColor: 'red',
                borderWidth: 1,
                backgroundColor: 'red',
                fill: false
                },
                {
                    label: 'IHDI Trends',
                    data: [USAIHDI.ihdi_2011, USAIHDI.ihdi_2012, USAIHDI.ihdi_2013, USAIHDI.ihdi_2014, USAIHDI.ihdi_2015, USAIHDI.ihdi_2016, USAIHDI.ihdi_2017, USAIHDI.ihdi_2018, USAIHDI.ihdi_2019, USAIHDI.ihdi_2020, USAIHDI.ihdi_2021],
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



});