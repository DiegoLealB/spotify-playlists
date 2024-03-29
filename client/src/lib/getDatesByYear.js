import _ from 'lodash';

function getDatesByYear(tracksArr) {
    const dates = tracksArr.map(track => {
        return new Date(track.added_at);
    });
    
    let datesByYear = dates.map(date => {
        return Number(date.toString().split(' ')[3]);
    });

    datesByYear = datesByYear.sort();

    const datesByYearCount = Object.values(_.countBy(datesByYear, Math.floor));

    const startYear = datesByYear[0];
    const endYear = datesByYear[datesByYear.length - 1];
    const diff = endYear - startYear;
    let yearsArr = [];

    for (let i = 0; i < diff + 1; i++) {
        yearsArr.push(Number(startYear) + i);
    }

    let datesObj = {
        labels: yearsArr,
        datasets: [{
            label: '# of tracks',
            data: datesByYearCount,
        }],
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'Tracks added per year',
            },
        }
    }

    return datesObj;
}

export default getDatesByYear;