// Console module import 
const readline = require('readline');

// Define income tax rates for 10%, 25%, 30%, and 35% 
const incomeTaxRates = [
    {min: 0, max: 24000, rate: 0.1 }, 
    {min: 24001, max: 32333, rate: 0.25 },
    { min: 32334, max: 500000, rate: 0.3 },
    {min: 500001, max: Infinity, rate: 0.35 },
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
function calculatePAYE(basicSalary) {
    let tax = 0;
    for (const taxTable of incomeTaxRates) {
        if (basicSalary > taxTable.max) {
            tax += (taxTable.max - taxTable.min) * taxTable.rate;
        } else {
            tax += (basicSalary - taxTable.min) * taxTable.rate;
            break;
        }
    }
    return tax;
}

// Function to calculate NHIF deductions based on salary 
function calculateNHIF(grossSalary){
    for (const rate of NHIFRates) {
        if (grossSalary >= rate.min && grossSalary <= rate.max) {
            return rate.deduction;
        }
    }
    return 0;
}

// Function to calculate NSSF deduction 
function calculateNSSF(basicSalary, tier) {
    const nssfRate = 0.06;
    return basicSalary * nssfRate;
}

// Function to calculate Net Salary 
function calculateNetSalary(basicSalary, benefits, tier) {
    const grossSalary = basicSalary + benefits;
    const payee = calculatePAYE(basicSalary);
    const nhifDeductions = calculateNHIF(grossSalary);
    const nssfDeductions = calculateNSSF(basicSalary, tier);
    const netSalary = grossSalary - payee - nhifDeductions - nssfDeductions; 
    return {
        grossSalary, 
        payee,
        nhifDeductions,
        nssfDeductions,
        netSalary
    };
}

// Function to getUserInput from the command line 
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

// Run the program 
async function run() {
    const basicSalary = await getUserInput("Enter basic salary: ");
    const benefits = await getUserInput("Enter benefits: ");
    const tier = await getUserInput("Enter NSSF Tier (I or II): ");
    const salaryDetails = calculateNetSalary(basicSalary, benefits, tier);
    console.log("Gross Salary:", salaryDetails.grossSalary.toFixed(0));
    console.log("PAYE (Tax):", salaryDetails.payee.toFixed(0));
    console.log("NHIF Deductions:", salaryDetails.nhifDeductions.toFixed(0));
    console.log("NSSF Deductions:", salaryDetails.nssfDeductions.toFixed(0));
    console.log("Net Salary:", salaryDetails.netSalary.toFixed(0));
}

// Run the program 
run();
