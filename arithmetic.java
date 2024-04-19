
/*write a program to calculate an arithmetic progression*/
//by: syntax_savvy_ , on 19-april-2024


import java.util.Scanner;

public class arithmetic {
    void foran()//method for the last term
    {
        Scanner input = new Scanner(System.in);
        try {
            System.out.print("Enter the first term (a) : ");
            float a = input.nextFloat();
            System.out.print("Enter the term interval (d) : ");
            float d = input.nextFloat();
            System.out.print("Enter the value of n (an) : ");
            float n = input.nextFloat();
            float an = a + (n - 1) * d;
            System.out.println("Your last term is " + an + ".");
        } catch (Exception e) {
            System.out.println("Invalid input. Please enter valid numeric values.");
        } finally {
            input.close();
        }
    }

    void forcd()//method of common diffrence
    {
        Scanner input = new Scanner(System.in);
        try {
            System.out.print("Enter the first term : ");
            float a1 = input.nextFloat();
            System.out.print("Enter the last term : ");
            float an = input.nextFloat();
            System.out.print("Enter the total number of terms : ");
            float n = input.nextFloat();
            float cd = (an - a1) / (n - 1);
            System.out.println("The common difference is : " + cd + ".");
        } catch (Exception e) {
            System.out.println("Invalid input. Please enter valid numeric values.");
        } finally {
            input.close();
        }
    }

    void forn()//method for total number of terms
    {
        Scanner input = new Scanner(System.in);
        try {
            System.out.print("Enter the first term : ");
            float a1 = input.nextFloat();
            System.out.print("Enter the last term : ");
            float an = input.nextFloat();
            System.out.print("Enter the common difference : ");
            float cd = input.nextFloat();
            float n = ((an - a1) / (cd)) + 1;
            System.out.println("The number of terms is : " + n + ".");
        } catch (Exception e) {
            System.out.println("Invalid input. Please enter valid numeric values.");
        } finally {
            input.close();
        }
    }

    public static void main(String[] args) {
        arithmetic arithmetic = new arithmetic();
        Scanner input = new Scanner(System.in);
        try {
            System.out.println("1. Last term.");
            System.out.println("2. Common difference.");
            System.out.println("3. Number of terms.");
            int sl = input.nextInt();
            switch (sl) {
                case 1:
                    arithmetic.foran();
                    break;
                case 2:
                    arithmetic.forcd();
                    break;
                case 3:
                    arithmetic.forn();
                    break;
                default:
                    System.out.println("     OPPS!!!!");
                    System.out.println("INVALID PARAMETERS");
            }
        } catch (Exception e) {
            System.out.println("Invalid input. Please enter a valid option.");
        } finally {
            input.close();
        }
    }
}

