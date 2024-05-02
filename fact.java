//WRITE THE PROGRAM IN JAVA TO CALCULATE THE FACTORIAL
//BU: BIBHU MISHRA   DATE : 2/MAY/2024
import java.util.Scanner;

public class fact {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = scanner.nextInt();

        // Check if the number is negative
        if(num < 0) {
            System.out.println("Factorial cannot be calculated for negative numbers.");
        } else {
            System.out.println("Factorial of " + num + " is " + factorial(num));
        }

        scanner.close();
    }

    public static int factorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}