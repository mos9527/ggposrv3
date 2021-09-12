ggposrv3
==================================
自己搭建 Fightcade 兼容服务器！
# 使用
**注意：现行版本未实现内网穿透，玩家跨局域网联机需要异地组网**
## 客户端
### 配置
- 下载 [moscade-fbneo](https://github.com/greats3an/moscade-fbneo/releases)
- 如图，注册 `moscade://` 协议
  ![Registering moscade](https://user-images.githubusercontent.com/31397301/132114402-e837770b-3304-422f-8b6e-0e83d24eb8ee.png)
- 你已就绪！可以从网页客户端接受挑战了。

## 使用
在 Chrome,Firefox 等 Webkit 系浏览器内打开服务器所提供链接即可。进入后请先登陆（目前不需密码）
### 界面介绍
UI 设计很大程度上参考了 Fightcade 的原则；下图将解释客户端使用的一些逻辑。

![interface-introduction](https://user-images.githubusercontent.com/31397301/131545696-dce67f3c-01b8-4412-a80f-89ce74d2e1d8.png)
1. 登陆栏
2. 底部导航栏
3. 页面标题
4. 动态频道列表
   - 默认在 “大厅”
   - 点击可加入所选频道，并退出当前频道
5. 用户列表 & 聊天内容
   - 点击用户可选择进行 私信、挑战、观战
   - 🟢 绿色 用户可接受挑战
   - 🔴 红色 用户正在进行比赛
   - 🔵 蓝色 用户正在观战
   - ⚪ 灰色 自己，无法点击
   - 聊天有三种信息类型：
   - - 公屏 ：在 6.聊天框所发送，频道所有成员可见，并会保存的消息
   - - 私信 ：前文所述方式发送，仅双方可见，不保存
   - - 挑战 ：同私信；可选择接受或拒绝挑战。挑战拒绝后可以再次发起
6. 没截上图的聊天框 ( `д´)，按 Enter 发送信息，**限公屏**
7. 玩家状态：从左到右为 `P1/P2`,`玩家名`,`模拟器状态`,`玩家身份`,`玩家状态`
8. 比赛日志：
   - 取消挑战：可随时按下终止或取消已发送的挑战
   - 加入比赛：在对方接受挑战或观战时，比赛开始后显示；点击即可打开模拟器进行游戏
   - 私信 ： 功能同 5.

⑨.  模拟器 (MOSCade FBNeo):
   - 同 FC 模拟器，可按 T 发送游戏内私信，支持中文
   - 该消息可由观战者及玩家所见，观战者**不能**发送信息 (可能变动)
   - 一方退出模拟器将宣布挑战结束 （可能变动）   
   - 可在比赛时使用 Lua 脚本 （可能变动）

此外 Web 界面跟随系统深色模式

## 服务端
### 部署
需要 Python 3.6 环境。安装[依赖](https://github.com/greats3an/pywebhost) : `pip install pywebhost`
- 如需日志，则还需 `pip install coloredlogs`
- 若服务端与客户端在同一机器，确保客户端使用服务端的 LAN IP 访问
- 暂时没有内网穿透能力；跨局域网游玩还需配置异地组网：如 OpenVPN，ZeroTier 或 Hamachi,向日葵等。此时客户端及服务端需要在同一网络内

  注：[这家有可免费（限2客户端）试用的方案](https://www.uulap.com/nsvpc) ，可值得一试

最后运行 server.py 即可


    usage: server.py [-h] [--ggpo-port GGPO_PORT] [--client-port CLIENT_PORT]

    GGPO Python3 Server

    optional arguments:
      -h, --help            show this help message and exit
      --ggpo-port GGPO_PORT
                            GGPO portocol port
      --client-port CLIENT_PORT
                            HTTP/Websocket interface port

### 配置
服务器**启动时**会从执行目录下读取这些文件作为配置：
- `config/banners.json` - 可选；若存在，则读取作为动态横幅资源。格式：

		{
			"频道名称":"横幅背景视频路径"
		}

- `config/channels.json` - 可选？；若存在，则读取作为频道列表。格式：
可参考 [channels.json](https://github.com/greats3an/ggposrv3/blob/master/ggpo/config/channels.json)

		{
		 [
		  {
			"name":"频道名称（不建议非 ASCII 字符）",
			"desc":"频道说明（显示在列表上）",
			"rom":"游戏 ROM 名",
	          },{ ...		  
		 ]	
		}
无论该文件存在与否，`大厅` 一直都在
# Credit
[poliva/ggposrv - 协议支持](https://github.com/poliva/ggposrv)


还有在从 PoC 坚持到现在帮忙测试的朋友们 ( ` ・´)
