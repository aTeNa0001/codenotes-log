---
title: "典型90問-007"
createdAt: 2026-02-07
contest: "typical90"
problem: "007"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_g"
---

## 問題概要
生徒の能力値 `B` が Q 個与えられる。
各 `B` について、クラスの能力値配列 `A`（N 個）の中から  
**差の絶対値が最小となる値**を出力する問題。

---

## 解法
どうやっても、出力のためには **Q 回の for 文**が必須になる。  
しかし、各クエリごとに `A` を全部見ると **O(QN)** になり、制約的に確実に TLE する。

なので、それぞれの生徒（各クエリ `B`）について **O(N) 未満**で最小値を求めなくてはならない。

この場合、`A`（N 個のクラス）を一度ソートしておけば、二分探索が使える。  
二分探索を使えば、各 `B` に対して **O(log N)** で「近い値」を探せる。

やりたいことは次の通り：

- 配列 `A` をあらかじめソートする
- 各 `B` について、`B` を挿入できる位置 `j`（= `lower_bound`）を二分探索で求める
- `B` に一番近い候補は、その周辺にあるはずなので  
  - `A[j]`（右側の候補）
  - `A[j-1]`（左側の候補）
  の **高々 2 つ**だけを見ればよい

※ `j` は `0` や `N` になり得るので、境界チェック（`j > 0`, `j < N`）が必要。

このとき、簡単にやるなら **`bisect_left`**（Python 標準ライブラリ）を使えばよい。  
使わないなら、下の実装例のように **二分探索を手書き**する。

二分探索を手書きでやるなら、停止条件に注意しよう。  
今回の `lower_bound` は「`left` と `right` のどちらかが必ず動いて範囲が縮む」形にするので、  
`left == right` を停止条件にできる。

また、中身（値）ではなく **インデックスの範囲**で二分探索をするのを忘れずに。

---

## 実装例（bisect を使う）
```python
from bisect import bisect_left

N = int(input())
A = list(map(int, input().split()))
Q = int(input())
B = [int(input()) for _ in range(Q)]

A.sort()
INF = 2**60

for b in B:
    j = bisect_left(A, b)

    res = INF
    if j < N:
        res = min(res, abs(b - A[j]))
    if j > 0:
        res = min(res, abs(b - A[j - 1]))
    print(res)
```


## 実装例（bisect を使わない）
```python
INF = 2**60

def lower_bound(arr, x):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < x:
            left = mid + 1
        else:
            right = mid
    return left

N = int(input())
A = sorted(map(int, input().split()))

Q = int(input())
for _ in range(Q):
    B = int(input())
    j = lower_bound(A, B)

    res = INF
    if j < N:
        res = min(res, abs(B - A[j]))
    if j > 0:
        res = min(res, abs(B - A[j - 1]))
    print(res)
```