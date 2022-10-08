import Question from "./model/question-model.js"

export const seedQuestionDatabaseIfEmpty = async () => {
    try {
        const count = await Question.countDocuments({})
        if (count == 0) {
            console.log("Seeding question collection")
            await Question.insertMany(questionData)
            console.log("Done!")
        }
        return
    } catch (err) {
        console.log(err)
    }
}

const questionData = [{
    "title": "Two Sum",
    "difficulty": "easy",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n \n\nExample 1:\n\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nExample 2:\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\nExample 3:\n\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n\n \n\nConstraints:\n\n    2 <= nums.length <= 104\n    -109 <= nums[i] <= 109\n    -109 <= target <= 109\n    Only one valid answer exists.\n\n \nFollow-up: Can you come up with an algorithm that is less than O(n2) time complexity?",
    "link": "https://leetcode.com/problems/two-sum/"
}, {
    "title": "Palindrome Number",
    "difficulty": "easy",
    "description": "Given an integer x, return true if x is palindrome integer.\n\nAn integer is a palindrome when it reads the same backward as forward.\n\n    For example, 121 is a palindrome while 123 is not.\n\n \n\nExample 1:\n\nInput: x = 121\nOutput: true\nExplanation: 121 reads as 121 from left to right and from right to left.\n\nExample 2:\n\nInput: x = -121\nOutput: false\nExplanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.\n\nExample 3:\n\nInput: x = 10\nOutput: false\nExplanation: Reads 01 from right to left. Therefore it is not a palindrome.\n\n \n\nConstraints:\n\n    -231 <= x <= 231 - 1\n\n \nFollow up: Could you solve it without converting the integer to a string?",
    "link": "https://leetcode.com/problems/palindrome-number/"
}, {
    "title": "Roman to Integer",
    "difficulty": "easy",
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\n    I can be placed before V (5) and X (10) to make 4 and 9. \n    X can be placed before L (50) and C (100) to make 40 and 90. \n    C can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.\n\n \n\nExample 1:\n\nInput: s = \"III\"\nOutput: 3\nExplanation: III = 3.\n\nExample 2:\n\nInput: s = \"LVIII\"\nOutput: 58\nExplanation: L = 50, V= 5, III = 3.\n\nExample 3:\n\nInput: s = \"MCMXCIV\"\nOutput: 1994\nExplanation: M = 1000, CM = 900, XC = 90 and IV = 4.\n\n \n\nConstraints:\n\n    1 <= s.length <= 15\n    s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\n    It is guaranteed that s is a valid roman numeral in the range [1, 3999].\n\n",
    "link": "https://leetcode.com/problems/roman-to-integer/"
}, {
    "title": "Longest Common Prefix",
    "difficulty": "easy",
    "description": "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \"\".\n\n \n\nExample 1:\n\nInput: strs = [\"flower\",\"flow\",\"flight\"]\nOutput: \"fl\"\n\nExample 2:\n\nInput: strs = [\"dog\",\"racecar\",\"car\"]\nOutput: \"\"\nExplanation: There is no common prefix among the input strings.\n\n \n\nConstraints:\n\n    1 <= strs.length <= 200\n    0 <= strs[i].length <= 200\n    strs[i] consists of only lowercase English letters.\n\n",
    "link": "https://leetcode.com/problems/longest-common-prefix/"
}, {
    "title": "Valid Parentheses",
    "difficulty": "easy",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n\n    Open brackets must be closed by the same type of brackets.\n    Open brackets must be closed in the correct order.\n    Every close bracket has a corresponding open bracket of the same type.\n\n \n\nExample 1:\n\nInput: s = \"()\"\nOutput: true\n\nExample 2:\n\nInput: s = \"()[]{}\"\nOutput: true\n\nExample 3:\n\nInput: s = \"(]\"\nOutput: false\n\n \n\nConstraints:\n\n    1 <= s.length <= 104\n    s consists of parentheses only '()[]{}'.\n\n",
    "link": "https://leetcode.com/problems/valid-parentheses/"
}, {
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "easy",
    "description": "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.\n\nSince it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.\n\nReturn k after placing the final result in the first k slots of nums.\n\nDo not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.\n\nCustom Judge:\n\nThe judge will test your solution with the following code:\n\nint[] nums = [...]; // Input array\nint[] expectedNums = [...]; // The expected answer with correct length\n\nint k = removeDuplicates(nums); // Calls your implementation\n\nassert k == expectedNums.length;\nfor (int i = 0; i < k; i++) {\n    assert nums[i] == expectedNums[i];\n}\n\nIf all assertions pass, then your solution will be accepted.\n\n \n\nExample 1:\n\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2,_]\nExplanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n\nExample 2:\n\nInput: nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5, nums = [0,1,2,3,4,_,_,_,_,_]\nExplanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n\n \n\nConstraints:\n\n    1 <= nums.length <= 3 * 104\n    -100 <= nums[i] <= 100\n    nums is sorted in non-decreasing order.\n\n",
    "link": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
}, {
    "title": "Remove Element",
    "difficulty": "easy",
    "description": "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The relative order of the elements may be changed.\n\nSince it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.\n\nReturn k after placing the final result in the first k slots of nums.\n\nDo not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.\n\nCustom Judge:\n\nThe judge will test your solution with the following code:\n\nint[] nums = [...]; // Input array\nint val = ...; // Value to remove\nint[] expectedNums = [...]; // The expected answer with correct length.\n                            // It is sorted with no values equaling val.\n\nint k = removeElement(nums, val); // Calls your implementation\n\nassert k == expectedNums.length;\nsort(nums, 0, k); // Sort the first k elements of nums\nfor (int i = 0; i < actualLength; i++) {\n    assert nums[i] == expectedNums[i];\n}\n\nIf all assertions pass, then your solution will be accepted.\n\n \n\nExample 1:\n\nInput: nums = [3,2,2,3], val = 3\nOutput: 2, nums = [2,2,_,_]\nExplanation: Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n\nExample 2:\n\nInput: nums = [0,1,2,2,3,0,4,2], val = 2\nOutput: 5, nums = [0,1,4,0,3,_,_,_]\nExplanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.\nNote that the five elements can be returned in any order.\nIt does not matter what you leave beyond the returned k (hence they are underscores).\n\n \n\nConstraints:\n\n    0 <= nums.length <= 100\n    0 <= nums[i] <= 50\n    0 <= val <= 100\n\n",
    "link": "https://leetcode.com/problems/remove-element/"
}, {
    "title": "Search Insert Position",
    "difficulty": "easy",
    "description": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n \n\nExample 1:\n\nInput: nums = [1,3,5,6], target = 5\nOutput: 2\n\nExample 2:\n\nInput: nums = [1,3,5,6], target = 2\nOutput: 1\n\nExample 3:\n\nInput: nums = [1,3,5,6], target = 7\nOutput: 4\n\n \n\nConstraints:\n\n    1 <= nums.length <= 104\n    -104 <= nums[i] <= 104\n    nums contains distinct values sorted in ascending order.\n    -104 <= target <= 104\n\n",
    "link": "https://leetcode.com/problems/search-insert-position/"
}, {
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "medium",
    "description": "Given a string s, find the length of the longest substring without repeating characters.\n\n \n\nExample 1:\n\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n\nExample 2:\n\nInput: s = \"bbbbb\"\nOutput: 1\nExplanation: The answer is \"b\", with the length of 1.\n\nExample 3:\n\nInput: s = \"pwwkew\"\nOutput: 3\nExplanation: The answer is \"wke\", with the length of 3.\nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring.\n\n \n\nConstraints:\n\n    0 <= s.length <= 5 * 104\n    s consists of English letters, digits, symbols and spaces.\n\n",
    "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
}, {
    "title": "Longest Palindromic Substring",
    "difficulty": "medium",
    "description": "Given a string s, return the longest palindromic substring in s.\n\nA string is called a palindrome string if the reverse of that string is the same as the original string.\n\n \n\nExample 1:\n\nInput: s = \"babad\"\nOutput: \"bab\"\nExplanation: \"aba\" is also a valid answer.\n\nExample 2:\n\nInput: s = \"cbbd\"\nOutput: \"bb\"\n\n \n\nConstraints:\n\n    1 <= s.length <= 1000\n    s consist of only digits and English letters.\n\n",
    "link": "https://leetcode.com/problems/longest-palindromic-substring/"
}, {
    "title": "Zigzag Conversion",
    "difficulty": "medium",
    "description": "The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)\n\nP   A   H   N\nA P L S I I G\nY   I   R\n\nAnd then read line by line: \"PAHNAPLSIIGYIR\"\n\nWrite the code that will take a string and make this conversion given a number of rows:\n\nstring convert(string s, int numRows);\n\n \n\nExample 1:\n\nInput: s = \"PAYPALISHIRING\", numRows = 3\nOutput: \"PAHNAPLSIIGYIR\"\n\nExample 2:\n\nInput: s = \"PAYPALISHIRING\", numRows = 4\nOutput: \"PINALSIGYAHRPI\"\nExplanation:\nP     I    N\nA   L S  I G\nY A   H R\nP     I\n\nExample 3:\n\nInput: s = \"A\", numRows = 1\nOutput: \"A\"\n\n \n\nConstraints:\n\n    1 <= s.length <= 1000\n    s consists of English letters (lower-case and upper-case), ',' and '.'.\n    1 <= numRows <= 1000\n\n",
    "link": "https://leetcode.com/problems/zigzag-conversion/"
}, {
    "title": "Reverse Integer",
    "difficulty": "medium",
    "description": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).\n\n \n\nExample 1:\n\nInput: x = 123\nOutput: 321\n\nExample 2:\n\nInput: x = -123\nOutput: -321\n\nExample 3:\n\nInput: x = 120\nOutput: 21\n\n \n\nConstraints:\n\n    -231 <= x <= 231 - 1\n\n",
    "link": "https://leetcode.com/problems/reverse-integer/"
}, {
    "title": "String to Integer (atoi)",
    "difficulty": "medium",
    "description": "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).\n\nThe algorithm for myAtoi(string s) is as follows:\n\n    Read in and ignore any leading whitespace.\n    Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.\n    Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.\n    Convert these digits into an integer (i.e. \"123\" -> 123, \"0032\" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).\n    If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.\n    Return the integer as the final result.\n\nNote:\n\n    Only the space character ' ' is considered a whitespace character.\n    Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.\n\n \n\nExample 1:\n\nInput: s = \"42\"\nOutput: 42\nExplanation: The underlined characters are what is read in, the caret is the current reader position.\nStep 1: \"42\" (no characters read because there is no leading whitespace)\n         ^\nStep 2: \"42\" (no characters read because there is neither a '-' nor '+')\n         ^\nStep 3: \"42\" (\"42\" is read in)\n           ^\nThe parsed integer is 42.\nSince 42 is in the range [-231, 231 - 1], the final result is 42.\n\nExample 2:\n\nInput: s = \"   -42\"\nOutput: -42\nExplanation:\nStep 1: \"   -42\" (leading whitespace is read and ignored)\n            ^\nStep 2: \"   -42\" ('-' is read, so the result should be negative)\n             ^\nStep 3: \"   -42\" (\"42\" is read in)\n               ^\nThe parsed integer is -42.\nSince -42 is in the range [-231, 231 - 1], the final result is -42.\n\nExample 3:\n\nInput: s = \"4193 with words\"\nOutput: 4193\nExplanation:\nStep 1: \"4193 with words\" (no characters read because there is no leading whitespace)\n         ^\nStep 2: \"4193 with words\" (no characters read because there is neither a '-' nor '+')\n         ^\nStep 3: \"4193 with words\" (\"4193\" is read in; reading stops because the next character is a non-digit)\n             ^\nThe parsed integer is 4193.\nSince 4193 is in the range [-231, 231 - 1], the final result is 4193.\n\n \n\nConstraints:\n\n    0 <= s.length <= 200\n    s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.\n\n",
    "link": "https://leetcode.com/problems/string-to-integer-atoi/"
}, {
    "title": "Integer to Roman",
    "difficulty": "medium",
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\n    I can be placed before V (5) and X (10) to make 4 and 9. \n    X can be placed before L (50) and C (100) to make 40 and 90. \n    C can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven an integer, convert it to a roman numeral.\n\n \n\nExample 1:\n\nInput: num = 3\nOutput: \"III\"\nExplanation: 3 is represented as 3 ones.\n\nExample 2:\n\nInput: num = 58\nOutput: \"LVIII\"\nExplanation: L = 50, V = 5, III = 3.\n\nExample 3:\n\nInput: num = 1994\nOutput: \"MCMXCIV\"\nExplanation: M = 1000, CM = 900, XC = 90 and IV = 4.\n\n \n\nConstraints:\n\n    1 <= num <= 3999\n\n",
    "link": "https://leetcode.com/problems/integer-to-roman/"
}, {
    "title": "Maximum Length of Repeated Subarray",
    "difficulty": "medium",
    "description": "Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.\n\n \n\nExample 1:\n\nInput: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]\nOutput: 3\nExplanation: The repeated subarray with maximum length is [3,2,1].\n\nExample 2:\n\nInput: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]\nOutput: 5\n\n \n\nConstraints:\n\n    1 <= nums1.length, nums2.length <= 1000\n    0 <= nums1[i], nums2[i] <= 100\n\n",
    "link": "https://leetcode.com/problems/maximum-length-of-repeated-subarray/"
}, {
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "medium",
    "description": "Given a string s, find the length of the longest substring without repeating characters.\n\n \n\nExample 1:\n\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n\nExample 2:\n\nInput: s = \"bbbbb\"\nOutput: 1\nExplanation: The answer is \"b\", with the length of 1.\n\nExample 3:\n\nInput: s = \"pwwkew\"\nOutput: 3\nExplanation: The answer is \"wke\", with the length of 3.\nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring.\n\n \n\nConstraints:\n\n    0 <= s.length <= 5 * 104\n    s consists of English letters, digits, symbols and spaces.\n\n",
    "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
}, {
    "title": "Median of Two Sorted Arrays",
    "difficulty": "hard",
    "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n \n\nExample 1:\n\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.\n\nExample 2:\n\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n\n \n\nConstraints:\n\n    nums1.length == m\n    nums2.length == n\n    0 <= m <= 1000\n    0 <= n <= 1000\n    1 <= m + n <= 2000\n    -106 <= nums1[i], nums2[i] <= 106\n\n",
    "link": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
}, {
    "title": "Regular Expression Matching",
    "difficulty": "hard",
    "description": "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n    '.' Matches any single character.​​​​\n    '*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).\n\n ",
    "link": "https://leetcode.com/problems/regular-expression-matching/"
}, {
    "title": "Merge k Sorted Lists",
    "difficulty": "hard",
    "description": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n \n\nExample 1:\n\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation: The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6\n\nExample 2:\n\nInput: lists = []\nOutput: []\n\nExample 3:\n\nInput: lists = [[]]\nOutput: []\n\n \n\nConstraints:\n\n    k == lists.length\n    0 <= k <= 104\n    0 <= lists[i].length <= 500\n    -104 <= lists[i][j] <= 104\n    lists[i] is sorted in ascending order.\n    The sum of lists[i].length will not exceed 104.\n\n",
    "link": "https://leetcode.com/problems/merge-k-sorted-lists/"
}, {
    "title": "Substring with Concatenation of All Words",
    "difficulty": "hard",
    "description": "You are given a string s and an array of strings words. All the strings of words are of the same length.\n\nA concatenated substring in s is a substring that contains all the strings of any permutation of words concatenated.\n\n    For example, if words = [\"ab\",\"cd\",\"ef\"], then \"abcdef\", \"abefcd\", \"cdabef\", \"cdefab\", \"efabcd\", and \"efcdab\" are all concatenated strings. \"acdbef\" is not a concatenated substring because it is not the concatenation of any permutation of words.\n\nReturn the starting indices of all the concatenated substrings in s. You can return the answer in any order.\n\n \n\nExample 1:\n\nInput: s = \"barfoothefoobarman\", words = [\"foo\",\"bar\"]\nOutput: [0,9]\nExplanation: Since words.length == 2 and words[i].length == 3, the concatenated substring has to be of length 6.\nThe substring starting at 0 is \"barfoo\". It is the concatenation of [\"bar\",\"foo\"] which is a permutation of words.\nThe substring starting at 9 is \"foobar\". It is the concatenation of [\"foo\",\"bar\"] which is a permutation of words.\nThe output order does not matter. Returning [9,0] is fine too.\n\nExample 2:\n\nInput: s = \"wordgoodgoodgoodbestword\", words = [\"word\",\"good\",\"best\",\"word\"]\nOutput: []\nExplanation: Since words.length == 4 and words[i].length == 4, the concatenated substring has to be of length 16.\nThere is no substring of length 16 is s that is equal to the concatenation of any permutation of words.\nWe return an empty array.\n\nExample 3:\n\nInput: s = \"barfoofoobarthefoobarman\", words = [\"bar\",\"foo\",\"the\"]\nOutput: [6,9,12]\nExplanation: Since words.length == 3 and words[i].length == 3, the concatenated substring has to be of length 9.\nThe substring starting at 6 is \"foobarthe\". It is the concatenation of [\"foo\",\"bar\",\"the\"] which is a permutation of words.\nThe substring starting at 9 is \"barthefoo\". It is the concatenation of [\"bar\",\"the\",\"foo\"] which is a permutation of words.\nThe substring starting at 12 is \"thefoobar\". It is the concatenation of [\"the\",\"foo\",\"bar\"] which is a permutation of words.\n\n \n\nConstraints:\n\n    1 <= s.length <= 104\n    1 <= words.length <= 5000\n    1 <= words[i].length <= 30\n    s and words[i] consist of lowercase English letters.\n\n",
    "link": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
}, {
    "title": "Longest Valid Parentheses",
    "difficulty": "hard",
    "description": "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.\n\n \n\nExample 1:\n\nInput: s = \"(()\"\nOutput: 2\nExplanation: The longest valid parentheses substring is \"()\".\n\nExample 2:\n\nInput: s = \")()())\"\nOutput: 4\nExplanation: The longest valid parentheses substring is \"()()\".\n\nExample 3:\n\nInput: s = \"\"\nOutput: 0\n\n \n\nConstraints:\n\n    0 <= s.length <= 3 * 104\n    s[i] is '(', or ')'.\n\n",
    "link": "https://leetcode.com/problems/longest-valid-parentheses/"
}, {
    "title": "First Missing Positive",
    "difficulty": "hard",
    "description": "Given an unsorted integer array nums, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in O(n) time and uses constant extra space.\n\n \n\nExample 1:\n\nInput: nums = [1,2,0]\nOutput: 3\nExplanation: The numbers in the range [1,2] are all in the array.\n\nExample 2:\n\nInput: nums = [3,4,-1,1]\nOutput: 2\nExplanation: 1 is in the array but 2 is missing.\n\nExample 3:\n\nInput: nums = [7,8,9,11,12]\nOutput: 1\nExplanation: The smallest positive integer 1 is missing.\n\n \n\nConstraints:\n\n    1 <= nums.length <= 105\n    -231 <= nums[i] <= 231 - 1\n\n",
    "link": "https://leetcode.com/problems/first-missing-positive/"
}, {
    "title": "Wildcard Matching",
    "difficulty": "hard",
    "description": "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:\n\n    '?' Matches any single character.\n    '*' Matches any sequence of characters (including the empty sequence).\n\nThe matching should cover the entire input string (not partial).\n\n \n\nExample 1:\n\nInput: s = \"aa\", p = \"a\"\nOutput: false\nExplanation: \"a\" does not match the entire string \"aa\".\n\nExample 2:\n\nInput: s = \"aa\", p = \"*\"\nOutput: true\nExplanation: '*' matches any sequence.\n\nExample 3:\n\nInput: s = \"cb\", p = \"?a\"\nOutput: false\nExplanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.\n\n \n\nConstraints:\n\n    0 <= s.length, p.length <= 2000\n    s contains only lowercase English letters.\n    p contains only lowercase English letters, '?' or '*'.\n\n",
    "link": "https://leetcode.com/problems/wildcard-matching/"
}, {
    "title": "Permutation Sequence",
    "difficulty": "hard",
    "description": "The set [1, 2, 3, ..., n] contains a total of n! unique permutations.\n\nBy listing and labeling all of the permutations in order, we get the following sequence for n = 3:\n\n    \"123\"\n    \"132\"\n    \"213\"\n    \"231\"\n    \"312\"\n    \"321\"\n\nGiven n and k, return the kth permutation sequence.\n\n \n\nExample 1:\n\nInput: n = 3, k = 3\nOutput: \"213\"\n\nExample 2:\n\nInput: n = 4, k = 9\nOutput: \"2314\"\n\nExample 3:\n\nInput: n = 3, k = 1\nOutput: \"123\"\n\n \n\nConstraints:\n\n    1 <= n <= 9\n    1 <= k <= n!\n\n",
    "link": "https://leetcode.com/problems/permutation-sequence/"
}]