export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}


export function formatTime(inputTime) {
    const time = new Date(inputTime);
    const options = { hour: 'numeric', minute: 'numeric' };
    return time.toLocaleTimeString('en-US', options);
}
