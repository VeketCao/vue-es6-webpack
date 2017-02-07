/**
 * Created by Veket on 2016/11/10.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//生成一个HTML文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//可以把css从js中抽离出来
const path = require('path');
const buildPath = path.resolve(__dirname,'dist');
const nodeModulesPath = path.resolve(__dirname,'node_modules');
const srcDir = path.resolve(process.cwd(),'src');
const libDir = path.resolve(srcDir, 'js/lib');
const glob = require('glob');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

/**考虑多页面应用，多个入口文件**/
const _entries = {};
const fileNames=[];
const jsDir = path.resolve(srcDir,'js/entry');
const entryFiles = glob.sync(`${jsDir}/*.js`);
entryFiles.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.'));
    _entries[filename] = filePath;
    fileNames.push(filename);
});

module.exports = (() => {
    const htmlPlugins = () => {
        const entryHtml = glob.sync(`${srcDir}/html/*.html`);
        const rtn = [];
        entryHtml.forEach((filePath) => {
            const filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
            const cfg = {
                template:`${filePath}`,
                filename:`${filename}.html`,
                favicon:`${srcDir}/img/favicon.ico`,
                chunksSortMode:'dependency'
            };
            if(filename in _entries){
                cfg.inject = 'body';
                cfg.chunks = ['vendor','common',filename];
            }
            rtn.push(new HtmlWebpackPlugin(cfg));
        });
        return rtn;
    };

    const config = {
        resolve:{
            alias:{
                vue$:`${nodeModulesPath}/vue/dist/vue.js`,
                img:`${srcDir}/img`,
                fonts:`${srcDir}/fonts`
            },
            extensions:['', '.js','.vue', '.css', '.scss', '.png', '.jpg']
        },
        entry:Object.assign(_entries, { vendor: ['vue','vue-router'] }),
        output:{
            path:buildPath,
            filename:'js/[hash:8].[name].min.js',
        },
        plugins:[
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
                __DEV__:false,
                __PROD__:true
            }),
            new CommonsChunkPlugin({
                names: ['common', 'vendor'],
                minChunks: 2,
            }),
            new UglifyJsPlugin({
                compress: { warnings: false},
                mangle: { except: ['$super', '$', 'exports', 'require']}
            }),
            new ExtractTextPlugin('css/[contenthash:8].[name].min.css'),
            new webpack.ProvidePlugin({'_': "underscore",'Vue':'vue'})
        ].concat(htmlPlugins()),

        module:{
            loaders: [
                {
                    test: /\.vue$/,
                    loader: 'vue'
                },
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: [nodeModulesPath],
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('vue-style', 'css!postcss?parser=postcss-scss'),
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('vue-style', 'css!sass!postcss?parser=postcss-scss'),
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loaders: [
                        'image-webpack?{progressive:true, optimizationLevel: 4, ' +
                        'interlaced: false, pngquant:{quality: "65-90", speed: 4}}', // 压缩图片
                        'url?limit=10000&name=img/[hash:8].[name].[ext]', // 小于10kb的图片base64格式内联到css文件中。
                    ],
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
                },
            ]
        },
        vue:{
            loaders: {
                js: 'babel',
                css: ExtractTextPlugin.extract('vue-style', 'css!postcss?parser=postcss-scss'),
                sass: ExtractTextPlugin.extract('vue-style', 'css!sass!postcss?parser=postcss-scss')
            }
        },
        // postcss 插件
        postcss: () => [
            require('precss'),
            require('autoprefixer'),
            require('postcss-color-gray'),
            require('postcss-css-variables'),
            require('postcss-custom-media'),
        ],
    };

    return config;

})();







