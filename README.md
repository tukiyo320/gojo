# gojo
[![SUSHI-WARE LICENSE](https://img.shields.io/badge/license-SUSHI--WARE%F0%9F%8D%A3-blue.svg)](https://github.com/MakeNowJust/sushi-ware)

The building simulator for 「新幕・桜降る代に決闘を」

## Project setup
### step1
```
yarn install
```

### step2
- download "furuyoni commons"
  - https://main-bakafire.ssl-lolipop.jp/furuyoni/na/rule.html
- copy required card images
  - `furuyoni_commons_na/furuyoni_na/cards/*.png` to `src/assets/cards/`
  - [recommend] convert png to webp because furuyoni commons images size is too large

## how to run
```
yarn serve
```

## how to deploy
```
yarn build
```

then, run deploy script (ex: `firebase deploy`)

## how to contribution
1. fork this repository
1. create branch `git checkout -b feature-branch`
1. write code :D
1. commit changes `git commit -m 'some features'`
1. push the branch `git push origin feature-branch`
1. send pull request

## license
*THE SUSHI-WARE LICENSE*

[TukiyoIgarashi](https://twitter.com/tukiyo320) wrote this file.

As long as you retain this notice you can do whatever you want
with this stuff. If we meet some day, and you think this stuff
is worth it, you can buy me a **sushi 🍣** in return.

(This license is based on ["THE BEER-WARE LICENSE" (Revision 42)].
 Thanks a lot, Poul-Henning Kamp ;)

["THE BEER-WARE LICENSE" (Revision 42)]: https://people.freebsd.org/~phk/

### notice
The Copyright of 「桜降る代に決闘を」 and their resources belongs to BakaFire/TOKIAME
