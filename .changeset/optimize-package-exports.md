---
"react18-loaders": patch
---

Optimize package.json exports with wildcard patterns

- Replace 50+ explicit exports with 6 wildcard patterns
- Maintain full backward compatibility for legacy dist paths
- Add comprehensive CSS exports for all modules
- Reduce maintenance burden with auto-scaling exports
- Support both clean paths (./server/bars) and legacy paths (./dist/server/bars)