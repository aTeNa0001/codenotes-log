---
title: "典型90問-026"
createdAt: 2026-02-09
contest: "typical90"
problem: "典型90問-026"
difficulty: ""
sourceUrl: "https://atcoder.jp/contests/typical90/tasks/typical90_z"
---

## 問題概要

頂点数 \(N\) の木が与えられる。  
この木の頂点集合から、ちょうど \(N/2\) 個の頂点を選び、次の条件を満たすようにしたい。

- 選んだどの 2 頂点の間にも辺が存在しない  

条件を満たす頂点集合を 1 つ出力する。

---

## 解法

木は必ず二部グラフになるため、各頂点は 2 つのグループのどちらかに分類できる。  
この分け方は、始点を決めて DFS（または BFS）で色分けすれば一意に定まる。

手順は以下の通り。

1. DFS により木を二部グラフとして色分けする  
2. 2 つのグループのうち、頂点数が多い方を選ぶ  
3. そのグループから先頭 \(N/2\) 個を答えとして出力する  

木の二部グラフ分割は一意であるため、  
「数が多い方を採用すれば必ず \(N/2\) 個以上存在する」ことが保証される。

また、  
`[式 for ... if ...]` の形のリスト内包表記は、このような処理で便利なので積極的に使うとよい。

---

## 実装例

```python
N = int(input())
G = [[] for _ in range(N)]
for _ in range(N - 1):
    a, b = map(int, input().split())
    a, b = a - 1, b - 1  # 0-indexed
    G[a].append(b)
    G[b].append(a)

def DFS(x):
    colors = [-1] * N
    colors[x] = 1
    st = [x]
    while st:
        v = st.pop()
        for nv in G[v]:
            if colors[nv] == -1:
                colors[nv] = 1 - colors[v]
                st.append(nv)
    return colors

colors = DFS(0)
group0 = [i for i in range(N) if colors[i] == 0]
group1 = [i for i in range(N) if colors[i] == 1]

pick = group0 if len(group0) >= len(group1) else group1
ans = pick[:N // 2]

for v in ans:
    print(v + 1, end=" ")
