# HR Workflow Designer

This project is a visual workflow builder designed for HR use cases like onboarding, approvals, and document processing. The idea is simple: instead of writing logic manually, users can create workflows by dragging and connecting nodes on a canvas—similar to tools like Zapier or Power Automate.

The focus here wasn’t just on making something that works, but on building it in a way that’s clean, extensible, and easy to reason about.

---

## Tech Stack

I kept the stack modern and practical:

* **Vite + React** for a fast, lightweight development experience
* **TypeScript** to keep everything predictable and type-safe
* **React Flow** to handle the core canvas interactions (drag, drop, connect, etc.)
* **Zustand** for state management without unnecessary complexity
* **React Hook Form** to manage dynamic node configuration forms
* **Tailwind CSS** for styling without over-engineering
* **Lucide React** for icons

---

## How I Structured Things

### State Management (Zustand)

Instead of pushing state through props or overusing context, I centralized everything in a Zustand store. Nodes, edges, and selection state all live there.

This makes interactions like dragging nodes, connecting edges, or updating configurations feel straightforward, and it keeps UI components relatively clean and focused.

---

### Node Configuration

Each node type has its own configuration, and that’s handled through a single `ConfigPanel`.

When you click a node, the panel adapts based on its type and shows the relevant fields. I used React Hook Form here to keep things manageable, especially since some fields are dynamic (like automation parameters).

Saving a form updates the node’s data directly in the store, keeping everything in sync.

---

### Workflow Execution (Mocked Backend)

There’s no real backend here, so I simulated one.

When you run a workflow:

* The graph is converted into a structured JSON format
* It’s passed to a mock `/simulate` function
* That function walks through the workflow step-by-step and returns logs

I also added some basic validation logic there—like detecting cycles or warning about disconnected nodes.

---

## Tradeoffs I Made

A couple of conscious decisions:

* **Mock API instead of real backend**
  Since persistence wasn’t required, I focused on simulating behavior rather than building infrastructure.

* **Loose validation on the UI side**
  Instead of blocking users aggressively while they build workflows, I let them connect things freely and handled most validation during execution.

* **Simple execution logic**
  Right now, if a node has multiple outgoing edges, the simulator just picks the first one. In a real system, this would involve conditions and branching logic.

---

## What I’d Improve Next

If I had more time, I’d push it further in a few areas:

* Add real-time cycle detection and visually highlight problematic nodes
* Implement undo/redo with state history
* Allow exporting and importing workflows as JSON
* Add auto-layout using something like Dagre to clean up messy graphs

---

## Running the Project

```bash
npm install
npm run dev
```

Then just open the app and start building workflows.

---

## Final Thoughts

This project is essentially a small version of a low-code workflow system. The goal was to balance functionality with clean design, and to keep things flexible enough that new node types or features could be added without rewriting everything.

If I were to take this further, I’d focus on making the execution engine smarter and turning this into a more complete workflow platform.
