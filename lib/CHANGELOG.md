# react18-loaders

## 1.1.11

### Patch Changes

- 65723ce: Keep the dist/index.css export as well for backward compatibility

## 1.1.10

### Patch Changes

- 94ba6ff: Export styles as /dist for backward compatibility

## 1.1.9

### Patch Changes

- 029f6fb: Optimize package.json exports with wildcard patterns
  - Replace 50+ explicit exports with 6 wildcard patterns
  - Maintain full backward compatibility for legacy dist paths
  - Add comprehensive CSS exports for all modules
  - Reduce maintenance burden with auto-scaling exports
  - Support both clean paths (./server/bars) and legacy paths (./dist/server/bars)

## 1.1.8

### Patch Changes

- f3f68cc: Remove next peed dep

## 1.1.7

### Patch Changes

- bb84d03: Update exports

## 1.1.6

### Patch Changes

- 7d32ddd: Fix exports for styles

## 1.1.5

### Patch Changes

- e29bdd4: Create exports field in package.json

## 1.1.4

### Patch Changes

- 9bdf631: Upgrade r18gs

## 1.1.3

### Patch Changes

- 02d5cd9: Use https://www.npmjs.com/package/esbuild-plugin-rdi to better minify the build.

## 1.1.2

### Patch Changes

- Update peerDependency

## 1.1.1

### Patch Changes

- 5579416: Publish lite version

## 1.1.0

### Minor Changes

- 032f2f8: Added loading prop to loader-container and improved styles

## 1.0.3

### Patch Changes

- Remove uuid as it will result in multiple rgs stores for treeshakable imports

## 1.0.2

### Patch Changes

- Fix renaming of CSS variables due to react18 plugin

## 1.0.1

### Patch Changes

- Upgrade esbuild-plugin-reacct18 to beta version for better minification

## 1.0.0

### Minor Changes

- d80cde0: test minor

### Patch Changes

- 6ad42c8: test patch canary

## 1.0.0-canary.1

### Minor Changes

- d80cde0: test minor

### Patch Changes

- 6ad42c8: test patch canary

## 1.0.0-canary.0

### Major Changes

- b1f029b: test major

### Minor Changes

- d80cde0: test minor

### Patch Changes

- 6ad42c8: test patch canary

## 0.0.2

### Patch Changes

- 1d4dec0: debug creation of release and pushing back to the repo
- 52eb814: Test canary
- ea8e4ee: test canary release

## 0.0.1

### Patch Changes

- 0c17b4a: Fix: add z-index for loader container
