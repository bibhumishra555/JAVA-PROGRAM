/*write a program to check the entered number is integer number or not*/
import java.util.Scanner ;
public class IntOrNot {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("enter the number : ");
        if(input.hasNextInt()){
            System.out.println("entered number is integer");}
        else{
            System.out.println("entered number is not an integer");}
    }
}