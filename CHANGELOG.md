# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.13.1](///compare/v1.13.0...v1.13.1) (2022-12-24)


### Bug Fixes

* add padding for footer 3947989

## [1.13.0](///compare/v1.12.0...v1.13.0) (2022-12-24)


### Features

* add basic position-interests and exploring 892671a


### Bug Fixes

* make interest messages parsable again f9d5a83

## [1.12.0](///compare/v1.11.0...v1.12.0) (2022-12-21)


### Features

* implement interest exploring / voting 58efdd8


### Bug Fixes

* **ui:** show nav links centered on mobile with correct scrolling 44874d9
* **ui:** use string-translation for placeholder 56048b7

## [1.11.0](///compare/v1.10.1...v1.11.0) (2022-12-20)


### Features

* add prisma tracing f38118d

### [1.10.1](///compare/v1.10.0...v1.10.1) (2022-12-20)

## [1.10.0](///compare/v1.9.0...v1.10.0) (2022-12-19)


### Features

* add deployments to newrelic 0af9dfa

## [1.9.0](///compare/v1.8.2...v1.9.0) (2022-12-19)


### Features

* add basic new relic and logging packages b3edef0

### [1.8.2](///compare/v1.8.1...v1.8.2) (2022-12-19)


### Bug Fixes

* correctly apply push options a952492

### [1.8.1](///compare/v1.8.0...v1.8.1) (2022-12-19)


### Bug Fixes

* allow non-partnered accounts to be partnerd again ba071ac

## [1.8.0](///compare/v1.7.0...v1.8.0) (2022-12-19)


### Features

* try out icons and badges in notifications b995a98


### Bug Fixes

* allow resubscription for push notifications 72c31ca
* handle stale push connections correctly 5881bd9

## [1.7.0](///compare/v1.6.1...v1.7.0) (2022-12-19)


### Features

* allow logout on account page af92f68
* remember login as default 50a9adb
* show navigation on desktop too 039afee

### [1.6.1](///compare/v1.6.0...v1.6.1) (2022-12-19)


### Bug Fixes

* handle language cache via service worker a5e8166

## [1.6.0](///compare/v1.5.0...v1.6.0) (2022-12-19)


### Features

* implement feature-gates f43b708
* implement serviceWorker and notification basics 6f677e0
* implement translations for push notifications 915b4d4
* move tracking onto own page 7a115f2
* send notification if both partners are in the mood 2d6cb65


### Bug Fixes

* only show navigation once logged in 3e66e3f

## [1.5.0](///compare/v1.4.0...v1.5.0) (2022-12-18)


### Features

* add app icon and manifest 8b08fdb
* implement basic mood tracking edebefb
* implement linking partner accounts 80b2478


### Bug Fixes

* allow to accept partner requests 754c95d

## [1.4.0](///compare/v1.3.2...v1.4.0) (2022-12-17)


### Features

* implement editing of previous sex acts b8d1dea
* **timeline:** only show expired days as not-tracked 7dcc072
* **timeline:** show finishing of acts 37bc341


### Bug Fixes

* **timeline:** include current day, but show it not for missing track-days 305ae29

### [1.3.2](///compare/v1.3.1...v1.3.2) (2022-12-17)


### Bug Fixes

* **nav:** show on small devices (<=tablets) 7f7a851

### [1.3.1](///compare/v1.3.0...v1.3.1) (2022-12-17)


### Bug Fixes

* **nav:** show on devices without pointer 00c079f

## [1.3.0](///compare/v1.2.0...v1.3.0) (2022-12-17)


### Features

* **ui:** implement navigation for touch devices 1467b87

## [1.2.0](///compare/v1.1.0...v1.2.0) (2022-12-16)


### Features

* **i18n:** implement translations 0a1b9af

## [1.1.0](///compare/v1.0.0...v1.1.0) (2022-12-10)


### Features

* **timeline:** show multiple sex acts on same date b243b03


### Bug Fixes

* **sex-act-form:** dont show duplicate options 92c22c8
* **sex-act-form:** show previously entered data as options d9f75fa
* **timeline:** dont break with sex on current date e9696ed

## 1.0.0 (2022-12-10)


### Features

* track period 4702c6a


### Bug Fixes

* show correct days for last entry 7b05f79
* show period for last entry 97426ed
