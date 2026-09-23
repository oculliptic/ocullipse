---
tags:
  - KNOWLEDGEBANK/math/logic
aliases:
---
##### intro 
Induction is really just an axiom. [[axiom]] || [[Proofs#axiom]] 
We are leaning on the chain of implications. 
So proving that $P(n) \implies P(n+1)$ is the heart to induction. 
###### related 
[[Proofs]] 
[[proof.induction for paradigm]] 
[^1]: https://youtu.be/z8HKWUWS-lA?si=V35OHe21Tgg2nJup 
[^2]: https://6826.csail.mit.edu/2019/lf/Induction.html  
[^3]: 
##### TABLE OF CONTENTS 
[[proof.induction#Formal Proof]]   
***
#### CONCEPTS STILL MEMORIZING
- 

## General Induction Definition  
### Intuition: TRUTH DOMINOs
##### Induction axiom: 
Let P(n) be a predicate.
If... 
1. $P(0)$ is true, 
2. $\forall n \in N : (P(n)\implies{P(n+1)})$ is true 
3. then $\forall{n}\in{N}$, $P(n)$ is true
![[Pasted image 20260909173358.png]]
in other words... 
if P(0) is true. 
if P(0) implies that P(1) is true 
if P(1) implies that P(2) is true 
... etc. 
then P(0), P(1), ... etc. 
is true. 
**Like this, sort of, domino of "modus ponens" truths.**[^1]  

so you then need to break down the problem to prove that for all n, p(n) implies that p(n+1) is true. ***The most important step is proving that $P(n)\implies P(n+1)$***. Perhaps it is redundant to mention: But here the truth is measured by the correctness of P(n). 
*How do your break down the problem?...* 
### Formal Proof Structure
*and it's Jargon* 
Base step 
Induction Hypothesis 
Induction Step 
$\therefore$ 
#### Base Case 
**prove** $P(0)$ is true. 
#### Inductive Step (IS)
$\forall n\ge 0$, show $P(n)\implies P(n+1)$ is true. 
##### Assume $P(n)$ is true (IH)
*Induction Hypothesis* 
We want to prove that the proposition: $P(n)\implies P(n+1)$ is true. 

| $P(n)$ | $P(n+1)$ | $P(n)\implies P(n+1)$ |
| ------ | -------- | --------------------- |
| T      | T        | T                     |
| T      | F        | F                     |
| F      | T        | T                     |
| F      | F        | T                     |
- when $P(n)$ is false, the implication is always true.
- But when $P(n)$ is true, it is possible for the implication to be false.
Thus the first step is for us to assume that $P(n)$ is true...
>"Assume $P(n)$ is true, for purpose of induction" 
##### Prove that $P(n+1)$ is true
We must now use another form of proofs, to **prove** $P(n+1)$. 
>You can prove... mathematically, by contradiction, by etc. 
##### thus $P(n)\implies P(n+1)$ is true
By proving that $P(n+1)$ is true, WHERE we assumed that $P(n)$ is true, the proposition: $P(n)\implies P(n+1)$, is true. 
#### Then $\therefore$ 
>The original Proposition is true. 
###### Intuition note: 
often the inductive proof does not provide an intuition for the theorem being proved. And that's alright. Induction's merits is in the formality of its logic, not the intuitiveness. 
## A notion of Strength 
Multiple Previous term; 
thus Multiple Base cases 
n >= k 
Recursion 

assuming only n-1 
vs assuming 0 to n


in both; we assume assume for k to be true. 
in weak induction we simply prove for k+1, becaue we are solely relying on the assumption that k is true. this is done by algebraic patterns. 

in strong, we prove for k+1 BY breaking k down into smaller components like x and y, that are smaller than k but graeter than the base cases. we do this because this expresses that we are not only assuming that P is true for some k, but that we are covering this whole range from base to k. also done by some algebraic pattern. 

##### 1, 2, ..., n
really means to identify the pattern between 1 to n.
ie. How well the induction step is defined? 
Translating to the strength of the induction proof. 
### Mathematical Induction
*Weak Induction* 


### Complete Induction 
*Strong Induction* 


check MIT textbook for the difference 






















































