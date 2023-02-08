[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmovebit%2Fmaterials%2Fmain%2Fshields.json)](https://github.com/NonceGeek/MoveDID/blob/main/MoveDID-Audit-Report.pdf)

合约引擎由以下几个部分组成

basic_package 它提供了一个“干净”的RPG游戏最小化链上合约引擎的模版，提供了最基本的基础系统服务作为main_packge 的依赖包,可以通过basic_mackage::main::start 一键启动发布游戏

main_package 提供“自定义”的代码包空间，作为整个游戏的入口包，在这里可以自行修改业务逻辑

plugin_package 提供了来自社区“第三方”的插件模块，可作为依赖包引入提供强大的模组支持从而节省掉大量的成本