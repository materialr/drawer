# MaterialR Drawer

**@materialr/drawer**

[![Build Status](https://travis-ci.org/materialr/drawer.svg?branch=master)](https://travis-ci.org/materialr/drawer)
[![Coverage Status](https://coveralls.io/repos/github/materialr/drawer/badge.svg?branch=master)](https://coveralls.io/github/materialr/drawer?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/113320f2-8e05-4c06-801f-51e6f971af44/badge)](https://nodesecurity.io/orgs/materialr/projects/113320f2-8e05-4c06-801f-51e6f971af44)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material drawer implementation for React

## Installation

```sh
$ npm install --save @materialr/drawer
```

## Demo

A full demo is available on the [MaterialR website](https://materialr.github.io/components/drawer)
showcasing all variants.

## Components

### Named exports

```js
import { PermanentDrawer } from '@materialr/drawer';
```

**Props**

| Prop        | Type   | Required | Default   | Description                  |
| ----------- | ------ | -------- | --------- | ---------------------------- |
| `children`  | node   | Yes      | N/A       | The child elements to render |
| `className` | string | No       | undefined | Additional classNames to add |

```js
import { PersistentDrawer } from '@materialr/drawer';
```

**Props**

| Prop        | Type   | Required | Default   | Description                                 |
| ----------- | ------ | -------- | --------- | ------------------------------------------- |
| `children`  | node   | Yes      | N/A       | The child elements to render                |
| `className` | string | No       | undefined | Additional classNames to add                |
| `onClose`   | func   | No       | undefined | An event handler for when the drawer closes |
| `onOpen`    | func   | No       | undefined | An event handler for when the drawer opens  |

```js
import { TemporaryDrawer } from '@materialr/drawer';
```

**Props**

| Prop        | Type   | Required | Default   | Description                                 |
| ----------- | ------ | -------- | --------- | ------------------------------------------- |
| `children`  | node   | Yes      | N/A       | The child elements to render                |
| `className` | string | No       | undefined | Additional classNames to add                |
| `onClose`   | func   | No       | undefined | An event handler for when the drawer closes |
| `onOpen`    | func   | No       | undefined | An event handler for when the drawer opens  |

```js
import { Header } from '@materialr/drawer';
```

**Props**

| Prop        | Type   | Required | Default   | Description                  |
| ----------- | ------ | -------- | --------- | ---------------------------- |
| `children`  | node   | No       | undefined | The child elements to render |
| `className` | string | No       | undefined | Additional classNames to add |

```js
import { ToolbarSpacer } from '@materialr/drawer';
```

**Props**

| Prop        | Type   | Required | Default   | Description                  |
| ----------- | ------ | -------- | --------- | ---------------------------- |
| `children`  | node   | No       | undefined | The child elements to render |
| `className` | string | No       | undefined | Additional classNames to add |
