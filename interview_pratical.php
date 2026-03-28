 <?php

// 1. Array Manipulation (Basic)
// Given an array of integers, return a new array with only the even numbers.
$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 2. String Manipulation
// Reverse a given string.
$string = "hello world";

// 3. Object/Array Mapping
// Given an array of user objects, extract only their emails.
$users = [
    ["name" => "Alice", "email" => "[EMAIL_ADDRESS]"],
    ["name" => "Bob", "email" => "[EMAIL_ADDRESS]"],
    ["name" => "Charlie", "email" => "[EMAIL_ADDRESS]"]
];

// 4. Simple Algorithm (FizzBuzz)
// Write a function that prints numbers from 1 to 100.
// But for multiples of 3 print "Fizz", for multiples of 5 print "Buzz",
// and for multiples of both print "FizzBuzz".

// 5. Data Structure (Hash Map / Associative Array)
// Given a string, count the frequency of each character.
$text = "programming";

// 6. Functional Programming Concept
// Calculate the sum of all numbers in an array using a functional approach (e.g., array_reduce).
$numbers2 = [10, 20, 30, 40];

// 7. Basic OOP
// Create a simple class 'Car' with properties 'make' and 'model', and a method 'displayInfo'.

// 8. Array Filtering
// Given an array of numbers, filter out all numbers greater than 50.
$scores = [10, 60, 30, 90, 45, 80];

// 9. Array Search
// Check if a specific value exists in an array.
$items = ["apple", "banana", "orange", "mango"];
$target = "banana";

// 10. Recursive Thinking (Optional Challenge)
// Write a function to calculate the factorial of a number recursively.
$n = 5;

// --- Solutions Below ---

// 1. Even Numbers
echo "1. Even Numbers:\n";
$evens = array_filter($numbers, function($n) {
    return $n % 2 == 0;
});
print_r($evens);

// 2. Reverse String
echo "\n2. Reverse String:\n";
echo strrev($string);

// 3. Extract Emails
echo "\n3. Extract Emails:\n";
$emails = array_column($users, 'email');
print_r($emails);

// 4. FizzBuzz
echo "\n4. FizzBuzz:\n";
for ($i = 1; $i <= 100; $i++) {
    if ($i % 15 == 0) echo "FizzBuzz\n";
    elseif ($i % 3 == 0) echo "Fizz\n";
    elseif ($i % 5 == 0) echo "Buzz\n";
    else echo $i . "\n";
}

// 5. Character Frequency
echo "\n5. Character Frequency:\n";
$freq = array_count_values(str_split($text));
print_r($freq);

// 6. Array Reduce (Sum)
echo "\n6. Array Reduce (Sum):\n";
$sum = array_reduce($numbers2, function($carry, $item) {
    return $carry + $item;
}, 0);
echo $sum;

// 7. Simple Class
echo "\n7. Simple Class:\n";
class Car {
    public $make;
    public $model;
    
    public function __construct($make, $model) {
        $this->make = $make;
        $this->model = $model;
    }
    
    public function displayInfo() {
        echo "Make: " . $this->make . ", Model: " . $this->model . "\n";
    }
}
$myCar = new Car("Toyota", "Camry");
$myCar->displayInfo();

// 8. Filter Array
echo "\n8. Filter Array ( > 50):\n";
$filteredScores = array_filter($scores, function($s) {
    return $s > 50;
});
print_r($filteredScores);

// 9. Check Existence
echo "\n9. Check Existence:\n";
if (in_array($target, $items)) {
    echo "Found '" . $target . "' in the array.\n";
} else {
    echo "'" . $target . "' not found.\n";
}

// 10. Factorial (Recursive)
echo "\n10. Factorial (Recursive):\n";
function factorial($n) {
    if ($n <= 1) return 1;
    return $n * factorial($n - 1);
}
echo factorial($n);

?>