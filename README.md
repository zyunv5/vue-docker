# pm2 部署node
## 修改serve里面的Dockerfile
```
FROM node                 # 引入Node
COPY . /node-project              # 把当前目录所有内容拷贝到目录/node-project。拷贝内容受.dockerignore影响
WORKDIR /node-project             # 指定容器的工作目录为 /node-project 
RUN npm set registry https://registry.npm.taobao.org/ # 更换淘宝镜像
RUN npm install pm2 -g            # 全局安装 pm2
RUN npm install                   # 安装项目依赖
EXPOSE 3001                       # 曝露容器端口
CMD ["pm2-runtime", "./app.js"]   # 执行启动命令
```
## 构建image
> docker build -t nodepm2:v1.0 .

## 启动容器
docker container run --name server-pm2-demo -p 4001:3001 -it nodepm2:v1.0

<!-- docker run -it -p 3001:3001 –name learn-app –link mongodb:mongoDB nodepm2:v1.0 -->
docker run -d --name nodeapp --link=mongo:mongo -p 3001:3001 nodepm2:v1.0