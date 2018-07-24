### 启动/构建说明
```shell
npm i
npm start
```
```sh
npm run build  # then see build dir
# Note: you should remove `webpack-visualizer-plugin / webpack-bundle-analyzer` code in webpack.config.js file for production environment.
```
open http://localhost:8000/

### 特殊npm包、插件说明
bundle analyzer tools: 
[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) / 
[webpack-visualizer-plugin](https://www.npmjs.com/package/webpack-visualizer-plugin) 
(Note: [just for dist bundle file analyse](https://github.com/th0r/webpack-bundle-analyzer/issues/86))
