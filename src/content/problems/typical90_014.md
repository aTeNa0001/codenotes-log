---
title: "典型90問-014"
createdAt: 2026-02-08
contest: "typical90"
problem: "典型90問-014"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_n"
---

## 問題概要

- 整数 \(N\) が与えられる。
- 長さ \(N\) の整数列 \(A\)、\(B\) がそれぞれ与えられる。
- \(A\) の各要素と \(B\) の各要素を 1 対 1 に対応付けたときの  
  \(\sum |A_i - B_j|\) の総和を考える。
- 対応のさせ方を自由に選べるとき、総和の最小値を求める。

---

## 解法

A と B は同数要素を持つため、それぞれを昇順にソートし、同じ順位同士を対応させればよい。  
このとき、各ペアの差の絶対値を足し合わせたものが最小値となる。

### 参考

もし `len(A) < len(B)` のように要素数が異なる場合は、この方法は使えず、DP など別の手法が必要になる。

---

## 実装例
```python
N = int(input())
A = list(map(int, input().split()))
B = list(map(int, input().split()))

A.sort()
B.sort()

total = 0
for i in range(N):
    total += abs(A[i] - B[i])

print(total)
