let eventsArray = [
    {
        date: 'Mon Dec 17 2018',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },
    {
        date: 'Tue Jul 18 2019',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Jul 22 2019',
        venue: 'View Loungue',
        location: 'San Francisco, CA'
    },
    {
        date: 'Sat Aug 12 2019',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Sep 05 2019',
        venue: 'Moscow Center',
        location: 'San Francisco, CA'
    },
    {
        date: 'Wed Aug 11 2019',
        venue: 'Pres Club',
        location: 'San Francisco, CA'
    }        
];
function showAllEvents(abc){
    let unitSelect = document.querySelectorAll('.shows__unit');
    for (let i=0;i<unitSelect.length;i++){
        document.querySelectorAll('.shows__date')[i].innerHTML = abc[i].date;
        document.querySelectorAll('.shows__venue')[i].innerHTML = abc[i].venue;
        document.querySelectorAll('.shows__location')[i].innerHTML = abc[i].location;
    }
}
showAllEvents(eventsArray);