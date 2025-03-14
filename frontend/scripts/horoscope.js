function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

function randomMongkolKalakini() {
    const randomMongkol = randomColor();
    let randomKalakini = randomColor();
    while (randomMongkol === randomKalakini) {
        randomKalakini = randomColor();
    }
    return randomMongkol, randomKalakini; 
}

function randomMongkolNum() {
    return Math.floor(Math.random() * 59);
}