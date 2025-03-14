export const sleepTimeList = Array.from({length:5}, (_,i) => (i + 1)* 90); // [1:30, 3:00, 4:30, 6:00, 7:00]

export function getFormattedHours(totalMins) {
    const hr = Math.floor(totalMins / 60);
    const min = totalMins % 60;
    return `${hr}:${min.toString().padStart(2, '0')}`;
}

export function deltaTime(hm, minAdd) {
    const [hr,min] = hm.split(':').map(Number);

    let totalMins = hr * 60 + min + minAdd;

    totalMins = (totalMins + (24 * 60)) % (24 * 60);

    return getFormattedHours(totalMins);
}