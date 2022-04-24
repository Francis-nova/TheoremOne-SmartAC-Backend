// access token generator
export const tokenGenerator = (length: number = 250): string => {
    const randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

export const convertDateTimeToMysql = (dateValue: string): string => {
    const date = new Date(dateValue);
    const myDate = date.toISOString().replace('T', ' ');
    const mysqlDateString = myDate.substring(0, myDate.length - 5);
    return mysqlDateString;
}