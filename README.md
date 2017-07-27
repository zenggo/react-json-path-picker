# react-json-path-picker
It is a json path picker for react based on [json-path-picker](https://github.com/piotros/json-path-picker).
You can use it to create a json tree of any legal json string. And then you can click to choose a node in the tree and got the path string of the node from tree's root.

[try it online](https://zenggo.github.io/react-json-path-picker/)

## install
`npm install --save-dev react-json-path-picker`

You need `webpack` to pack it in your app, and use `style-loader` and `css-loader` to ensure the component's style work.

## usage
only show json tree:
```
// json need to be string or null
<JsonPathPicker json={this.state.json} showOnly />
```

path picker:
```
// every time state.json changes will cause JsonPathPicker reflush, and the pick state will reset
<JsonPathPicker json={this.state.json} onChoose={this.onPickPath} />

onPickPath = (path)=> {...}
```

![](https://github.com/zenggo/react-json-path-picker/blob/master/pic/1.png?raw=true)

and you can use path prop to controll it:
```
<JsonPathPicker json={this.state.json} path={this.state.path} onChoose={this.onPickPath} />

onPickPath = (path)=> {
  this.setState({path})
  ...
}
```

## tips
if you have a json string like '[{"x":1}, {"x":2}, {"x":3}]', you can click '"x":1' and then click button before'[', and then you have choosed three x attr in array and finally get path string '[*].x'

![](https://github.com/zenggo/react-json-path-picker/blob/master/pic/2.png?raw=true)
