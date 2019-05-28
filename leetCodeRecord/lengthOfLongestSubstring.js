/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param {*} s 
 * 输入: "pwwkew"
   输出: 3
   解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
   请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */
var lengthOfLongestSubstring = function(s) {
    let num = 0
    s = s.join()
    for (var i = 0; i < s.length; i++) {
        if (s[i] !== s[i+1]) {
            num++
        } else {
            num = 1
        }
    }
    return num
};

lengthOfLongestSubstring('pwwkew')