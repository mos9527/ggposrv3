## 在 Windows 上使用
目前进度已允许项目在局域网环境下部署并使用。

### 客户端安装 (Windows)
0. 客户端需要有 Python 3.6 环境
1. 在 [windows](https://github.com/greats3an/ggposrv3/tree/master/manuals/windows) 目录下载所有文件到同一文件夹
![image](https://user-images.githubusercontent.com/31397301/131235419-ad88fac1-14f8-4a97-953e-300ac39c449a.png)

2. 运行 `INSTALL.py`，安装接下来的注册表

3. 浏览器地址栏输入 `moscade://browse` 回车
  
4. 将 Fightcade FBNeo 复制到该文件夹 （若已安装 Fightcade , 可在 `文档 > Fightcade > emulator > fbneo` 找到）
![image](https://user-images.githubusercontent.com/31397301/131235462-414f9938-8fef-4969-bea5-d6a018c5e852.png) 

*客户端不依赖 Fightcade 其他组件运行*

文件结构应至少包含下列文件：

        ...
        │   LAUNCHER.py
        │   REGISTER.reg        
        └───fbneo
            │   fcadefbneo.exe            
            │   ggponet.dll
            ...           
5. 加入 ROM 等同配置 fc2

### 部署（LAN)
0. 环境需 Python 3.6+
1. 安装依赖 ([自己造的轮子](https://github.com/greats3an/pywebhost))

        pip install pywebhost
2. 运行 server.py
    参数：
        usage: server.py [-h] [--ggpo-port GGPO_PORT] [--client-port CLIENT_PORT]

        GGPO Python3 Server

        optional arguments:
        -h, --help            show this help message and exit
        --ggpo-port GGPO_PORT
                                GGPO portocol port
        --client-port CLIENT_PORT
                                HTTP/Websocket interface port

    默认端口：
    
        - 7000 : GGPO TCP 协议        
        - 8000 : Web 服务器
    
    运行 `python sever.py` 即可
