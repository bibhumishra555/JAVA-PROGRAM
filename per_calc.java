/* write a program to calculate the percentage of the exam and could must be take
 input the number of subject and the marks of each subject*/

//by: syntax_savvy_ , on 21-april-2024

import java.util.Scanner;
public class per_calc {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter the number of subject : ");
        int subject = input.nextInt();//taking input of subject
        System.out.print("Enter the marks for each subject : ");
        int marks = input.nextInt();//taking input of marks for each subject
        float[] arr_subject = new float[subject];
        //taking input of marks for each subject
        for (int n = 0; n < subject ; n++){
            System.out.print("Enter the marks for subject "+(n+1)+" : ");
            arr_subject[n] = input.nextFloat();
        }
        //calculaton for total marks
        float total = 0;
        for (int n = 0 ; n < subject ; n++){
            total += arr_subject[n];
        }
        //calculation for percentage
        float percente = (total*100)/(subject*marks);
        System.out.println("your total marks in this exam is "+total+" .");
        System.out.println("you got "+percente+" % in your exam.");
    }
}