---
layout: default
title: Base
parent: Server
nav_order: 16
---

# server/common/base/base

## Interfaces

### BaseProps

Defined in: [server/common/base/base.tsx:4](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L4)

Interface declaring the common properties of the loaders

#### Extends

- `HTMLProps`\<[`HTMLDivElement`](https://developer.mozilla.org/docs/Web/API/HTMLDivElement)\>

#### Extended by

- [`Dots2Props`](../../dots/dots2/dots2.md#dots2props)

#### Properties

##### color?

> `optional` **color**: `string`

Defined in: [server/common/base/base.tsx:10](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L10)

Color of the dots - CSS compatible color

###### Overrides

`HTMLProps.color`

##### height?

> `optional` **height**: `string` \| `number`

Defined in: [server/common/base/base.tsx:8](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L8)

height of the loader element in pixels or a string with a length unit.

###### Overrides

`HTMLProps.height`

##### width?

> `optional` **width**: `string` \| `number`

Defined in: [server/common/base/base.tsx:6](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L6)

width of the loader element in pixels or a string with a length unit.

###### Overrides

`HTMLProps.width`

***

### OtherProps

Defined in: [server/common/base/base.tsx:14](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L14)

Other props - loaderClass is included here as we will extend BaseProps for other loaders

#### Properties

##### dotRadius?

> `optional` **dotRadius**: `string` \| `number`

Defined in: [server/common/base/base.tsx:17](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L17)

##### loaderClass

> **loaderClass**: `string`

Defined in: [server/common/base/base.tsx:16](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L16)

Loader class name

## Functions

### Base()

> **Base**(`__namedParameters`: [`BaseProps`](#baseprops) & [`OtherProps`](#otherprops)): `Element`

Defined in: [server/common/base/base.tsx:25](https://github.com/react18-tools/turborepo-template/blob/cb1ec84a978733868e969b38eee33fae8484eb14/lib/src/server/common/base/base.tsx#L25)

Base component to avoid code duplication

default values should be specified in css files - so no need to set them in JSX

#### Parameters

##### \_\_namedParameters

[`BaseProps`](#baseprops) & [`OtherProps`](#otherprops)

#### Returns

`Element`
