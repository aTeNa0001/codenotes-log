---
title: "典型90問-022"
createdAt: 2026-02-09
contest: "typical90"
problem: "典型90問-022"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_v"
---

## 問題概要

3 つの正の整数 \(A, B, C\) が与えられる。  
縦・横・高さがそれぞれ \(A, B, C\) の直方体のケーキを、すべて同じ大きさの立方体に分割したい。

- 分割後の立方体の一辺の長さは整数とする  
- 分割のために行う「切断回数」の最小値を求める  

ここで、1 回の切断とは、ケーキを 1 つの平面で 2 つに分ける操作を指す。

---

## 解法

まず、3 辺すべてを割り切れる最大の一辺長を考えると、それは  
\( \gcd(A, B, C) \) になる。

- 一辺を \(g = \gcd(A, B, C)\) とする立方体に分割するのが最適
- 各方向について、分割回数は「個数 − 1」回になる  

そのため、

- \(A\) 方向: \(A / g - 1\) 回  
- \(B\) 方向: \(B / g - 1\) 回  
- \(C\) 方向: \(C / g - 1\) 回  

これらを合計すれば答えとなる。  
gcd で割ったあとに **1 を引くのを忘れない** 点に注意する。

---

## 実装例

```python
import math

A, B, C = map(int, input().split())

g = math.gcd(A, math.gcd(B, C))
total = 0
total += A // g - 1
total += B // g - 1
total += C // g - 1

print(total)
