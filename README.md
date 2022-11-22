ggposrv3
==================================
自己搭建 GGPO / Fightcade 私服.
# 测试

## 私服客户端
### 配置
- 下载 [moscade-fbneo](https://github.com/greats3an/moscade-fbneo/releases)
## 服务端
### 部署
需要 Python 3.6+ 环境。安装[依赖](https://github.com/greats3an/pywebhost) : `pip install pywebhost`
- 如需日志，则还需 `pip install coloredlogs`

最后运行 server.py 即可

      usage: server.py [-h] [--port PORT]

      GGPO Python3 Server

      options:
      -h, --help   show this help message and exit
      --port PORT  HTTP/TCP/UDP port

服务单口复用，请务必配置防火墙以允许 UDP/TCP 同时通行

### 配置
服务器**启动时**会从执行目录下读取这些文件作为配置：
- `config/channels.json` - 可选？；若存在，则读取作为频道列表。格式：
可参考 [channels.json](https://github.com/greats3an/ggposrv3/blob/master/config/channels.json)

		{
		 [
		  {
			"name":"频道名称",
			"desc":"频道说明（显示在列表上）",
			"rom":"游戏 ROM 名",
	          },{ ...		  
		 ]	
		}
- `banners` - 可选。存放以频道名称为文件名的 PNG，作横幅使用。
- `sounds` - 可选。存放音效，可参考提供的文件夹。
- `portraits` - 可选。作游戏角色贴图,格式如下：

         portraits
         |- p1
         |--- jotaro.png
         ...
         |- p2
         |--- jotaro.png
         |--- dio.png
         ...

角色名依照 detector.inf 定义,详情移步 [How to make Fightcade Memory Detectors](https://docs.google.com/document/d/1IMCigksPxRL0Vg1c0N1OucGL20qXj6y5JVVP_255R-o/edit)

# Credit
[poliva/ggposrv - GGPO Tcp协议逆向](https://github.com/poliva/ggposrv)

还有在从 PoC 坚持到现在帮忙测试的朋友们 👍
