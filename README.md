# react-json-path-picker
It is a json path picker for react based on [json-path-picker](https://github.com/piotros/json-path-picker).
You can use it to create a json tree of any legal json string. And then you can click to choose a node in the tree and got the path string of the node from tree's root.

[demo](https://zenggo.github.io/react-json-path-picker/)

## install
`npm install --save-dev react-json-path-picker`

You need `webpack` to pack it in your app, and use `style-loader` and `css-loader` to ensure the component's style work.

## usage
path picker (fully controlled compoment):
```
<JsonPathPicker json={this.state.json} onChoose={this.onChoosePath} path={this.state.choosenPath} />

onChoosePath = (path)=> {...}
```

![](https://github.com/zenggo/react-json-path-picker/blob/master/pic/1.png?raw=true)


## tips
if you have a json string like '[{"x":1}, {"x":2}, {"x":3}]', you can click '"x":1' and then click button before'[', and then you have choosed three x attr in array and finally get path string '[*].x'

![](https://github.com/zenggo/react-json-path-picker/blob/master/pic/2.png?raw=true)


## dev
For development: `npm run dev`