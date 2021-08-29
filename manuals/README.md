## 在 Windows 上使用
目前进度已允许项目在局域网环境下部署并使用。

### 客户端安装 (Windows)
0. 客户端需要有 Python 3.6 环境
1. 在 [windows](https://github.com/greats3an/ggposrv3/tree/master/manuals/windows) 目录下载所有文件到同一文件夹
2. 运行 `INSTALL.py`
3. <kbd>Windows</kbd> + <kbd>R</kbd> 运行，输入 `moscade://browse`
4. 将 Fightcade 的 FBNeo 放入该文件夹

### 局域网环境的部署
0. 环境需 Python 3.6+
1. 安装依赖 (又是[自己造的轮子](https://github.com/greats3an/pywebhost))

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
