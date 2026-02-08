---
title: "典型90問-012"
createdAt: 2026-02-08
contest: "typical90"
problem: "典型90問-012"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_l"
---

## 問題概要

高さ `H`、幅 `W` のグリッドがあり、最初はすべて白いマスである。  
クエリが `Q` 個与えられ、次の 2 種類を処理する。

- `1 r c`：マス `(r, c)` を赤く塗る。
- `2 ra ca rb cb`：マス `(ra, ca)` と `(rb, cb)` がどちらも赤く、かつ赤いマス同士が上下左右の移動のみで到達可能（同一連結成分）なら `Yes`、そうでなければ `No` を出力する。

---

## 解法

赤いマスの「連結しているか」だけを判定できればよいので、連結成分管理に **DSU（Union-Find）** を用いる。

- 各マスを 1 次元の番号に変換して DSU の要素として扱う。
- クエリ `1` でマスを赤くしたら、上下左右の隣接マスのうち「すでに赤い」ものと `union` する。
- クエリ `2` では、両方のマスが赤いことを確認したうえで、`find` が一致するか（同じ連結成分か）で判定する。

`find` は経路圧縮を行うため再帰で書くことが多いが、やっていることは「根までたどって根を返し、途中の親を根に付け替える」処理である。

---

## 実装例

```python
H, W = map(int, input().split())
Q = int(input())

N = H * W
parent = [i for i in range(N)]
size = [1] * N
red = [False] * N

# 1次元に直す関数（1-indexed の (r,c) を 0-indexed の頂点番号へ）
def idx(r, c):
    return W * (r - 1) + (c - 1)

def find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    a = find(a)
    b = find(b)
    if a == b:
        return
    if size[a] < size[b]:
        a, b = b, a
    parent[b] = a
    size[a] += size[b]

dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]

for _ in range(Q):
    t, *rest = map(int, input().split())
    if t == 1:
        r, c = rest
        v = idx(r, c)
        if red[v]:
            continue  # すでに赤なら何もしない（安全のため）
        red[v] = True
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 1 <= nr <= H and 1 <= nc <= W:
                u = idx(nr, nc)
                if red[u]:
                    union(v, u)
    else:
        ra, ca, rb, cb = rest
        a = idx(ra, ca)
        b = idx(rb, cb)
        if red[a] and red[b] and find(a) == find(b):
            print("Yes")
        else:
            print("No")
