---
title: "典型90問-010"
createdAt: 2026-02-07
contest: "typical90"
problem: "典型90問-010"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_j"
---

## 問題概要

`N` 人の生徒がおり、生徒 `i` について  
- クラス番号（1 または 2）
- 点数  

が与えられます。  

その後、`Q` 個のクエリが与えられ、各クエリでは区間 `[L, R]`（1-indexed）が指定されます。  
各クエリごとに、**生徒 `L` 番目から `R` 番目まで**の中で、

- クラス 1 の点数の合計
- クラス 2 の点数の合計  

をそれぞれ求めて出力します。

---

## 解法

累積和を用いる。  
一般的に累積和はバグ対策で **0 スタート**になる。  
読み込みながら、累積和を作ったほうがいい。  
0-index と 1-index が混在してしまうので注意。

### 考え方の補足

クラス 1 用とクラス 2 用に **2 本の累積和配列**を用意します。

- `c1[i]` : 生徒 `1` ～ `i` 番目までに含まれる **クラス1の点数の合計**
- `c2[i]` : 生徒 `1` ～ `i` 番目までに含まれる **クラス2の点数の合計**

こうしておくと、区間 `[L, R]` に対する答えは

- クラス1: `c1[R] - c1[L-1]`
- クラス2: `c2[R] - c2[L-1]`

で一瞬で求まります。  
各クエリを O(1) で処理できるため、全体計算量は `O(N + Q)` です。

---

## 実装例

```python
N = int(input())
students = []  # 0-index
for _ in range(N):
    students.append(list(map(int, input().split())))

Q = int(input())
questions = []
for _ in range(Q):
    L, R = map(int, input().split())
    questions.append([L, R])

# 累積和（1-index）
c1 = [0]  # クラス1の累積和
c2 = [0]  # クラス2の累積和

for i in range(N):
    if students[i][0] == 1:
        c1.append(c1[-1] + students[i][1])
        c2.append(c2[-1])
    else:
        c1.append(c1[-1])
        c2.append(c2[-1] + students[i][1])

for j in range(Q):
    L = questions[j][0]
    R = questions[j][1]
    sum1 = c1[R] - c1[L - 1]
    sum2 = c2[R] - c2[L - 1]
    print(sum1, sum2)  # 自動でスペースを入れてくれる
