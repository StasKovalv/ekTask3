const getRandom = ({min, max}) =>  min + Math.floor(Math.random() * (max - min + 1));

const createArray = arraySize => {
    const array = [];
    for (let i = 0; i < arraySize; i++) {
        const arr = []
        array.push(arr)
        for(let j = 0; j < arraySize; j++)
        arr.push(getRandom({min: 0, max: 1}))
    }; 

    return array;
};

const getValue = (point, array) => {
    const {x, y} = point;

    return array[y][x]; 
};

const getPoints = array => {
    const intervalLength = array.length - 1;

    const getPointDumb = max => {
        const x = getRandom({min: 0, max})
        const y = getRandom({min: 0, max})
    
        return ({x, y})
    }; 

    

    let pointA = getPointDumb(intervalLength);
    let pointB = getPointDumb(intervalLength); 
    
    while(getValue(pointA, array) !== 0) {
        pointA = getPointDumb(intervalLength);
    }

    while(getValue(pointB, array) !== 0) {
        pointB = getPointDumb(intervalLength);
    }

    return ({pointA, pointB});
};

const isPathAvailable = (pointA, pointB, array) => {
    if(pointA.x === pointB.x && pointA.y === pointB.y) {
        return true;
    };

    const getSumHorizontal = (a, b, array) => {
        let sum = 0;
        const startIndex = a < b ? a : b;
        const endIndex = a > b ? a : b;

        for(let i = startIndex; i <= endIndex; i++) {
            sum += array[i];
        };

        return sum;
    };

    const getSumVertical = (a, b, column, array) => {
        let sum = 0;
        const startIndex = a < b ? a : b;
        const endIndex = a > b ? a : b;

        for(let i = startIndex; i <= endIndex; i++) {
            sum += array[column][i];
        };

        return sum;
    };
    
    if(pointA.y === pointB.y) { 
        const sum = getSumHorizontal(pointA.x, pointB.x, array[pointA.y]);

        return sum === 0;
    }; 

    if(pointA.x === pointB.x) {
        const sum = getSumVertical(pointA.y, pointB.y, pointA.x, field);

        return sum === 0;
    };
   
    const sumA = getSumHorizontal(pointA.x, pointB.x, array[pointB.y]) + getSumVertical(pointB.y, pointA.y, pointA.x, field);

    if(sumA === 0) return true;

    const sumB = getSumHorizontal(pointA.x, pointB.x, array[pointA.y]) + getSumVertical(pointA.y, pointB.y, pointB.x, field);

    if(sumB === 0) return true;

    return false;
};

const arraySize = getRandom({min: 5, max: 10});

const field = createArray(arraySize);

const {pointA, pointB} = getPoints(field);

const result = isPathAvailable(pointA, pointB, field);

console.log(field);
console.log(pointA, getValue(pointA, field));
console.log(pointB, getValue(pointB, field));
console.log(result);
