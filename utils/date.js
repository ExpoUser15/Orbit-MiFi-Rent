const formattedDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
}

const finishDate = (planTime) => {
    const currentDate = new Date();
    const dateRange = new Date(currentDate.getTime() + (planTime * 24 * 60 * 60 * 1000));

    const year = dateRange.getFullYear();
    const month = `0${dateRange.getMonth() + 1}`.slice(-2);
    const day = `0${dateRange.getDate()}`.slice(-2);

    const finishDate = `${year}-${month}-${day}`;

    return finishDate;
}

module.exports = {formattedDate, finishDate};