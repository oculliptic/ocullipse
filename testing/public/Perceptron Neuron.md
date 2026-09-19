---
tags:
  - KNOWLEDGEBANK/tech
aliases:
---
##### intro 
One of the first artificial neurons, created in 1957, by Frank Rosenblatt. 
May have been the first that could learn off data? 
###### Quick Review 
- Activation Function: Threshold Function 
- Training Algorithm: $\Delta{w_j}=\eta * (y^{(i)}-\hat{y}^{(i)})*x^{(i)}_j$ 
	- Learning rate 
	- the $i$-th sample's $j$-th attribute 
	- error between calc and expected 
- Single Layer Neural Network 
- Only a Binary Classifier 
- Only good with Linearly Separable Patterns 
###### related 
[[Artificial Intelligence]] 
[[Neuro Network]] 
[[History of Machine Learning]] 
NEXT: [[Adaline Neuron]] ! 
[^1]: [[ML 05 Perceptron - tagged.pdf]] 
###### Left off 
- Loss function 
- Learning overtime 
#### CONCEPTS STILL MEMORIZING
- 
***
## Definition 
Proposed by Rosenblatt in 1957.
- The Perceptron is a **Binary Classifier**. 
- **Inputs** are the features of the object to be classified. 
- **Output** is the class of the object {1,0} 
- A single layer Neural Network. 

Considers:
- how input signals are accumulated (adjusted by weights) 
- how the output is determined 
- an algorithm for training 

Limitations: 
- Limited to Binary Classification (it is/is'nt)
- Limited to Linearly Separable data 
- Finds a linear separator if one exists, but not the most optimal one. 
###### Compared to Biological Brain Neuron

###### Compared to other Artificial Neuron


##### Linear Separability 
![[Linear Seperability]]
[[Linear Seperability]] 
#### inside the blackbox 
![[IMG_3043.jpeg|322]]
###### PARTS: 
$x_i$ : inputs 
$w_i$ : weights
$\Sigma : z = w^T x$ 
$\phi$ : activation function 
$\hat{y}$ : computed output 
##### Assembly Line 
1. take in inputs 
2. multiply each input by it's weight 
3. Sum the inputs resulting in (z)
4. Activation function(z) resulting in
output {1, 0}
### Accumulator function
*use weights to adjust the importance of each input x* 
$$
\Sigma^m_{i}x_iw_i=z
$$
##### PURPOSE 
Each input (attribute of the object being classified) has a different weight in determining the identity of this object. 

"identity is a set of attributes". Thus classification would require an object to be broken down into a set of attributes (inputs.) 
###### bundle theory 
BLAHHH 
Thus when you think about it, this relies on the philosophical idea that all identities are some sort of bundle of attributes. ie, [[Bundle Theory]]. What happens when a system is more than just the sum of it's parts? blah blah tangential rambles that Idk. 

And also; this reduces all the complexity of bundle theory into the idea that "identity is a set of attributes"... discussing the complexity of bundle theory is important. That is TBD. 
#### Dot Product of Inputs
$$
\tilde{z} = w^T x = \sigma^m_{i=1}w_ix_i
$$

Literally just add them. 
reminder: T is transpose. 
So it's simply saying dot product 2 values. 

DOT PRODUCT of $\vec{x}$ and $\vec{w}$ 
### Activation function 
**THRESHOLD FUNCTION** 
*is this attribute ultimately true or false?*
$$
\phi(z)
$$
##### PURPOSE 
The primary idea behind the activation function, in the perceptron, is to determine whether the sum of inputs and weights results in this neuron resulting in true or false. 

Taking the float point value into a boolean. 
In a single layer neuron, this is to output whether the input is true or false. 
In a multi-layer network, this is to decide whether or not to pass this information along (as an x_i value for the next set of neurons.)
#### **Heaviside Step Function** 
$$
\begin{equation}
    \phi{(\tilde{z})}= 
	\begin{cases}
		1 & \text{if $\tilde{z} \ge \lambda$} \\
		0 & \text{otherwise}
	\end{cases}
\end{equation}
$$
$\tilde{z}=\Sigma^m_{i=1} w_ix_i$ 
$\tilde{z}-\lambda=-\lambda + \Sigma^m_{i=1} w_ix_i$ 
$\tilde{z}-\lambda=-w_0x_0 + \Sigma^m_{i=1} w_ix_i$ 
$\tilde{z}-\lambda=\Sigma^m_{i=0} w_ix_i$ 
$$
\text{Let $z = \tilde{z}-\lambda$}
$$
$$
\begin{equation}
    \phi{(z)}= 
	\begin{cases}
		1 & \text{if ${z} \ge 0$} \\
		0 & \text{otherwise}
	\end{cases}
\end{equation}
$$

Aka just make true if it's value is not zero. 
##### persp 1: lambda 
Seems to depend on $\lambda$! 
How is $\lambda$ found? 

### Training a Perceptron 
$$
\Delta w
$$
###### Training Algorithms Review
*how should the weights be adjusted?* 
supervised learning is the machine learning ask of inferring a function from labeled training data. 

the training data consist of a set of training examples. 
in supervised learning each example is a par consisting of an input object (typically a vector) and a desired output (supervisory signal). 
	Aka. given this input, you should adjust weights to find this output.

Externalize this to a separate file, and link it. 
This way this can serve as a sort of reminder on this page. 
##### the training data
the training data consists of a set of n training examples.
each of which is a pair (x^i, y^i). where $x^{(i)} = [x^{(i)}_1, ...,x^{(i)}_m ]$ and y^(i)is the corresponding output value with $y^{(i)}\in \{0,1\}$. 
	i denotes the given sample/example 
	m denotes the number of attributes 
		(all samples should have the same number of attributes) 
*isn't this the general rule of training data?* 
#### Rosenblatt perceptron training algorithm 
1. initialize the weights, w, to 0 or to a small random numbers
2. for each training sample (x^i, y^i): 
	1. compute the output value $\tilde{y}^{(i)}$ 
	2. Update the weights 
		$w_j \leftarrow w_j + \Delta{w_j}$
		where $\Delta{w_j}=\eta(y^{(i)}-\hat{y^{(i)}})x^{(i)}_j$ 
		and where $\eta$ is the learning rate such that $0<\eta<1$. 
3. Repeat step 2... 
	1. up to a specified number of times 
	2. or until the weights converge, that is: 
		$\|\Delta{W}\|< \epsilon(\text{or}\|\Delta w\|_1 < \epsilon)$, 
		where epsilon is the convergence threshold, $\epsilon > 0$ 
	3. for all available training data? ($i$)
###### Hyper Parameters: 
*meaning it is preconfigured by the programmer* 
**(stopping conditions for training algorithm)**:
- number of iterations 
- the epsilon/convergence threshold 
**step size for each training data**:
- $\eta$ learning rate. 
##### persp: 
give the perceptron one piece of training data. 
1. the initial computation resulted in $\tilde{y}^{(i)}$.  
2. find the difference between the expected value $y^{(i)}$ and $\tilde{y}^{(i)}$ 
	how far off the expected is to the computed 
3. compute product: $\Delta{w_j}=(y^{(i)}-\tilde{y}^{(i)})(\eta)(x^{(i)}_j)$ for every $w^{(i)}_j$ 
	Here, the weight is decided by... 
	- $\eta$ the hyper parameter learning rate. How much *we, the programmer, believe* should learn from each example. Huge steps can be extremely volatile. Small steps require more epochs/iterations(?TBD) to learn. 
	- $(x^{(i)}_j)$ consider how significant this attribute is, it's presence ranging from (0... max). Not present to very present. 
	- $(y^{(i)}-\tilde{y}^{(i)})$ how wrong the classification was; validating the importance of x
4. update every weight: $w_j \leftarrow w_j + \Delta{w_j}$ 
NOTE: Weights are adjusted after EVERY sample. 

What is the range of values each variable should have? 
###### tangent 
Ok, so $(x^{(i)}_j)$ is the presence, the actual value of this attribute in a given piece of data. So let's say it's super present in one piece of data, and not present at all in another.
OR perhaps it'll be better to think of it as 2 groups, of which it is present in one, and not in another. 

if it began as w = 0, 
for an element that it should be present in, 
error is about 1 
herm... yeah walk through this. 

the group of objects will signify that it is pretty important. 
right? 
what about the group of objects that do no have it? 

I imagine there should exist a graphic that should make this more intuitive. 
#### loss/cost function
###### review 
[[Loss Function]]
![[Loss Function]] 

##### in the Rosenblatt algorithm 
$$
J(w)=\Sigma_i \| y^{(i)} - \hat{y}^{(i)}\|
$$
*implicit cost function* 


#### Learning overtime 

learning over time. 
##### Learning Rate ETA
$$
\eta
$$
learning rate is a hyper-parameter
That is defined by the programmer. 
This changes how big the step taken is after every adjustment. 

ie. defining the margin of error~
    may be put in very bad language
##### Epoch 
After running through the whole training data 1 time. 

The machine goes through the whole sample set thousands times in order to correct it's errors. 

Right? 

##### Iteration 
The same thing as epoch? 


##### Graphs 


## Linear Algebra! 
matrix approx? 

Have vector of weights 
Have 1D matrix for sample x
$$
{\begin{vmatrix} w_0 & w_1 & w_2 & ... & w_m \end{vmatrix}}{\begin{vmatrix} 1 \\ x^{(i)}_1 \\ x^{(i)}_2 \\ ... \\ x^{(i)}_m \end{vmatrix}}=\hat{y}^{(1)}
$$
$$
J(w)=\Sigma \| y^{(i)} - \hat{y}^{(i)}\|
$$

right?

## Implementation 
### Genuinely Good Implementation: 
Check this out before making own adaline implementation. 


### My Prototype 2: Practice 


### My Prototype: Conceptual Understanding 

Mostly on my own, and a Youtube guide. 
My Amateur programming ability shows it's face. 
Nonetheless, the purpose of developing this was to assure that I have the intuitive and thorough understanding of a perceptron and how to train it. 

Reference: Ascii graphic maker

```python 
import numpy as np 


class perceptron: 
    def __init__(self, n_iter: int = 1000, eta: float = 0.01):
        # hyper parameters 
        self.n_iter:int = n_iter            # iterations 
        self.eta:float = eta                # learning step 
        # parts 
        self.weights:np.array = None  # must be saved. unchanged outside of training  
    ### ACTIVATION FUNCTION --------------------------------------------------------
    def activation_function(self, z: float) -> int: 
        if(z >= 0): 
            return 1
        else: return 0
    ### TRAIN ----------------------------------------------------------------------
    def train(self, X:np.ndarray, y:np.array) -> None:       
        # INPUT: expect X as an i by m 2D array, y is an array of i cardinality 
        # clean and retrieve data 
        i_samples, m_attributes = X.shape           # with i columns AND n rows 
        self.weights = np.zeros(m_attributes)       # init weights 
        y_ = np.array([1 if i > 0 else 0 for i in y])
        # training day
        for n in range(self.n_iter):
            for idx, x_i in enumerate(X): # the number of samples 
                dotty = np.dot(x_i, self.weights)
                y_pred = self.activation_function(dotty)
                for j in range(len(x_i)):               # for each attribute 
                    delta_w = (y[idx] - y_pred) * x_i[j] * self.eta
                    self.weights[j] = self.weights[j] + delta_w 
    ### TAKE INPUT 
    def classify(self, x_vec:list[float]) -> int: 
        z = np.dot(x_vec, self.weights) 
        return self.activation_function(z) 
# a class, become a given perceptron will be created, and then trained to detect some specific binary classification. 
# INSIDE: what really holds the learned information is the: 
# set of weights 
# and any hyper parameters as the primary inputs 








if __name__ == "__main__":
    print('percepticon has awaked!')
    elearner = perceptron(1000) 
    print(elearner.weights)

    from ucimlrepo import fetch_ucirepo 
  
    # fetch dataset 
    iris = fetch_ucirepo(id=53) 
    
    # data (as pandas dataframes) 
    X = iris.data.features 
    y = iris.data.targets 
    
    # metadata 
    # print(iris.metadata) 
    
    # variable information 
    # print(iris.variables) 
    # print(type(X))
    X = np.array(X)
    # X.to_numpy() 
    # print(type(X))
    print(X) 
    print(type(y)) 
    y1 = np.array(y)
    y1 = y1.reshape(-1) 
    # print(y1)
    y2 = np.array([1 if i == 'Iris-setosa' else 0 for i in y1])
    print(y2)

    
    elearner.train(X, y2) 
    print(f"The weights found for this perceptron is: {elearner.weights}")
    print(f"{[4.7, 3.2, 1.3, 0.2]} is predicted to be {elearner.classify([4.7, 3.2, 1.3, 0.2])}")
    print(f"{[400.7, 3.2, 1.3, 0.2]} is predicted to be {elearner.classify([400.7, 3.2, 1.3, 0.2])}")
    print(f"{[4.7, 3.2, 1000.3, 0.2]} is predicted to be {elearner.classify([4.7, 3.2, 1000.3, 0.2])}")
    print(f"{[5.9, 3.0, 100, 1.8]} is predicted to be {elearner.classify([5.9, 3.0, 100, 1.8])}")
    print(f'{elearner} fabrication complete')



    











```

















