const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
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
            }
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
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            
           
            {
                test : /\.(png|svg|jpg|gif)$/,
                use:['file-loader']
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
        {
            test:/\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use:[
                {
                    loader:'babel-loader'
                },
                {
                    loader:'@svgr/webpack',
                    options:{
                        babel:false,
                        icon:true,
                    }
                }
            ]
        }
            
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
        
    ]
};