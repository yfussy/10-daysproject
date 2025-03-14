import { deltaTime } from "../frontend/scripts/utils/timeManager.js";

export class Clock {
    day;
    sleepTime;
    sleepDuration;
    wakeTime;
    travelDuration;
    appointmentTime;

    constructor(day, sleepDuration, travelDuration, appointmentTime) {
        this.day = day;
        this.sleepDuration = sleepDuration;
        this.travelDuration = travelDuration;
        this.appointmentTime = appointmentTime;

        this.wakeTime = deltaTime(appointmentTime, -travelDuration);
        this.sleepTime = deltaTime(this.wakeTime, - sleepDuration);
    }
}
