import java.util.Scanner;

public class PalindromeChecker {

    // Function to check if a string is a palindrome
    public static boolean isPalindrome(String str) {
        // Convert the string to lowercase to handle case-insensitive comparison
        str = str.toLowerCase();

        // Initialize pointers for the start and end of the string
        int left = 0;
        int right = str.length() - 1;

        // Iterate until the pointers meet in the middle
        while (left < right) {
            // Skip non-alphanumeric characters from the left
            while (left < right && !Character.isLetterOrDigit(str.charAt(left))) {
                left++;
            }
            // Skip non-alphanumeric characters from the right
            while (left < right && !Character.isLetterOrDigit(str.charAt(right))) {
                right--;
            }
            // Compare characters at the pointers
            if (str.charAt(left) != str.charAt(right)) {
                return false; // If characters don't match, it's not a palindrome
            }
            // Move pointers towards the middle
            left++;
            right--;
        }
        return true; // If the loop completes without returning false, it's a palindrome
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();
        scanner.close();

        // Check if the input string is a palindrome
        if (isPalindrome(input)) {
            System.out.println("The string \"" + input + "\" is a palindrome.");
        } else {
            System.out.println("The string \"" + input + "\" is not a palindrome.");
        }
    }
}
