set -e

#  qWJ@hxy70^6&0@5

# 修改IP
server=root@47.245.10.219
port=22

#删除，打包
rm -rf ./build
npm run build

# 上传
scp -P $port -r ./build/* $server:/data/wwwroot/taikula.life
echo "site upload success"
bash