import type { MindMapNodeData } from '../types';

export const mindMapData: MindMapNodeData = {
  id: 'root',
  name: 'Quantum Computing: Foundations to Applications',
  details: 'An interactive guide to the world of quantum computing, from fundamental principles to cutting-edge applications. Subtitle: Unlocking the Imagination of Nature.',
  children: [
    {
      id: 'foundations',
      name: 'Foundations of Quantum Computing',
      children: [
        { id: 'qubits', name: 'Qubits', details: 'The basic unit of quantum information. Can exist in a superposition of two states, 0 and 1. Often visualized on a Bloch sphere.' },
        { id: 'circuit-model', name: 'Quantum Circuit Model', details: 'A model for quantum computation where horizontal lines (wires) represent qubits, and gates are applied. Read left to right.' },
        { id: 'gates', name: 'Quantum Gates', details: 'Operations on qubits. Examples include Hadamard (H), Pauli-X, Y, Z, CNOT, and Toffoli. Universal gates can create any quantum operation.' },
        { id: 'entanglement', name: 'Entanglement', details: 'A quantum mechanical phenomenon where qubits are linked in a way that their fates are intertwined, regardless of distance. Example: Bell state √1/2(|00⟩ + |11⟩).' },
        { id: 'measurement', name: 'Measurements', details: 'The process of extracting classical information from a quantum state, which collapses the superposition. The probability of measuring state |𝜑⟩ from |𝜓⟩ is |⟨𝜑|𝜓⟩|².' },
        { id: 'dirac-notation', name: 'Dirac Notation', details: 'A standard notation for quantum states. |𝜓⟩ (ket) for state vectors, ⟨𝜑| (bra) for row vectors, and ⟨𝜑|𝜓⟩ for inner products.' },
      ],
    },
    {
      id: 'algorithms',
      name: 'Quantum Algorithms',
      children: [
        {
          id: 'optimization',
          name: 'Quantum Optimization',
          children: [
            { id: 'ising-qubo', name: 'Ising Model & QUBO', details: 'Methods for formulating complex optimization problems (like Max-Cut) into a format solvable by quantum computers.' },
            { id: 'annealing', name: 'Quantum Annealing', details: 'A metaheuristic for finding the global minimum of a given objective function. Used by D-Wave systems via their Ocean software.' },
            { id: 'qaoa', name: 'QAOA', details: 'Quantum Approximate Optimization Algorithm. A hybrid quantum-classical method that discretizes quantum annealing.' },
            { id: 'vqe', name: 'VQE', details: 'Variational Quantum Eigensolver. Finds ground states of Hamiltonians, useful for molecular problems like H2. VQD is for excited states.' },
            { id: 'gas', name: 'Grover\'s Adaptive Search', details: 'An optimization technique that uses Grover\'s search algorithm to find the minimum of a function.' },
          ],
        },
        {
          id: 'qml',
          name: 'Quantum Machine Learning (QML)',
          children: [
            { id: 'qml-def', name: 'QML Definition', details: 'A field that explores the intersection of quantum computing and classical machine learning.' },
            { id: 'feature-maps', name: 'Feature Maps', details: 'Techniques to encode classical data into quantum states (e.g., Angle Encoding, AmplitudeEmbedding, ZZFeatureMap).' },
            { id: 'qsvm', name: 'QSVM', details: 'Quantum Support Vector Machines. Uses a quantum computer to estimate the kernel function, potentially offering speedups.' },
            { id: 'qnn', name: 'QNN', details: 'Quantum Neural Networks. Analogs of classical NNs using parameterized quantum circuits (variational forms) like TwoLocal or StronglyEntanglingLayers.' },
            { id: 'hybrid-arch', name: 'Hybrid Architectures', details: 'Combining quantum and classical components. Examples: PennyLane with TensorFlow, Qiskit with PyTorch.', externalLink: 'https://pennylane.ai/' },
            { id: 'qgan', name: 'QGAN', details: 'Quantum Generative Adversarial Networks. Quantum versions of GANs for unsupervised generation tasks.' },
          ],
        },
        {
            id: 'foundational-algos',
            name: 'Foundational Algorithms',
            children: [
              { id: 'deutsch-jozsa', name: 'Deutsch-Jozsa', details: 'One of the first algorithms to demonstrate an exponential quantum speedup over classical algorithms for a specific problem.' },
              { id: 'grover', name: 'Grover\'s Algorithm', details: 'Provides a quadratic speedup for unstructured search problems through amplitude amplification.' },
              { id: 'qft', name: 'Quantum Fourier Transform', details: 'A key subroutine in many important quantum algorithms, including Shor\'s algorithm and phase estimation.' },
              { id: 'qpe', name: 'Quantum Phase Estimation', details: 'Uses the QFT to estimate the eigenvalues of a unitary operator, a crucial step for many other algorithms.' },
            ],
        },
      ],
    },
    {
      id: 'hardware',
      name: 'Quantum Hardware & Infrastructure',
      children: [
        { id: 'qubit-tech', name: 'Qubit Technologies', details: 'Different physical implementations of qubits, including Superconducting (Transmons), Spin Qubits, and Trapped Ions/Atoms.' },
        { id: 'hw-arch', name: 'Hardware Architecture', details: 'Includes control electronics, cryogenic wiring, and packaging for multi-chip processors and couplers (C, L, M couplers).' },
        { id: 'challenges', name: 'Challenges', details: 'Major hurdles include decoherence (noise), limited qubit connectivity, shallow circuit depth, and barren plateaus in training.' },
        { id: 'error-correction', name: 'Error Correction', details: 'Techniques like Surface Codes and LDPC codes aim to create fault-tolerant quantum computers, a major goal for the industry.' },
        { id: 'processors', name: 'Key Processors', details: 'Notable quantum processors include IBM\'s Eagle (127 qubits) and Heron (133 qubits), and systems from Quantinuum and Atom Computing.', externalLink: 'https://www.ibm.com/quantum/systems' },
      ],
    },
    {
        id: 'software',
        name: 'Quantum Software & Tools',
        children: [
            { id: 'frameworks', name: 'Programming Frameworks', details: 'High-level libraries for building and running quantum circuits. Key players are Qiskit and PennyLane.' },
            { id: 'qiskit', name: 'Qiskit', details: 'An open-source SDK from IBM for working with quantum computers. Includes Terra, Aer, Nature, and modules for ML and Optimization.', externalLink: 'https://qiskit.org/' },
            { id: 'pennylane', name: 'PennyLane', details: 'A library for differentiable quantum programming, connecting quantum circuits to ML frameworks like PyTorch and TensorFlow.', externalLink: 'https://pennylane.ai/' },
            { id: 'other-tools', name: 'Other Tools', details: 'D-Wave\'s Ocean (for annealing), Amazon Braket, Microsoft QDK (Q#), Google Cirq, and the visual simulator Quirk.' },
            { id: 'classical-libs', name: 'Integrated Classical Libraries', details: 'Quantum frameworks integrate seamlessly with classical ML tools like TensorFlow, PyTorch, scikit-learn, NumPy, and Matplotlib.' },
        ]
    },
    {
      id: 'learning',
      name: 'Learning & Practical Application',
      children: [
        { id: 'book-philosophy', name: 'Hands-On Approach', details: 'Focuses on understanding through a combination of theory and practical code examples.' },
        { id: 'sim-vs-real', name: 'Simulators vs. Real Hardware', details: 'Most frameworks allow algorithms to be tested on local simulators before being sent to real quantum hardware in the cloud.' },
        { id: 'open-source', name: 'Open Source', details: 'The availability of free, open-source tools like Qiskit and PennyLane is crucial for the growth of the quantum community.' },
      ],
    },
    {
      id: 'future',
      name: 'Key Concepts & Future Outlook',
      children: [
        { id: 'nisq', name: 'NISQ Era', details: 'Noisy Intermediate-Scale Quantum. The current era, focused on finding applications for quantum computers with 50-100s of noisy qubits.' },
        { id: 'vqa', name: 'Variational Quantum Algorithms', details: 'A class of hybrid algorithms (like VQE, QAOA) that are central to the NISQ era due to their resilience to noise.' },
        { id: 'complexity', name: 'Computational Complexity', details: 'Quantum computers promise to solve certain problems (like factoring) that are intractable for classical computers, exploring classes beyond P and NP.' },
        { id: 'future-qc', name: 'The Future of QC', details: 'Focus is on scaling up qubit counts, improving quality through error correction, and discovering new, practical applications.' },
      ],
    },
  ],
};