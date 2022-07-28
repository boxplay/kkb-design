#!/bin/bash
echo "\033[32m 开始copy文档到【fedocs项目】中...\033[0m"
# 复制 同目录的fedocs项目中
cp -rf ./docs/* ../fedocs/docs/kkb-design

if [ $? -eq 0 ]; then
  echo "\033[32m 更新文档成功！\033[0m"
  echo "\033[32m 请手动push提交【fedocs项目】代码！\033[0m"
else
  echo "\033[31m 更新文档失败！\033[0m"
  exit 1
fi
