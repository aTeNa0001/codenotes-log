---
title: "典型90問-020"
createdAt: 2026-02-08
contest: "typical90"
problem: "典型90問-020"
difficulty: "1"
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_t"
---

## 問題概要
整数 \(a,b,c\) が与えられる。  
不等式
\[
a < c^b
\]
が成り立つかどうかを判定せよ。

---

## 解法
そのまま累乗や対数を用いて比較すると、浮動小数点誤差が発生する可能性がある。  
本問では制約上 \(c^b\) を整数として安全に計算できるため、**整数同士の比較**を行えばよい。

すなわち、\(c^b\) を計算し、\(a\) と直接比較するだけで判定できる。

なお、Python では `**` による累乗計算は多倍長整数で行われるため、誤差は生じない。

補足として、対数関数を用いる場合の代表的な書き方は以下の通りである（本問では不要）。
- 底が \(e\)：`math.log(x)`
- 底が \(10\)：`math.log10(x)`
- 底が \(2\)：`math.log2(x)`
- 任意の底 \(a\)：`math.log(x, a)`

---

## 実装例
```python
a, b, c = map(int, input().split())

if a < c ** b:
    print("Yes")
else:
    print("No")
