---
layout: default
title: README
parent: Base
nav_order: 17
---
# server/common/base/base

## Modules

- [\<internal\>](-internal-.md)

## Interfaces

### BaseProps

Defined in: [server/common/base/base.tsx:4](https://github.com/react18-tools/turborepo-template/blob/76e11a03ce743685b3981fb25ca890c3ce54662c/lib/src/server/common/base/base.tsx#L4)

Interface declaring the common properties of the loaders

#### Extends

- `HTMLProps`\<[`HTMLDivElement`](https://developer.mozilla.org/docs/Web/API/HTMLDivElement)\>

#### Extended by

- [`Dots2Props`](../../../dots/dots2/dots2/-internal-.md#dots2props)

#### Properties

##### color?

> `optional` **color**: `string`

Defined in: [server/common/base/base.tsx:10](https://github.com/react18-tools/turborepo-template/blob/76e11a03ce743685b3981fb25ca890c3ce54662c/lib/src/server/common/base/base.tsx#L10)

Color of the dots - CSS compatible color

###### Overrides

`HTMLProps.color`

##### height?

> `optional` **height**: `string` \| `number`

Defined in: [server/common/base/base.tsx:8](https://github.com/react18-tools/turborepo-template/blob/76e11a03ce743685b3981fb25ca890c3ce54662c/lib/src/server/common/base/base.tsx#L8)

height of the loader element in pixels or a string with a length unit.

###### Overrides

`HTMLProps.height`

##### width?

> `optional` **width**: `string` \| `number`

Defined in: [server/common/base/base.tsx:6](https://github.com/react18-tools/turborepo-template/blob/76e11a03ce743685b3981fb25ca890c3ce54662c/lib/src/server/common/base/base.tsx#L6)

width of the loader element in pixels or a string with a length unit.

###### Overrides

`HTMLProps.width`

## Functions

### Base()

> **Base**(`__namedParameters`: [`BaseProps`](#baseprops) & [`OtherProps`](-internal-.md#otherprops)): `Element`

Defined in: [server/common/base/base.tsx:25](https://github.com/react18-tools/turborepo-template/blob/76e11a03ce743685b3981fb25ca890c3ce54662c/lib/src/server/common/base/base.tsx#L25)

Base component to avoid code duplication

default values should be specified in css files - so no need to set them in JSX

#### Parameters

##### \_\_namedParameters

[`BaseProps`](#baseprops) & [`OtherProps`](-internal-.md#otherprops)

#### Returns

`Element`
