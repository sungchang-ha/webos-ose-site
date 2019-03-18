---
title: Luna Bus
id: luna-bus
date: 2019-01-31
full_link: /docs/guides/
short_description: >
  

aka: 
tags:
- architecture
---
Luna Bus is a system bus used by webOS OSE as the IPC mechanism used between components.

It is composed of:

* Client library - Provides API support to register on the bus and communicate with other components.
* Central hub daemon - Provides a central clearing house for all communication. Utilities for monitoring and debugging the bus are included.
