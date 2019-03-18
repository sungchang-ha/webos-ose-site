---
layout: blog
title: 'Bean Bird Bot: Building a web-app enabled robot with ROS2 and webOS'
date: 2019-01-27
---

**Authors:** Brian Shin (LG Electronics)

![Bean Bird Bot](/images/image1.jpg)

<center><i>Bean Bird Bot</i></center><br/>

One of the main advantages of the webOS platform lies in its strength in graphical capabilities on low-cost embedded platforms. Combined with the Enact framework, webOS offers a high-performance graphics stack for rendering web applications seamlessly on resource-constrained hardware. In addition to television and signage where webOS has traditionally been used, robotics offers another great application area for such capabilities.

We built the Bean Bird robot to demonstrate the capabilities of robotics software running on webOS Open Source Edition (OSE). The Bean Bird robot runs Robot Operating System 2 (ROS 2), a robotics middleware, on an inexpensive and accessible hardware platform, the Raspberry Pi 3. It has joystick control and sensors including camera, ultrasound, and range sensors. Furthermore, it displays a range of emotions and reacts to its environment, recognizes objects and displays them on its screen, and makes sounds based on the activity it is engaged in. This is made possible by an Enact-based web application running on the same Raspberry Pi hardware as the robotics platform.

Whether you are thinking of building a relatively inexpensive social robot or building educational robots, this post will show you how to build your own Bean Bird robot and leverage the webOS platform for your robotics needs, and detail our development process of creating a robotics software prototype for a specific application by combining webOS OSE and ROS2.

## How to build the robot

The Bean Bird robot is based off of the popular Duckietown platform first started at MIT and now maintained by the Duckietown Foundation. The basic Duckiebot hardware consists of the chassis, battery, camera, Raspberry Pi, Raspberry Pi motor hat, and motors/wheels. In addition, the Bean Bird adds a 7 inch Raspberry Pi touchscreen, a touchscreen case, an ultrasonic sensor, a time-of-flight distance sensor, and an Intel Neural Compute Stick for running deep learning models for image classification.

### Parts List

- Basic Duckiebot configuration parts, specifically DB17-wjd (2017 version) - [Link](https://docs.duckietown.org/DT17/opmanual_duckiebot/out/acquiring_parts_c0.html)
- Note: a battery capable of combined output of at least 4.5A is needed - [Link](https://www.amazon.com/gp/product/B075ZR4N99/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
- Specific joystick we use (EasySMX 2.4G Wireless controller) - [Link](https://www.amazon.com/EasySMX-Wireless-Controller-Gamepads-Vibration/dp/B01KV7B2CG/ref=sr_1_2?s=electronics&ie=UTF8&qid=1546976821&sr=1-2&keywords=easysmx+wireless)
- Official Raspberry Pi 3 Touchscreen 7” - [Link](https://www.amazon.com/Raspberry-Pi-7-Touchscreen-Display/dp/B0153R2A9I/ref=sr_1_3?ie=UTF8&qid=1546481915&sr=8-3&keywords=raspberry+pi+3+touchscreen)
- SmartPi Raspberry Pi 3 Touchscreen Mount - [Link](https://www.amazon.com/SmartiPi-Official-Raspberry-Touchscreen-Display/dp/B01HV97F64/ref=sr_1_fkmr0_3?ie=UTF8&qid=1546481392&sr=8-3-fkmr0&keywords=raspberry+pi+3+touchscreen+mount)
- HC-SR04 Ultrasonic sensor w/ mount - [Link](https://www.amazon.com/Smraza-Ultrasonic-Distance-Mounting-Duemilanove/dp/B01JG09DCK/ref=sr_1_5?ie=UTF8&qid=1546481197&sr=8-5&keywords=hc-sr04)
- VL6180X Time of flight distance sensor - [Link](https://www.amazon.com/Adafruit-VL6180X-Flight-Distance-Ranging/dp/B01N0ODI3Q/ref=sr_1_1?ie=UTF8&qid=1546481257&sr=8-1&keywords=vl6180x)
- Intel Movidius Neural Compute Stick - [Link](https://software.intel.com/en-us/movidius-ncs)
- Mini portable speaker - [Link](https://www.amazon.com/gp/product/B01NCQ5BAM/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
- Additional M2.5 screws, standoffs, washers, nuts - [Link](https://www.amazon.com/dp/B07JYSFMRY/ref=twister_B01HBV79JK?_encoding=UTF8&psc=1)
- Additional M3 screws, standoffs, washers, nuts - [Link](https://www.amazon.com/gp/product/B06Y5TJXY1/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1)
- Additional female and male jumper wires - [Link](https://www.adafruit.com/product/793), [Link](https://www.adafruit.com/product/1957)

### Building the Bean Bird robot

- You can find the instructions for assembling the basic Duckiebot configuration on the main Duckietown documentation site [here](http://docs.duckietown.org/DT18/opmanual_duckiebot/out/assembling_duckiebot_db18.html). 
  - The battery should power the Raspberry Pi and the motor board through the two dual outputs.
- After assembling the basic Duckiebot, add the touch screen to the touch screen mount and attach to the top of the chassis. The screen can be powered by connecting to the power headers on the motor board.
- Add the ultrasonic sensor to the front of the robot, preferably with a mount. You can connect it to the appropriate GPIO headers on the motor board/Raspberry Pi.
- Add the time-of-flight distance range sensor: you will need to connect to the motor board/Raspberry Pi I2C pins.

![img](/images/image2.jpg)

<center><i>Joystick controller used to control the robot</i></center><br/>

![img](/images/image3.jpg)

<center><i>Ultrasound and range sensor</i></center><br/>

### Running the robot

- Burn the SD card with webOS + ROS2 image after downloading from our [releases](https://github.com/lgsvl/build-ros2-lgsvl/releases) page. Currently with this image, on boot all necessary processes for running the robot will run, including the ROS2 nodes, user touchscreen Face web application, and OS services.
- Alternatively, you can build the OS image yourself by following the instructions on our README at our Github [repository](https://github.com/lgsvl/build-ros2-lgsvl). This will allow you to add to or make changes to the image before flashing the image to the SD card.
- Here is what the robot should do:
  - Respond to joystick control
  - Make facial expressions, play sounds as it moves
  - Recognize objects and show them on the screen
  - Stop when path is obstructed by obstacle or when it approaches a cliff
- After placing the SD card into the Raspberry Pi and booting, the robot should start up, the Face application will display, and you should be able to control the robot with the joystick.


![img](/images/image4.jpg)

<center><i>A fully assembled Bean Bird robot</i></center><br/>

## ROS2 on webOS

![img](/images/image5.png)

<center><i>The Yocto layers of Bean Bird Bot</i></center><br/>

### Bean Bird Yocto stack

Our work builds on open source contributions to the Yocto layer meta-ros. Continuing from an existing ROS2 pull request, we updated ROS2 Bitbake recipes (ament, ros2 core packages), added missing core packages, and fixed dependencies. 

We first upgraded the meta-ros2 layer to the latest release of ROS2 (Ardent). We added Bitbake recipes to build components necessary for running ROS2 itself efficiently on a Raspberry Pi, including python3-opencv, boost, an ament tool for python. Then, by taking the existing Yocto meta-layer for webOS, we added several components needed for hardware support, including touchscreen, I2C and GPIO, and joystick. We also added specific ROS2 core packages that were needed for our use case, including parts of the vision_opencv suite (cv_bridge and image_geometry) as well as support for the Intel Movidius SDK to communicate with the [Intel Neural Compute Stick](https://developer.movidius.com/). By including only components needed for the robot’s desired functionality, the system image itself avoids unnecessary overhead and maintains a small footprint.

The result is a fully buildable webOS distribution for the Raspberry Pi 3 capable of running ROS2 nodes as well as visual applications. Anyone can now add a Yocto layer with recipes for their own ROS2 packages.

### Robotics Capabilities

Our Beanbird robot is based on[ the Duckietown](http://duckietown.org/) project originally started at[ MIT](http://web.mit.edu/) and is capable of joystick control, object recognition through the Raspberry-Pi camera, visual reaction (facial expressions and sounds) and obstacle avoidance via integration of ultrasonic and IR proximity sensors. We integrate ROS2, which drives the perception, movement, and object recognition, with webOS, which drives the main web application UI that interacts with the surrounding environment.

![img](/images/image6.png)

<center><i>Core system components driving Beanbird bot.</i></center><br/>

We use the [ros2-web-bridge](https://github.com/RobotWebTools/ros2-web-bridge) project to allow web applications to communicate with ROS2 nodes. Ros2-web-bridge allows to access ROS2 topics from applications or frameworks which don’t have or cannot have ROS2 native bindings. Instead it implements custom [JSON-based protocol](https://github.com/RobotWebTools/rosbridge_suite/blob/develop/ROSBRIDGE_PROTOCOL.md) over websocket. When webapp pushes new message to websocket, the ros2-web-bridge receives it, converts to ROS2 native message and publishes it to other ROS2 nodes. Bridge also maintains list of subscribed topics and notifies websocket client about published messages from other ROS2 nodes.

One disadvantage of ros2-web-bridge is that it is not suitable for large amounts of data, such as images, as it introduces significant delay. Thus we extended ROS2 camera node to serve raw image data (jpeg) over plain HTTP server. Enact web applications can then easily access this HTTP endpoint.

### Enact Web Application

To create the UI for the robot, we used [Enact](http://enactjs.com), a React-based application framework.  The first step was to create the project.  We used Enact’s CLI tool to create the skeleton and then we used npm to install the roslib library. We did not need to do any additional setup our configuration of our development environment because Enact handled it all.

The second step was to begin coding the application. Because webOS allows us to use web technologies for native applications, we were able to quickly iterate on the app itself. Enact’s ‘serve’ feature updated the application with code changes in real time without having to stop, rebuild, and redeploy. Additionally, we could develop using the debugging features of desktop browsers and switch to the robot seamlessly.

![img](/images/image7.png)

<center><i>The Face Application UI with touchscreen controls</i></center><br/>

The application itself consists of two parts.  The first part is the expressive face.  To produce the face, a set of combinable behaviors was defined.  The behaviors control the rendering of facial elements and can combine to produce hundreds of unique expressions.  The second part is the interface to ROS.  We subscribed to the ROS topics we were interested in, which were mapped to facial expressions that we assigned in the configuration files. This, for example, allows us to match the object identification system to specific facial expressions and optional sounds.

The final step, once the application was complete, was to package it for deployment. We created an optimized production build of the application and packaged it using webOS tools. This was then installed onto the robot and configured to start when the robot powers on.

The source code is available on [Github](https://github.com/enactjs/face). As mentioned, the application can be served locally (follow the directions in the README.md file). If a connection to the robot cannot be established, mock data will be used automatically. Clicking on the robot face will bring up an ‘expression console’ for testing different combinations of expressions.

![img](/images/image8.png)

<center><i>The web-app enables dynamic facial expressions, animations, and features</i></center><br/>

## Next steps

There are several directions to take as next steps for a robot like Bean Bird Robot. One example is more autonomous behavior, such as lane following, localization, and navigation around a map. Furthermore, a developer could leverage the flexible web UI framework to build a robot that interacts with humans, can allow video calls, or stream content for education or entertainment.

![img](/images/image9.jpg)

<center><i>A lane-following Bean Bird robot</i></center><br/>

webOS OSE is a lightweight but powerful embedded Linux distribution that is worth thinking about for a robotics application. With the Enact framework, it is especially powerful for creating fully-featured and beautiful user-facing web applications that can communicate directly with the underlying robotics software. It is easy to get started, and all of the documentation is readily available for you to try directly. 

![img](/images/image10.jpg)

<center><i>Build one yourself!</i></center><br/>
