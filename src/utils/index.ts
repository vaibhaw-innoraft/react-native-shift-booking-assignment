import moment from "moment";

export function groupBy<T>(key: string, arr: T[]): { area: string, shifts: T[] }[] {
    return arr.reduce((storage, item) => {
        const a = storage.find(g => g.area === item[key]);
        if (a) { a.shifts.push(item); }
        else { storage.push({ area: item[key], shifts: [item] }); }
        return storage;
    }, [] as { area: string, shifts: T[] }[]);
};
export function groupByDate<T>(key: string, arr: T[]): { title: string, data: T[] }[] {
    return arr.reduce((storage, item) => {
        const a = storage.find(g => moment(g.title).format('DD-MM-YYYY') === moment(item[key]).format('DD-MM-YYYY'));
        if (a) { a.data.push(item); }
        else { storage.push({ title: item[key], data: [item] }); }
        return storage;
    }, [] as { title: string, data: T[] }[]);
};
// call this function, passing-in your date
export function dateToFromNowDaily( myDate ) {

    // get from-now for this date
    var fromNow = moment(myDate).format('MMM DD');

    // ensure the date is displayed with today and yesterday
    return moment( myDate ).calendar( null, {
        // when the date is closer, specify custom values
        lastWeek: 'MMMM DD',
        lastDay:  'MMMM DD',
        sameDay:  '[Today]',
        nextDay:  '[Tomorrow]',
        nextWeek: 'MMMM DD',
        // when the date is further away, use from-now functionality             
        sameElse: 'MMMM DD'
        // sameElse: function () {
        //     return "[" + fromNow + "]";
        // }
    });
}