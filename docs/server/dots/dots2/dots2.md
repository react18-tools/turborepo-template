---
layout: default
title: Dots2
parent: Dots
nav_order: 21
---

# server/dots/dots2/dots2

## Interfaces

### Dots2Props

Defined in: [server/dots/dots2/dots2.tsx:4](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/dots/dots2/dots2.tsx#L4)

Interface declaring the common properties of the loaders

#### Extends

- [`BaseProps`](../../common/base/base.md#baseprops)

#### Properties

##### color?

> `optional` **color**: `string`

Defined in: [server/common/base/base.tsx:10](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L10)

Color of the dots - CSS compatible color

###### Inherited from

[`BaseProps`](../../common/base/base.md#baseprops).[`color`](../../common/base/base.md#color)

##### dotRadius?

> `optional` **dotRadius**: `string` \| `number`

Defined in: [server/dots/dots2/dots2.tsx:6](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/dots/dots2/dots2.tsx#L6)

Radius of the dots in pixels or a string with a length unit.

##### height?

> `optional` **height**: `string` \| `number`

Defined in: [server/common/base/base.tsx:8](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L8)

height of the loader element in pixels or a string with a length unit.

###### Inherited from

[`BaseProps`](../../common/base/base.md#baseprops).[`height`](../../common/base/base.md#height)

##### width?

> `optional` **width**: `string` \| `number`

Defined in: [server/common/base/base.tsx:6](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L6)

width of the loader element in pixels or a string with a length unit.

###### Inherited from

[`BaseProps`](../../common/base/base.md#baseprops).[`width`](../../common/base/base.md#width)

## Functions

### Dots2()

> **Dots2**(`props`: [`Dots2Props`](#dots2props)): `Element`

Defined in: [server/dots/dots2/dots2.tsx:15](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/dots/dots2/dots2.tsx#L15)

A simple loader with 3 dots.

#### Parameters

##### props

[`Dots2Props`](#dots2props)

#### Returns

`Element`

#### Example

```ts
<Dots2 />
```
