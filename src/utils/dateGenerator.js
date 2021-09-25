function dataGenerator() {
    const date = new Date();
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = date.getHours();
    const minute = pad(date.getMinutes());
    const seconds = pad(date.getSeconds())

    return `${year}${month}${day}-${hour}${minute}${seconds}-validated`
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

export default dataGenerator