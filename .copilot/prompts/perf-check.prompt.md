---
description: Diagnose and improve performance bottlenecks
mode: agent
---
# RCG /perf-check

Diagnose bottlenecks with a measure-first, optimize-second approach.

Intent: Diagnose and improve performance bottlenecks.

## Required inputs
Before proceeding, ensure you have the following. If any are missing, ask the user to provide them:
- Target metric (latency, throughput, memory, CPU)
- Current baseline measurements
- Workload profile or traffic assumptions
- Environment details
- Profiling or instrumentation data

## Workflow
1. Ask the user for the target metric, baseline measurements, and environment details if not already provided.
2. Confirm the target metric and record the baseline.
3. Analyze hot paths using the provided profiling or instrumentation data.
4. Rank bottlenecks by impact and effort and present your reasoning.
5. Implement the highest-value optimization.
6. Re-measure and compare results against the baseline.
7. Document tradeoffs and follow-up optimization opportunities.

## Constraints
- No optimization without measurement.
- Document tradeoffs and risks.

## Exit criteria
- Performance improved and measured.
- Tradeoffs and risks documented.
- Follow-up opportunities listed.

Paste-ready summary:
```
Metric: ...
Baseline: ...
Optimization: ...
Result: ...
Tradeoffs: ...
```
