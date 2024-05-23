def add(x, y):
    return x + y
def subtract (x, y):
    return x - y
def multiply(x, y):
    return x * y
def divide (x, y):
    if y == 0:
        return "Error Dvision by Zero" 
    return x / y
def main():
    print("Entered main function")
    while True:
        try:
            num1 = float(input("Enter the first number: "))
            num2 = float(input("Enter the second number: "))
            print("Select operations:")
            print("1. Add")
            print("2. Subtract")
            print("3. Multiply")
            print("4. Divide")
            choice = input("Input choice (1/2/3/4): ")
            if choice == '1':
                print(f"The result is: {add(num1, num2)}")
            elif choice == '2':
                print(f"The result is: {subtract(num1, num2)}")
            elif choice == '3':
                print(f"The result is: {multiply(num1, num2)}")
            elif choice == '4':
                print (f"The result is: {divide(num1, num2)}")
            else:
                print("Invalide Number. Please input a number between 1 and 4.")
        except ValueError:
            print("Invalid input. Enter numeric values.")
        next_calculation = input("Need further culculations ? (yes/no):")
        if next_calculation.lower() != 'yes':
            break
if __name__== "__main__":
    main()