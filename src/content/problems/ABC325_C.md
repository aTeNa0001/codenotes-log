---
title: "ABC325-C"
createdAt: 2026-02-08
contest: "ABC"
problem: "ABC325-C"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/abc325/tasks/abc325_c"
---

## 問題概要

`H` 行 `W` 列のグリッドが与えられる。各マス `(i, j)` には、文字列 `S_i` の `j` 文字目が `#` のとき（かつそのときに限り）センサが置かれている。

センサは、上下左右斜めに隣接している（`max(|x-x'|, |y-y'|) = 1` を満たす）他のセンサと連動し、連動関係は推移的に広がる（A と B が連動し、A と C が連動しているなら、B と C も連動する）。

連動するセンサを 1 つのセンサとみなしたときの個数を求める。

---

## 解法

解き方はいろいろあるが、今回は **DSU（Union-Find）** で解く。

- `#` があるマスを頂点とみなし、8 近傍（上下左右＋斜め）で隣接する `#` 同士を同じ連結成分としてまとめる。
- 最終的に `#` のあるマスの根（代表）を集合に入れ、その種類数が答えになる。

実装では、グリッドを左上から走査する都合上、重複して `union` しないように「すでに見た側」だけ（左・左上・上・右上の 4 方向）を確認して結合している。

---

## 実装例

```python
H, W = map(int, input().split())
N = H * W
S = [input().strip() for _ in range(H)]

parent = list(range(N))
size = [1] * N

def idx(a, b):
    return a * W + b

def find(a):
    if parent[a] == a:
        return a
    parent[a] = find(parent[a])
    return parent[a]

def union(a, b):
    a = find(a)
    b = find(b)
    if a == b:
        return
    if size[a] < size[b]:
        a, b = b, a
    parent[b] = a
    size[a] += size[b]

# 走査順（上→下、左→右）で「すでに見た側」だけを確認する
dirs = [(0, -1), (-1, -1), (-1, 0), (-1, 1)]

for h in range(H):
    for w in range(W):
        if S[h][w] == '#':
            v = idx(h, w)
            for dh, dw in dirs:
                y = h + dh
                x = w + dw
                if 0 <= y < H and 0 <= x < W and S[y][x] == '#':
                    u = idx(y, x)
                    union(u, v)

roots = set()
for h in range(H):
    for w in range(W):
        if S[h][w] == '#':
            roots.add(find(idx(h, w)))

print(len(roots))
