interface Math
{
    /*
    include min, exclude max
    */
    randomRangeInt(min: number, max:number): number;

    randomRangeFloat(min: number, max:number): number;
    
    fmod(x:number, y:number):number;
}

Math.randomRangeInt = function(min: number, max:number): number 
{
	let rand = Math.random();
	if (rand === 1) {
		rand -= Number.EPSILON;
	}
	return min + Math.floor(rand * (max - min));
}
Math.randomRangeFloat = function(min: number, max:number): number 
{
    return min + (Math.random() * (max - min));
}

Math.fmod = function(x:number, y:number):number
{
    let temp = Math.floor(x / y);
    return x - temp * y;
}