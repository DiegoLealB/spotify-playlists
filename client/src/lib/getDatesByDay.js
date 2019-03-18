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
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        }]
    }

    return datesObj;
}

export default getDatesByDay;

// 4055224037 Laurine State of Oklahome treasury