---
tags:
  - KNOWLEDGEBANK/math
aliases:
  - Propositions
---
##### intro: GENERAL NOTION OF PROOF
*"I dont see why not"* 
Generally a proof is considered, across multiple fields, as a method of ascertaining the truth.[^1]
	establishing/verifying 
[^1]: https://youtu.be/L3LMbpZIKhQ?si=nnytKEUH8Pp0bcFv 

Truth is the opposite of falsehood. 
- experimentation 
- observation 
- sampling 
- counter examples
- Judge 
- God 
###### related 
[[United States Justice]] 

[[Discrete Math]] 

[[direct proof]] 
[[proof.induction]] 
[[proof.contradiction]] 
#### CONCEPTS STILL MEMORIZING
- 
***
## Definition 
#### Formal Mathematical Definition 
A mathematical proof is a verification of a proposition by a chain of [[logical deductions]] from a [[set]] of axioms.[^1] 
	- [[Proofs#proposition]] 
	- [[Proofs#axiom]] 
	- [[Proofs#logical deduction]]
[^1]: https://youtu.be/L3LMbpZIKhQ?si=nnytKEUH8Pp0bcFv 
### proposition 
DEF: is a statement that is either True or False. 
ex: 2 + 3 = 5 

It is comprised of a: 
- quantifier 
- universe of discourse 
- predicate 
##### example 
$\forall n \in N, n^2 + n + 41$ is a prime number
- $\forall$ : quantifier 
- $N$ : universe of discourse (space of all things we are talking about)
- predicate: a proposition whose truth depends on the value of variable (n)

So we need to ascertain if this predicate is true. for all natural numbers n.  

for values 0 to 39 this holds true. 
How could we prove this predicate does not true for all numbers n in the set N, without performing trial and error 40 times?
###### my rambling
*my ramble: disect the question! by treating n^2 + n + 41 as a system that we could analyze; we can quickly figure that it does not hold true. How do we apply this line of thinking to other kinds of problems? and what would it be called? aka what is this strategy, abstracting it from this problem.* 
that of which... is the hardest task to perform! 
This task, in it's entirety, the the pursuit of mathematics. 

But there exists sets of strategy given a problem right? there exist a multitude of ideas that analyze how to solve a particular type of problem.
aka. there exists ideas that can be read about that. (analysis)

BUT! 
perhaps a useful perspective to consider is that a proof would be the formalization of a solution. 
Placing all the work involved in solving a problem, into a neat proper structure. 
##### is every sentences a proposition? 
no, not everything can be evaluated into an certain true or false. 
#### implication 
*unidirectional truth*
$$\implies$$
an implication $p \implies q$ is said to be true 
- if p is false, 
- or q is true. 

| $p$ | $q$ | $p\implies q$ |
| --- | --- | ------------- |
| T   | T   | T             |
| T   | F   | F             |
| F   | T   | T             |
| F   | F   | T             |
##### persp 1: starting from p 
if $p$ is true, $q$ must be true. 
if $p$ is false, $q$ can be true or false, it doesn't matter.
**we observe that 'implies' seems to be unidirectional.** 
the truth state of q does not depend on p being true, 
but where p is true, q MUST be true. 
##### persp 2: logic gates
statement is true if: 
$p$ is false **OR** $q$ is true. 

| $p$     | $q$     | $p\implies q$ |
| ------- | ------- | ------------- |
| T       | ***T*** | *T*           |
| T       | F       | **F**         |
| ***F*** | ***T*** | *T*           |
| ***F*** | F       | *T*           |
DRAW THE GATES AND POST HERE 
This perspective isn't quite intuitive.

#### iff, if and only if 
$$\iff$$
*bidirectional implication* 
$p \iff q$ is true if... 
- if p AND q are true. 
- if p AND q are false.


| $p$ | $q$ | $p\iff q$ |
| --- | --- | --------- |
| T   | T   | T         |
| T   | F   | F         |
| F   | T   | F         |
| F   | F   | T         |
##### persp 1: 
p can only be true if q is true, 
vice versa.
##### persp 2: logic gates 
if p AND q are true. 
if p AND q are false.

### axiom 
DEF: an axiom is a proposition that is assumed to be true. 
	Theres no proof that an axiom is true. 
	just assumed because you think it's reasonable. 
	greek etymological meaning "to think worthy" 

identify with your assumptions, your axioms.
this seems to be good practice because... 
1. anyone who agrees with those axioms, would then agree with the proof and conclusion of your proposition. 
2. allows your peers to see what the axioms your proposition depends on are. 
##### example 
A common axiom is: 
if 
- a = b 
- b = c 
then: a = c 
**there's no proof of that... but it seems true.** 
#### inter-contextual contradiction 
Axioms can be contradictory in different contexts. 


central axiom of euclidean geometry: 
given... 
- a line L 
- a point p not on L 
There is: **exactly one** line through p parallel to L.

central axiom of spherical geometry: 
given... 
- a line L 
- a point p not on L 
There is: **NO** line through p parallel to L.

central axiom of hyperbolic geometry: 
given... 
- a line L 
- a point p not on L 
There is: **infinitely many** lines through p parallel to L.

Axiom's are context specific. 
It depends on the universe of discourse? 

#### 2 guiding principles 
Axioms should be... 
1. consistent 
2. complete 
DEF: 
a set of axioms is consistent if no proposition can be proved to be both true and false. 
a set of axioms is complete if it can be used to prove every proposition as EITHER true or false. 

##### persp: 
consistent: if a proposition uses an axiom, that axiom would always support the proposition as being exclusively true or false. 
(XOR and NAND are logically equivalent) 

complete: if it is consistent for every proposition. 

#### Godel incompleteness theorem 
trying to just find one set of axioms that are both consistent and complete- Russell and Whitehead being one of the most famous who spent their whole careers attempting to find this set- has been one of the great questions in logistics. 

There exists NO set of axioms that are both consistent AND complete. 


what exactly does this mean?[^1]
>There will be true facts, that you will never be able to prove!

[^1]: https://youtu.be/L3LMbpZIKhQ?si=nnytKEUH8Pp0bcFv 

### logical deduction 
An inference rule, is a rule for combining true propositions to form other true propositions. 
###### Modus Ponens: 
if $(P\land (P\implies Q))\therefore Q$ 
	if (P implies Q) is true, and P is true, Q must be true. 
if $((P\implies Q) \land \neg{Q}) \therefore \neg P$ 
	if (P implies Q) is true, and Q is not true, P must not be true. 
if $(\neg P \implies F)\implies P$
    if P is not false, then it's true. [[2026-09-13 Sunday#Study]] 

## Proof Outlines 
### There Exists
$\text{Thm:} \exists x \in S. P(x)$
$PF:$ 
- Choose $x$ = \_ 
- Then $x\in S$ b/c \_ 
- and $P(x)$ is true b/c \_ 
##### example 
Thm: $\exists n \in N$ ($n\ge 10$ isprime($n$))
###### my stab 
n/2 >= 5 is prime 
n cannot be even if it is to be prime. 

n/2 is not an integer NOPE. as long as n is natural. 

if n is 5 which is prime; 
idk tt 
###### general structure 
PF: 
we'll show that n = \_ works. 
this n is in the natural numbers for \[reasons], and n is prime because \[reasons]. 
### For All 
All 
$\text{Thm:} \forall x \in S. P(x)$
$PF:$ 
- suppose $x$ is a generic elt of S. (we are not allowed to choose just one)
	*ie, to really make progress in this proof, you often take a property of the set S.* 
- Then $P(x)$ is true b/c \_ 
##### example 
Thm: $\forall x \in R$ ($x^2 -6x>-10$)
- suppose $x\in R$, 
- then $(x-3)^2 \ge 0$ 
- b/c all Reals have nonneg squares. 
Equivalently, $x^2-6x\ge-9>-10$, are needed
$QED$ 
#### Dis-Proving: For all and There Exist
To disprove a proposition of "there exists", we must provide that for all n in S, this cannot be true. ie. this couldn't exist.

To disprove a proposition of "for all", we must simply provide that there exist an n in S, of which contradicts this proposition. Because then it wouldn't be for all. 
### Implications 
$P\implies Q$ 
PF: assume $P$. 
then $Q$ is true b/c \_
*direct proof* 
### Contrapositive 



## Types of Proofs 
##### LIST 
- Induction 
- Contradiction 
- 
###### Funnies 
- Proof by Intimidation 
- 
### Contradiction 
To prove P is true, 
1. we assume P is False (ie, ¬P is True). 
2. the use that hypothesis to derive a falsehood or contradiction. 

Thus it must be that P is not false. 
namely, it is true. 
	good thing it's binary!

if $¬P \implies F$ is true 

| $P$ | $¬P$ | $F$ | $¬P \implies F$ |
| --- | ---- | --- | --------------- |
| T   | **F**    | **F**   | T               |
| F   | T    | F   | F               |

in the proof there will exist some logical contradiction. and therefore P would have to be true. 

##### PYTHAGAREONS HISTORY 
discovered by the pythagereons 
math was a religion in ancient greece.
Aperon - infinity 
Persos - finite world 

one of their main axioms, 
- was that irrationale numbers did not exist.
	they just didnt like them- it was an infinite decimal that could not be represented by integers. 
- any line you could construct has a finite length

Pythageons theorem states that 
side a = 1 
side b = 1 
hyp = $\sqrt{2}$ 

Their most fundamental theorem in observation with their axiom, created a contradicted!














