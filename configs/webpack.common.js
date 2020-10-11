const path = require('path')

module.exports = {
    entry: path.join(__dirname, "../example/app.tsx"),
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
}