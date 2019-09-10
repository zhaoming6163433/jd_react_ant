const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path')
module.exports = override(
    //按需加载antd的组件
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    //配置less
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    //设置绝对路径
    addWebpackAlias({        
        ["services"]: path.resolve(__dirname, "src/services"),        
        ["components"]: path.resolve(__dirname, "src/components")   
    }),
    (config) => {
        config.module.rules[2].oneOf[5].use.push({
            loader: 'sass-resources-loader',
            options: {
                resources:  [
                path.resolve(__dirname, 'src/assets/css/common/common_color.scss'),
                path.resolve(__dirname, 'src/assets/css/common/mixin.scss')
                ]
            }
        })
        return config
    }
);
