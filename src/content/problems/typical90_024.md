---
title: "典型90問-009"
createdAt: 2026-02-09
contest: "typical90"
problem: "典型90問-009"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_j"
---

## 問題概要

長さ \(N\) の整数列 \(A, B\) が与えられる。  
以下の操作を **ちょうど \(K\) 回** 行って、数列 \(A\) を数列 \(B\) に一致させられるかを判定する。

- 1 回の操作では、\(A\) のいずれか 1 要素を選び、その値を \(+1\) または \(-1\) する

一致させることが可能なら `Yes`、不可能なら `No` を出力する。

---

## 解法

各要素ごとに、\(A_i\) を \(B_i\) にするために必要な操作回数は  
\(|A_i - B_i|\) 回である。

- 必要な最小操作回数は  
  \[
  \sum_{i=1}^{N} |A_i - B_i|
  \]
- この値を `res` とする

判定条件は次の 2 つを同時に満たすこと。

1. \(K \ge res\)（操作回数が足りている）
2. \(K - res\) が偶数  
   - 余った操作は「+1 と -1」を打ち消す形で消費できるため

この条件を満たすかどうかで判定する。

---

## 実装例

```python
N, K = map(int, input().split())
A = list(map(int, input().split()))
B = list(map(int, input().split()))

res = 0
for i in range(N):
    res += abs(A[i] - B[i])

if K >= res and (K - res) % 2 == 0:
    print("Yes")
else:
    print("No")
