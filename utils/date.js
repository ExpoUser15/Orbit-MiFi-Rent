const formattedDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedDate;
}

const finishDate = (planTime) => {
    const currentDate = new Date();
    const dateRange = new Date(currentDate.getTime() + (planTime * 24 * 60 * 60 * 1000));

    const year = dateRange.getFullYear();
    const month = dateRange.getMonth() + 1;
    const day = dateRange.getDate();
    const hours = dateRange.getHours();
    const minutes = dateRange.getMinutes();
    const seconds = dateRange.getSeconds();

    const finishDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return finishDate;
}

module.exports = { formattedDate, finishDate };
