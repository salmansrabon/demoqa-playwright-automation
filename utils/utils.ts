export function generateRandomNumber(min:number,max:number){
    return (Math.floor(Math.random()*(max-min)+min)); 
}

console.log(generateRandomNumber(1111,9999))

