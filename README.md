# DDD for Typescript

[![CodeQL Status](https://github.com/jatitoam/ddd-typescript/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/jatitoam/ddd-typescript/actions/workflows/codeql-analysis.yml)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/jatitoam/ddd-typescript/badges/quality-score.png?b=develop)](https://scrutinizer-ci.com/g/jatitoam/ddd-typescript/?branch=develop)
[![Build Status](https://scrutinizer-ci.com/g/jatitoam/ddd-typescript/badges/build.png?b=develop)](https://scrutinizer-ci.com/g/jatitoam/ddd-typescript/build-status/develop)

## What is this?

This repository intends to implement the architectural classes for any project that wants to base on [Eric Evans' Domain Driven Design](https://www.amazon.com/gp/product/0321125215/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321125215&linkCode=as2&tag=martinfowlerc-20).

## How is this organized

This project is organized in main directories, considering each of the base objects of DDD:

- Aggregates
- Builders
- Entities
- Factories
- Repositories
- Services
- ValueObjects

And additionally, some infrastructural objects:

- Errors
- Contracts (mainly for repositories)

## Alpha version

This is still alpha software, not completely functional, however if for some reason you found this and you think it's a promising project, feel free to collaborate by either [Suggesting something](https://github.com/jatitoam/ddd-typescript/issues/new) or simply fork it and send a pull request.

## Contributing

This repository is managed using the [Vincent Driessen's Successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model), so any contribution is welcome on a proper branch and the pull request must be sent to the [develop](https://github.com/jatitoam/ddd-typescript) branch of this project, where it will be reviewed before merging and properly tested before releasing.

## Acknowledgements

I found inspiration, snippets, resources and counseling by:

- [An Introduction to Domain-Driven Design - DDD w/ TypeScript](https://khalilstemmler.com/articles/domain-driven-design-intro/)

## License

Distributed under the GPL v.2 license. See [LICENSE](LICENSE) for more information.
