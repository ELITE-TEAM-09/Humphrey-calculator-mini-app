// Console module import
const readline = require ('readline');

//Create interface
const rl = readline.createInterface ({
    // Standard input
    input: process.stdin,
    // Standard output
    output: process.stdout
});

// Function to calculate demerit points on the recorded car speed 
function calculateDemeritPoints(speed) {
    //Speed Limit in km/h
    const speedLimit = 70;
    //Excess speed per demerit point in km/h
    const kmPerDemeritPoint = 5;
    //Points for License suspension
    const pointsSuspension = 12;

    // if the car speed is less or equal to the speed limit, return 0 points
    if (speed <= speedLimit) {
        return 0;
    }

    // Calculate the demerit points
    const excessSpeed = speed - speedLimit;
    const demeritPoints = Math.floor(excessSpeed / kmPerDemeritPoint);

    //Return the demerit points, but cap it at the suspension
    return Math.min(demeritPoints, pointsSuspension);

}

// Request user to input
rl.question('Enter the car speed (in km/h): ', (input) => {
    //Convert user input to a number
    const speed = parseFloat(input);

    //Check if the user input is a valid number
if (!isNaN(speed)) {
    //Calculate the demirit points
    const points = calculateDemeritPoints(speed);

    //Display results for no demerit points
    if (points === 0) {
        console.log ('Ok');
    // Demetit below point suspension    
    }else if (points <12){
        console.log(`points: ${points}`);
    //Demerit exceeding point suspension
    }else {
        console.log('License suspended');
    }
}else {
    console.log('Error: unrecognized input. Please input valid number.');
}

//Close the readline interface 
rl.close();

});
