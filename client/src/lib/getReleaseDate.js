function getReleaseDate(tracksArr) {
    const dates = tracksArr.map(track => {
        return new Date(track.track.album.release_date);
    });

    let releaseDatesByYear = dates.map(date => {
        return date.toString().split(' ')[3];
    });

    releaseDatesByYear = releaseDatesByYear.sort();

    const startYear = releaseDatesByYear[0];
    const endYear = releaseDatesByYear[releaseDatesByYear.length - 1];
    const diff = endYear - startYear;
    let yearsArr = [];

    for (let i = 0; i < diff + 1; i++) {
        yearsArr.push(Number(startYear) + i);
    }
    
    const namesArr = tracksArr.map(track => {
        return track.track.name;
    });

    const releaseDatesObj = {
        labels: namesArr,
        datasets: [{
            label: 'Tracks by release date',
            data: releaseDatesByYear,
        }],
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'Tracks release date',
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    ticks: {
                        min: yearsArr[0],
                        max: yearsArr[yearsArr.length - 1],
                    }
                }]
            }
        }
    }

    return releaseDatesObj;
}

export default getReleaseDate;
