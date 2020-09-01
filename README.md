<p align="left">
   <img src=".github/logo.png" width="200"/>
</p>

# Hotseat

> Manage customers and services of your barber shop

> [Click here to see the database model](https://dbdiagram.io/d/5ebff54e39d18f5553ff4c44)

> [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=TypeORM%20Relations&uri=https%3A%2F%2Fraw.githubusercontent.com%2FLauraBeatris%2Fhotseat-api%2Fmaster%2F.github%2Ftypeorm_relations.json)

[![Author](https://img.shields.io/badge/author-LauraBeatris-1D71AB?style=flat-square)](https://github.com/LauraBeatris)
[![Languages](https://img.shields.io/github/languages/count/LauraBeatris/hotseat-api?color=%231D71AB&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/LauraBeatris/hotseat-api?color=1D71AB&style=flat-square)](https://github.com/LauraBeatris/hotseat-api/stargazers)
[![Forks](https://img.shields.io/github/forks/LauraBeatris/hotseat-api?color=%231D71AB&style=flat-square)](https://github.com/LauraBeatris/hotseat-api/network/members)
[![Contributors](https://img.shields.io/github/contributors/LauraBeatris/hotseat-api?color=1D71AB&style=flat-square)](https://github.com/LauraBeatris/hotseat-api/graphs/contributors)

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [FAQ](#postbox-faq)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

# :rocket: Features

* 💈&nbsp; Appointment and schedule management
* 👦🏼&nbsp; Create providers and customers
* 🔐&nbsp; Authentication flow with password reset
* 🗄&nbsp; Update files with the Amazon S3 API
* 📨&nbsp; Send emails with Amazon SES

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```
git clone https://github.com/LauraBeatris/hotseat-api.git
```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you use a SSH key registered in your Github account, clone the project using this command:

```
git clone git@github.com:LauraBeatris/hotseat-api.git
```

**Install dependencies**

```
yarn install
```

Or

```
npm install
```

Create your environment variables based on the examples of ```.env.example```

```
cp .env.example .env
```

After copying the examples, make sure to fill the variables with new values.

**Setup a database**

You must install [Docker](https://www.docker.com/) in your machine, fill the environment values related to database configurations and then run the following commands in order to create Postgres, Mongo and Redis containers.

```docker-compose up```

# :runner: Getting Started

Run the transactions in order to configure the database schema

```yarn typeorm migration:run```

Run the following command in order to start the application in a development environment:

```yarn dev:server```

# :postbox: Faq

**Question:** What are the technologies used in this project?

**Answer:** The technologies used in this project are [NodeJS](https://nodejs.org/en/) + [Express Framework](http://expressjs.com/en/) to handle the server and [TypeORM](https://typeorm.io/#/)

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [Hotseat API](https://github.com/LauraBeatris/hotseat-api/issues) repository. If you already found a solution to your problem, **I would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/LauraBeatris/hotseat-api/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :tada: Contributing

Check out the [contributing](https://github.com/LauraBeatris/hotseat-api/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

Released in 2020.
This project is under the [MIT license](https://github.com/LauraBeatris/hotseat-api/master/LICENSE).

Made with love by [Laura Beatris](https://github.com/LauraBeatris) 💜🚀
