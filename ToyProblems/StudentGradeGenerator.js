// Console module import 
const readline = require('readline');

// Create interface
const rl = readline.createInterface({
   // Standard input
   input: process.stdin,
   // Standard output
   output: process.stdout 
});

// Function to calculate students' grade marks 
function calculateStudentGrade(marks) {
    // Check if marks range between 0 to 100 and return grade
    if (marks > 79 && marks <= 100) {
        return 'A';
    } else if (marks >= 60 && marks <= 79) {
        return 'B';
    } else if (marks > 49 && marks <= 59) {
        return 'C';
    } else if (marks >= 40 && marks <= 49) {
        return 'D';
    } else if (marks < 40 && marks >= 0) {
        return 'E';
    } else {
        return 'Marks should range between 0 and 100';
    }
}

// Request user to input
rl.question('Enter your Marks: ', (input) => {
    // Actualize the number
    let marks = parseFloat(input);
    
    // Check for valid input
    if (!isNaN(marks)) {
        // Check if the number is between 0 to 100
        if (marks >= 0 && marks <= 100) {
            // Calculate grade
            let grade = calculateStudentGrade(marks);
            // Display result
            console.log(`Grade: ${grade}`);
        } else {
            console.log('Error: Marks should range between 0 and 100');
        }
    } else {
        console.log('Error: Invalid input. Please enter a valid number.');
    }

    // Close the readline interface
    rl.close();
});

