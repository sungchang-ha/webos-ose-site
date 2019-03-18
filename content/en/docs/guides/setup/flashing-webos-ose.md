---
title: Flashing webOS Open Source Edition
date: 2019-03-05
weight: 30
---

This page provides details for flashing the webOS Open Source Edition (OSE) image to a microSD card. In addition, this page describes how to verify the flashed image on the target device.

## Prerequisites

Before you begin flashing the webOS OSE image, make sure you have completed the following:

* You must build the webOS OSE image on a Linux machine. For more information, see [Building webOS OSE](http://webosose.org/discover/setting/building-webos-ose/).
  * To flash the image from Windows or macOS, you must download the built image from the Linux machine to the host machine.
* You must insert a microSD card in the microSD card reader device connected to the host machine.

## Flashing the Image

This section describes how to flash the webOS OSE image (.rpi-sdimg) to a microSD card, for each host operating system.

### Windows

Flash the image using [Win32DiskImager](https://sourceforge.net/projects/win32diskimager/).

### Linux

First, change directory to where the image is located.

```bash
$ cd <path where the image is located>
```

Check the device name of the microSD card using the following command.

```bash
$ sudo fdisk -l
```

Run the commands as below to flash the image to the microSD card.

```bash
$ sudo umount /dev/sdXn
$ sudo dd bs=4M if=./**.rpi-sdimg of=/dev/sdX
$ sudo umount /dev/sdXn
```

* `sdXn` denotes the device name of the microSD card, where `n` is a number suffix.
* For `dd` command, you must pass `sdX` (without the suffix number) to the `of` operand. `sdX` indicates the mass storage device, not the partition.

{{< note >}}
After you run the `dd` command, the shell prompt will not display any message until the job is finished. Even if there is no message, you need to wait until the copying process is complete. For more information on `dd` command, see the [Wikipedia page on dd](https://en.wikipedia.org/wiki/Dd_(Unix)).
{{< /note >}}

#### Flashing Command Example for Linux

```bash
$ sudo umount /dev/sdb1
$ sudo dd bs=4M if=./webos-image-raspberrypi3.rootfs.rpi-sdimg of=/dev/sdb
$ sudo umount /dev/sdb1
```

### macOS

First, change directory to where the image is located.

```bash
$ cd <path where the image is located>
```

Check the device name of the microSD card using the following command.

```bash
$ diskutil list
```

Run the commands as below to flash the image to the microSD card.

```bash
$ sudo diskutil umountDisk /dev/diskn
$ sudo dd bs=4m if=./**.rpi-sdimg of=/dev/rdiskn
$ sudo diskutil umountDisk /dev/diskn
```

* `diskn` denotes the device name of the microSD card, where `n` is a number suffix.
* For `dd` command, you must pass `rdiskn` to the `of` operand to speed up the copying process.

{{< note >}}
* If you receive the error "*dd: bs: illegal numeric value*" while running the `dd` command, make sure that the value of the `bs` operand is 4m (with lowercase "m").
* After you run the `dd` command, the shell prompt will not display any message until the job is finished. Even if there is no message, you need to wait until the copying process is complete. For more information on `dd` command, see the [Wikipedia page on dd](https://en.wikipedia.org/wiki/Dd_(Unix)).
{{< /note >}}

#### Flashing Command Example for macOS

```bash
$ sudo diskutil umountDisk /dev/disk2
$ sudo dd bs=4m if=./webos-image-raspberrypi3.rootfs.rpi-sdimg of=/dev/rdisk2
$ sudo diskutil umountDisk /dev/disk2
```

## Verifying the Image

After you finish flashing the webOS OSE image to the microSD card, you can check how it works by taking the following steps:

1. First, eject the microSD card from the reader device and insert it in the target device, Raspberry Pi 3.
2. Connect the target device with peripheral devices.
    * Connect the target device with a monitor through HDMI cable.
    * Plug a keyboard and a mouse into the USB ports of the target device.
    * Connect Ethernet cable to the target device.
3. Set the input mode of the monitor to the port connected with the target device.
4. Plug the power cable into the target device. The target device will boot up. Wait until the start-up screen with webOS OSE logo appears on the screen.
5. Press Windows key on the keyboard, and you will see the Home Launcher UI popping up from the right side of the screen. Home Launcher should contain a list of pre-installed apps and an icon for Settings app, as shown in the figure below.
