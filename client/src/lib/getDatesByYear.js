import _ from 'lodash';

function getDatesByYear(tracksArr) {
    const dates = tracksArr.map(track => {
        return new Date(track.added_at);
    });

    const datesByYear = dates.map(date => {
        return Number(date.toString().split(' ')[3]);
    });

    const datesByYearCount = Object.values(_.countBy(datesByYear, Math.floor));

    const startYear = dates[0].toString().split(' ')[3];
    const endYear = dates[dates.length - 1].toString().split(' ')[3];
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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1,
        }],
    }

    return datesObj;
}

export default getDatesByYear;