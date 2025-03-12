export const sleepTimeList = Array.from({length:5}, (_,i) => (i + 1)* 90); // [1:30, 3:00, 4:30, 6:00, 7:00]

export function getFormattedHours(totalMins) {
    const hr = Math.floor(totalMins / 60);
    const min = totalMins % 60;
    return `${hr}:${min.toString().padStart(2, '0')}`;
}

export function addTime(hm1, hm2) {
    const [hr1,min1] = hm1.split(':').map(Number);
    const [hr2,min2] = hm2.split(':').map(Number);

    const totalMins1 = hr1 * 60 + min1;
    const totalMins2 = hr2 * 60 + min2;

    let totalMins = (totalMins1 + totalMins2) % (24 * 60);
    return this.getFormattedHours(totalMins);
}