# webOS OSE website (WIP)

Welcome to the webOSE OSE website project! This is a work-in-progress effort for reimplementing the webosose.org site.

## Dependencies

This project is built upon the following tools and libraries.

* Static site generator: Hugo (extended)
* CSS framework: Bulma
* JS library: jQuery

### Hugo

[Hugo](https://gohugo.io/) is a static site generator written in Go.

This project uses a directory structure that requires Hugo's asset processing feature called Hugo Pipes. To build the project, you need an extended version of Hugo. For more information, refer to the links below:

* [Hugo extended version (from v0.43 and higher)](https://gohugo.io/news/0.43-relnotes/)
* [Hugo Pipes introduction](https://gohugo.io/hugo-pipes/introduction/#readout)

### Bulma

[Bulma](https://bulma.io/) is a free, open source CSS framework based on Flexbox.

### jQuery

[jQuery](https://jquery.com/) is a fast, small, and feature-rich JavaScript library.

## Getting started

**Note:** We will assume that you are using Windows.

### Installing tools

To build and test the project in your local environment, install the following tools:
* Git
* Hugo extended version

#### Git

Download and install the latest version of Git from the [official site](https://www.git-scm.com/), using the default setting.

#### Hugo extended version

In the [Hugo releases](https://github.com/gohugoio/hugo/releases) page, download an extended version of Hugo (with the name in `hugo_extended_0.**_***-64bit.***` format) and install the package.

**Note:** This site has been test with the extended version of Hugo v0.53 or higher.

For details on setup, you can refer to the following section for details:

* https://gohugo.io/getting-started/installing/#windows

### Preparing the code

1. Create your project directory (e.g. C:\Hugo\Sites\sampleSite) and `cd` into the directory.
2. Clone this repository.

```bash
git clone [repository name]
```

### Building the site

1. At the project root directory, enter the following command:

```bash
hugo server
```

2. When the build is completed, enter the address (`localhost:[port number]`) shown at the prompt into the browser address bar.

Locally built site will be displayed on the browser.

## Directory structure

TODO
