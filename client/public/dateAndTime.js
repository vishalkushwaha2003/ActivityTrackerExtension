

const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1; // Months are zero-based, so add 1
const day = now.getDate();
const hours1 = now.getHours();
const minutes1 = now.getMinutes();
const seconds1 = now.getSeconds();
const totalMinutes=hours1*60+minutes1;
const date=`${day}:${month}:${year}`
console.log(totalMinutes);
console.log(date)


