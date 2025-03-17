function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

function generateFortuneNum() {
    return Math.floor(Math.random() * 59);
}

function generateFortune() {
    const randomMongkol = randomColor();
    let randomKalakini = randomColor();
    while (randomMongkol === randomKalakini) {
        randomKalakini = randomColor();
    }

    return {
        color: {
            colorFortune: randomMongkol, 
            colorUnFortune: randomKalakini
        },
        number: generateFortuneNum()
        }; 
}

function getFormattedHours(totalMins) {
    const hr = Math.floor(totalMins / 60);
    const min = totalMins % 60;
    return `${hr}:${min.toString().padStart(2, '0')}`;
}

function deltaTime(hm, minAdd) {
    const [hr,min] = hm.split(':').map(Number);

    let totalMins = hr * 60 + min + minAdd;

    totalMins = (totalMins + (24 * 60)) % (24 * 60);

    return getFormattedHours(totalMins);
}

module.exports = {
    generateFortune,
    deltaTime
}