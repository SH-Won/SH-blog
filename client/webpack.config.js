const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');

// CkEditor5 
const {styles} = require('@ckeditor/ckeditor5-dev-utils');

const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
// import CKEditorPlugin from '@ckeditor/ckeditor5-dev-webpack-plugin'
// const {CleanWebpackPlugin} =require('clean-webpack-plugin');
// const webpackConfig = {
//     alias: {
//       // Other aliases
//       redux: require.resolve("redux"),
//     }
//   }
module.exports={
    entry:["babel-polyfill","./src/index.js"],
   
    
    output:{
        filename:"[name].js",
        path:path.join(__dirname,'build'),
        publicPath:'/'
        
    },
    mode:'development',
    resolve:{
        extensions:['.js','.jsx','css'],
        modules:['node_modules'],
        
        // alias: {
        //     'react-redux': require.resolve('react-redux'),
        //     'redux': require.resolve("redux"),
        //   },
    },
    devServer:{
        contentBase:path.join(__dirname,'build'),
        //publicPath:'/',
        //index:'index.html',
        host:'localhost',
        // host:'0.0.0.0',
        port:3000,
        open:true,
        compress:true,
        historyApiFallback:true,
       /* historyApiFallback:{
            rewrites:[
                {from: /^\/post/, to:path.join(__dirname,'build/index.html')}
            ]
        },
        */
        proxy:{
            '/api/':{
                target:'http://localhost:5000',
                changeOrigin:true,
            },
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
                            ['import',{libraryName:'antd', style:true}]
                            
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
                // name: 'static/media/[name].[hash:8].[ext]',
            
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
          /*  {
                loader:'webpack-ant-icon-loader',
                enforce:'pre',
                include:[
                    require.resolve('@ant-design/icons/lib/dist')
                ]
            }
            
           {
               test:/\.json$/,
               loader:"json-loader"
           }
           */

        //    {
        //     test:/\.json$/,
        //     loader:"json-loader"
        // },

        // {
        //     test:/\.svg(\?v=\d+\.\d+\.\d+)?$/,
        //     use:[
        //         {
        //             loader:'babel-loader',
        //             options:{
        //                 presets:[
        //                     '@babel/preset-env',
                            
        //                     '@babel/preset-react'
        //                 ],
        //             }
        //         },
        //         {
        //             loader:'@svgr/webpack',
        //             options:{
        //                 babel:false,
        //                 icon:true,
        //             }
        //         }
        //     ]
        // },

        // {
        //     // Match files from the `ckeditor5` package but also `ckeditor5-*` packages.
        //     test: /(ckeditor5(?:-[^\/\\]+)?)[\/\\].+\.js$/,
        //     use: [
        //         {
        //             loader: 'babel-loader',
        //             options: {
        //                 presets: [ require( '@babel/preset-env' ) ]
        //             }
        //         }
        //     ]
        // },
        // {
        //     loader: require.resolve( 'file-loader' ),
        //     options: {
        //         // Exclude `js` files to keep the "css" loader working as it injects
        //         // its runtime that would otherwise be processed through the "file" loader.
        //         // Also exclude `html` and `json` extensions so they get processed
        //         // by webpack's internal loaders.
        //         exclude: [
                    
        //             /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        //             /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
        //         ],
        //         name: 'static/media/[name].[hash:8].[ext]',
        //     }
        // }
            
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:path.join(__dirname,'public/index.html'),
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'style.css'
        }),
        // new CKEditorWebpackPlugin({
        //     language:'ko',
        //     additionalLanguages:'all',
        // })
    ]
};