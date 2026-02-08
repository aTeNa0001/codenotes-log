---
title: "典型90問-018"
createdAt: 2026-02-08
contest: "typical90"
problem: "典型90問-018"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_r"
---

## 問題概要
周期 \(T\) 秒で回転する観覧車があり、その直径は \(L\) である。  
観覧車の中心は \((0,0,L/2)\) にあり、回転は一定速度で行われる。

観測者は地上の点 \((X,Y,0)\) に固定されている。  
時刻 \(E\) 秒後における観覧車上の点と観測者を結ぶ直線が、地面となす角度（仰角）を求めよ。

これを \(Q\) 個のクエリについてそれぞれ出力する。

---

## 解法
math ライブラリを用いる問題である。

観覧車は円運動をしているため、時刻 \(E\) 秒後の回転角は  
\[
\theta = 360 \times \frac{E}{T}
\]
（度）で表せる。

三角関数はラジアンで計算されるため、度からラジアンへの変換を忘れないようにする。

観覧車上の点の座標を \((0, y, z)\) とすると、
- 半径 \(r = L/2\)
- \(y = -r \sin \theta\)
- \(z = r (1 - \cos \theta)\)

となる。  
観測者との水平距離と高さから \(\tan^{-1}\) を用いて仰角を求め、度に戻して出力する。

---

## 実装例
```python
import math

T = int(input())
L, X, Y = map(int, input().split())
Q = int(input())

r = L / 2

for _ in range(Q):
    E = int(input())
    angle = 360 * E / T
    rad = math.radians(angle)

    y = -r * math.sin(rad)
    z = r * (1 - math.cos(rad))

    horizontal = math.sqrt(X**2 + (Y - y)**2)
    tan = z / horizontal
    print(math.degrees(math.atan(tan)))
