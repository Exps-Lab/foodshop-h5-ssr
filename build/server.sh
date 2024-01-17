#!/usr/local/bin/bash

#################################
### 循环build server的入口文件 ####
################################

serverEntry="*.entry.server.js"

find ./src/pages -name $serverEntry > ./build/temp.txt
readarray -t files < ./build/temp.txt

for ((i=0; i<${#files[@]}; i++))
do
  if [ $i -eq 0 ]; then
    vite build --ssr ${files[i]} --outDir hi-user-ssr/server
  else
    vite build --ssr ${files[i]} --outDir hi-user-ssr/server --emptyOutDir=false
  fi
done

rm ./build/temp.txt
