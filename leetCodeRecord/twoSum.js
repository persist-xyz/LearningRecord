/**
 * 2019/03/20
 * 两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
    你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * @param {*} arrs 
 * @param {*} target 
 */
var twoSum1 = function(arrs, target) {
    for (var i = 0; i <= arrs.length; i++) {
        for (var j = 0; j <= arrs.length, j < i; j++) {
            if (arrs[i] + arrs[j] == target) {
                return [i, j]
            }
        }
    }
}


var twoSum2 = function(arrs, target) {
    let preMap = new Map()
}


console.log(twoSum2([2,11,15,7], 9))

