---
title: System Requirements
date: 2019-03-05
weight: 10
---

Before you set up an environment for webOS Open Source Edition (OSE) development, make sure that you prepare the target device and systems that meet the following requirements.

{{< note >}}
webOS OSE cannot be built directly on the target device. You must use a separate Linux machine that meets the [Build System Requirements](http://webosose.org/discover/setting/requirements//#build_system_requirements).
{{< /note >}}

## Target Device Requirements

webOS OSE is optimized for **Raspberry Pi 3**. To test apps and components on Raspberry Pi 3, we recommend that you prepare the following set of hardware and peripheral devices.

* Raspberry Pi 3
* microSD card (8 GB or larger) and microSD card reader device
* HDMI-compliant monitor and cable
* Input devices such as a keyboard and a mouse
* Ethernet cable and internet connection

{{< note >}}
webOS OSE 1.0 officially supports **[Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)**.
{{< /note >}}

## Build System Requirements

To build webOS OSE image, you need a **Linux** machine. Building under Windows or macOS is currently not supported.

### Operating System

webOS OSE can be built on the 64-bit version of Ubuntu Long Term Support (LTS) releases, including:

* Ubuntu 14.04 LTS (Trusty Tahr) 64-bit
* Ubuntu 16.04 LTS (Xenial Xerus) 64-bit
* Ubuntu 18.04 LTS (Bionic Beaver) 64-bit

{{< caution >}}
We strongly recommend you NOT to use Linux virtual machine on Windows or macOS for building webOS OSE, as it may cause unexpected issues.
{{< /caution >}}

### Hardware

| | Minimum requirements | Recommended |
| --- | --- | --- |
| CPU | Intel i5 dual-core with 4 threads | Intel i7 quad-core with 8 threads or higher |
| RAM | 8 GB | 16 GB or higher |
| Storage | HDD with 100 GB of free disk space | SSD with 100 GB of free disk space or more |

### Software Tools

Before you start building webOS OSE, you need to install and set up the following tools.

#### Git

You need to [set up Git](https://help.github.com/articles/set-up-git) in your build system.

{{< note >}}
Make sure that you follow [Connecting over SSH](https://help.github.com/articles/set-up-git/#connecting-over-ssh) in [Authenticating with GitHub from Git](https://help.github.com/articles/set-up-git/#next-steps-authenticating-with-github-from-git).
{{< /note >}}

#### Python

Install [Python](https://www.python.org) in your build system to proceed with the build process.

## Host Machine Requirements

On the host machine, you can flash the built image to the target device  or use SDK tools for further development processes. You can use Linux, Windows, or macOS for the host machine.

{{< note >}}
The build system (Linux machine) can be also used as a host machine for further development processes.
{{< /note >}}

### Operating System

Recommended version for each operating system are as follows:

* Linux: Ubuntu 14.04 LTS or higher
* Windows: Windows 7 or higher
* macOS: Mac OS X 10.6 Snow Leopard or higher

### Tools for Enact-based App Development

To develop an app using Enact library, you need to install [Node.js](https://nodejs.org). For information on the suitable version, refer to [Enact Installation](http://enactjs.com/docs/developer-tools/cli/installation/) page.
