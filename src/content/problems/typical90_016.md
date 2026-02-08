---
title: "典型90問-016"
createdAt: 2026-02-08
contest: "typical90"
problem: "典型90問-016"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_p"
---

## 問題概要
3 種類の整数 \(A,B,C\) が与えられる。  
\(A\) 円硬貨を \(i\) 枚、\(B\) 円硬貨を \(j\) 枚、\(C\) 円硬貨を \(k\) 枚使って合計をちょうど \(N\) 円にするとき、
\[
A i + B j + C k = N
\]
を満たす非負整数 \((i,j,k)\) のうち、\(i+j+k\) を最小化せよ。

---

## 解法
まず \(A\) 円硬貨の枚数 \(i\) を全探索する。  
すると残りは
\[
B j + C k = N - A i
\]
という 2 変数の一次不定方程式になる。

一次不定方程式 \(a x + b y = c\) が整数解をもつ条件は
\[
c \bmod \gcd(a,b) = 0
\]
である。これを前提として、拡張ユークリッドの互除法を用いる。

拡張ユークリッドの互除法により
\[
a u + b v = g \quad (g=\gcd(a,b))
\]
を満たす特殊解 \((u,v)\) を求められる。  
これを基に、\(a x + b y = c\)（\(g\mid c\)）の一般解は
\[
x = u\frac{c}{g} + t\frac{b}{g},\quad
y = v\frac{c}{g} - t\frac{a}{g}
\]
（\(t\) は任意整数）となる。

本問では \(x=j, y=k\) として、さらに \(j\ge0, k\ge0\) を満たす \(t\) の範囲を求め、端の候補だけを評価して
\(i+j+k\) の最小値を更新する。

---

## 実装例
```python
import math

N = int(input())
moneys = list(map(int, input().split()))
moneys.sort()
# A > B > C
A, B, C = moneys[2], moneys[1], moneys[0]

def ex_euclid(a, b):
    # returns (g, x, y) s.t. a*x + b*y = g
    if b == 0:
        return (a, 1, 0)
    g, x1, y1 = ex_euclid(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return (g, x, y)

def ceil_div(a, b):
    return -((-a) // b)

g, u, v = ex_euclid(B, C)  # B*u + C*v = g
Bp = B // g
Cp = C // g

total_ABC = 2 ** 60

for i in range(N // A + 1):
    d = N - A * i
    if d % g != 0:
        continue
    x0 = u * d // g
    y0 = v * d // g

    # j = x0 + t*Cp >= 0  -> t >= ceil(-x0 / Cp)
    # k = y0 - t*Bp >= 0  -> t <= floor(y0 / Bp)
    t_max = y0 // Bp
    t_min = ceil_div(-x0, Cp)

    if t_max < t_min:
        continue

    for t in (t_max, t_min):
        x = x0 + t * Cp
        y = y0 - t * Bp
        if x + y + i < total_ABC:
            total_ABC = x + y + i

print(total_ABC)
