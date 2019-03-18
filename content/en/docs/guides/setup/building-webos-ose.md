---
title: Building webOS Open Source Edition
date: 2019-03-05
weight: 20
---

This page describes how to build the webOS Open Source Edition (OSE) image. Before you begin, ensure that your system meets the [Build System Requirements](http://webosose.org/discover/setting/requirements/#build_system_requirements).

## Repository

To build the image of webOS OSE, the `build-webos` repository is used.

The repository contains the top level code that aggregates the various [OpenEmbedded](http://openembedded.org/) layers into a whole from which the webOS OSE image can be built.

## Images

The following images can be built:

- `webos-image`: The production webOS OSE image without development tools.
- `webos-image-devel`: The image with various development tools added to `webos-image`, including GDB and strace (system call tracer).

## Cloning the Repository

Set up `build-webos` by cloning its Git repository and move into the cloned directory:

```bash
$ git clone https://github.com/webosose/build-webos.git
$ cd build-webos
```

## Installing the Required Tools

Before you can build, you need to install some tools. If you try to build without them, BitBake will fail a sanity check and tell you what's missing, but not really how to get the missing pieces. On Ubuntu, you can force all of the missing pieces to be installed by entering:

```bash
$ sudo scripts/prerequisites.sh
```

## Building

### Configuring the Build

To configure the build for Raspberry Pi 3 or QEMUx86 and to fetch the sources, type:

```bash
For Raspberry Pi 3
$ ./mcf raspberrypi3

For QEMUx86
$ ./mcf qemux86
```

#### Setting the Parallelism Values

You can use `-p` and `-b` options to set the make and BitBake parallelism values. The `-p` and `-b` options correspond to `PARALLEL_MAKE` and `BB_NUMBER_THREADS` variables described in [Yocto Project Development Tasks Manual](https://www.yoctoproject.org/docs/latest/dev-manual/dev-manual.html#speeding-up-a-build).

The default value for these options is 0, so the command above is equivalent to the following:

```bash
$ ./mcf -p 0 -b 0 raspberrypi3
```

Using 0 as arguments to these options sets the make and BitBake parallelism values to the number of CPU cores found on your computer, which means the build process will use all CPU cores.

If you do not want to use all CPU cores on your computer, use different values as arguments to `-p` and `-b` options.

### Building the Image

#### Building webos-image

To kick off a full build of webOS OSE, enter the following:

```bash
$ source oe-init-build-env
$ bitbake webos-image
```

Alternatively, you can enter:

```bash
$ make webos-image
```

This may take in the neighborhood of two hours on multi-core workstation with a fast disk subsystem and lots of memory, or many more hours on a laptop with less memory and slower disks.

{{< note >}}
For more details about BitBake, refer to the [BitBake Manual](https://www.yoctoproject.org/docs/latest/bitbake-user-manual/bitbake-user-manual.html).
{{< /note >}}

#### Building webos-image-devel

To build a webOS OSE image that includes GDB and strace for debugging, enter the following:

```bash
$ source oe-init-build-env
$ bitbake webos-image-devel
```

{{< note >}}
For details on setting up the environment to debug webOS OSE with GDB, see [Setting Up for GDB Debugging](http://webosose.org/discover/setting/setting-gdb-debugging/).
{{< /note >}}

{{< note >}}
For more information on how to use strace, refer to [the article on strace](https://www.thegeekstuff.com/2011/11/strace-examples/).
{{< /note >}}

## Cleaning

To blow away the build artifacts and prepare to do the clean build, you can remove the build directory and recreate it by typing:

```bash
$ rm -rf BUILD
```

```bash
$ ./mcf.status
```

What this retains are the caches of the downloaded source (under `./downloads`) and shared state (under `./sstate-cache`). These caches will save you a tremendous amount of time during development as they facilitate incremental builds, but can cause seemingly inexplicable behavior when corrupted. If you experience strangeness, use the command presented below to remove the shared state of suspicious components. In extreme cases, you may need to remove the entire shared state cache. See [Yocto Project Overview and Concepts Manual](https://www.yoctoproject.org/docs/latest/overview-manual/overview-manual.html#shared-state-cache) for more information on it.

## Building and Cleaning Individual Components

To build an individual component, enter:

```bash
$ source oe-init-build-env
$ bitbake <component-name>
```

Alternatively, you can enter:

```bash
$ make <component-name>
```

To clean a component's build artifacts under BUILD, enter:

```bash
$ source oe-init-build-env
$ bitbake -c clean <component-name>
```

To remove the shared state for a component as well as its build artifacts to ensure it gets rebuilt afresh from its source, enter:

```bash
$ source oe-init-build-env
$ bitbake -c cleansstate <component-name>
```