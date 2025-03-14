class Profile {
    age;
    birthDate;
    horoNum;
    horoColor;

    constructor(age, birthDate, horoNum, horoColor) {
        this.age = age;
        this.birthDate = birthDate;
        this.horoNum = horoNum;
        this.horoColor = horoColor;
    }
}

export function loadProfile(func) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        let profile = JSON.parse(xhr.response);
        // get profile based on username login

        console.log("Profile Loaded!");

        func();
    });

    xhr.addEventListener('error', (error) => {
        console.log('Unexpected error...');
    });

    xhr.open('GET', url);
    // url api from backend
    xhr.send();
}