import _ from 'lodash';

function getDatesByDay(tracksArr) {
    const dates = tracksArr.map(track => {
        return new Date(track.added_at);
    });

    const datesByDay = dates.map(date => {
        return date.toString().split(' ')[0];
    });

    const datesByDayObj = _.countBy(datesByDay);

    const daysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const tracksByDay = daysArr.map(day => {
        if (datesByDayObj[day]) {
            return datesByDayObj[day];
        } else {
            return 0;
        }
    });

    let datesObj = {
        labels: daysArr,
        datasets: [{
            label: '# of tracks',
            data: tracksByDay,
        }],
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'Tracks added per day of the week',
            },
        }
    }

    return datesObj;
}

export default getDatesByDay;
