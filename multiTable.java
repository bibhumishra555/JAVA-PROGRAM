
//program to print the specific desired table using 1-D array
// on 10 may 2024               by: bibhu kumar mishra
import java.util.Scanner;
public class multiTable {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("entr the number : ");
        int x = input.nextInt();
        int product []= new int [10];
        for (int i = 0 ; i <= 10 ; i++){
            product [i] = x*(i+1);
            System.out.println(x+" * "+(i+1)+" = "+product[i]);
        }
    }
}