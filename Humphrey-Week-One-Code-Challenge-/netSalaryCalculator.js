const readline = require('readline');

// Define income tax rates
const incomeTaxRates = [
    { min: 0, max: 24000, rate: 0.1 }, 
    { min: 24001, max: 32333, rate: 0.25 },
    { min: 32334, max: 500000, rate: 0.3 },
    { min: 500001, max: 800000, rate: 0.325 },
    { min: 800001, max: Infinity, rate: 0.35 },
];

// Define NHIF rates and deductions 
const NHIFRates = [
    { min: 0, max: 5999, deduction: 150 },
    { min: 6000, max: 7999, deduction: 300 },
    { min: 8000, max: 11999, deduction: 400 },
    { min: 12000, max: 14999, deduction: 500 },
    { min: 15000, max: 19999, deduction: 600 },
    { min: 20000, max: 24999, deduction: 750 },
    { min: 25000, max: 29999, deduction: 850 },
    { min: 30000, max: 34999, deduction: 900 },
    { min: 35000, max: 39999, deduction: 950 }, 
    { min: 40000, max: 44999, deduction: 1000 },
    { min: 45000, max: 49999, deduction: 1100 },
    { min: 50000, max: 59999, deduction: 1200 },
    { min: 60000, max: 69999, deduction: 1300 },
    { min: 70000, max: 79999, deduction: 1400 },
    { min: 80000, max: 89999, deduction: 1500 },
    { min: 90000, max: 99999, deduction: 1600 },
    { min: 100000, max: Infinity, deduction: 1700 }
];

// Function to calculate PAYE tax
function calculatePAYE(grossSalary) {
    let tax = 0;
    for (const taxBracket of incomeTaxRates) {
        if (grossSalary >= taxBracket.min && grossSalary <= taxBracket.max) {
            tax = grossSalary * taxBracket.rate;
            break;
        }
    }
    return tax;
}

// Function to calculate NHIF deductions based on salary 
function calculateNHIF(grossSalary) {
    for (const rate of NHIFRates) {
        if (grossSalary >= rate.min && grossSalary <= rate.max) {
            return rate.deduction;
        }
    }
    return 0;
}

// Function to get user input for NSSF tier
async function getNSSFInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question("Enter NSSF Tier (I or II): ", answer => {
            rl.close();
            if (answer.toUpperCase() === 'I' || answer.toUpperCase() === 'II') {
                resolve(answer.toUpperCase());
            } else {
                console.log("Invalid input. Please enter either 'I' or 'II'.");
                resolve(getNSSFInput());
            }
        });
    });
}


// Function to calculate NSSF deductions based on tier
function calculateNSSF(grossSalary, tier) {
    const lowerLimit = 7000;
    const upperLimit = 36000;
    // 6% of the lower limit for Tier 1
    const tier1Contribution = 0.06 * lowerLimit;
    // 6% of the difference between upper and lower limits for Tier 2
    const tier2Contribution = 0.06 * (upperLimit - lowerLimit);
    const totalContribution = tier1Contribution + tier2Contribution;
    // Deduct the lower of 6% of gross salary or total contribution
    return Math.min(grossSalary * 0.06, totalContribution);
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits, tier) {
    const grossSalary = basicSalary + benefits;
    const payee = calculatePAYE(basicSalary);
    const nhifDeductions = calculateNHIF(grossSalary);
    const nssfDeductions = calculateNSSF(grossSalary, tier);
    const netSalary = grossSalary - payee - nhifDeductions - nssfDeductions;
    return {
        grossSalary,
        payee,
        nhifDeductions,
        nssfDeductions,
        netSalary
    };
}

// Function to get user input from command line
function getUserInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(parseFloat(answer));
        });
    });
}

// Function to round monetary values to two decimal places
function roundToTwoDecimalPlaces(value) {
    return Math.round(value * 100) / 100;
}

// Main function to run the program
async function run() {
    const basicSalary = await getUserInput("Enter basic salary: ");
    const benefits = await getUserInput("Enter benefits: ");
    const tier = await getNSSFInput(); // Prompt user for NSSF tier input
    const salaryDetails = calculateNetSalary(basicSalary, benefits, tier);
    console.log("Gross Salary:", salaryDetails.grossSalary);
    console.log("PAYE (Tax):", roundToTwoDecimalPlaces(salaryDetails.payee));
    console.log("NHIF Deductions:", roundToTwoDecimalPlaces(salaryDetails.nhifDeductions));
    console.log("NSSF Deductions:", roundToTwoDecimalPlaces(salaryDetails.nssfDeductions));
    console.log("Net Salary:", roundToTwoDecimalPlaces(salaryDetails.netSalary));
}

// Run the program
run();

