const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// CkEditor5 
const {styles} = require('@ckeditor/ckeditor5-dev-utils');
const { webpack } = require('webpack');

module.exports={
    
    entry:["./src/index.js"],
    plugins:[
        new HtmlWebPackPlugin({
            title:'Caching',
            template:path.join(__dirname,'public/index.html'),
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'style.css'
        }),
        
    ],
    output:{
        filename:"[name].[contenthash].js",
        path:path.join(__dirname,'build'),
        publicPath:'/',
    },
    optimization: {
        minimize:true,
        minimizer:[new TerserPlugin()],
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
       splitChunks: {
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendors',
             chunks: 'all',
           },
         },
       },
      },
    
    resolve:{
        extensions:['.js','.jsx','css','ts','svg'],
        modules:['node_modules'],
        alias:{
            'quill$': require.resolve('quill')
        }
    },

    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:path.join(__dirname,'node_modules'),
                
               use:[{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            
                            '@babel/preset-react'
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                  // https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
                                  corejs: 3,
                                  proposals: true,
                                },
                              ],
                            ['import',{libraryName:'antd', style:true}],
                            
                            
                        ]

                    }
                    
                }]
                
                
            },
            
         
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options:{minimize:true}
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader'],
                exclude: [
                    // cssModuleRegex,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                ],
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig( {
                                themeImporter: {
                                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                                },
                                minify: true
                            } )
                        }
                    }
                ]
            },
            
         
           
            {
                test : /\.(png|svg|jpg|gif)$/,
                use:['file-loader'],
                exclude: [
                    /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
                ],    
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    
                        loader: 'less-loader', 
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                              }
                        }
                    
                }]
            },
         
        {
            test: /\.svg$/,
            use: [{
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }]
          }
        ]
    },
    
};