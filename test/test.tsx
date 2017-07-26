import * as React from "react"
import * as ReactDOM from "react-dom"

import {JsonPathPicker} from "../src/react-json-path-picker"

interface S {
    json: string
    path: string
    pathText: string
}

class Main extends React.Component<undefined, S> {
    constructor(props: any) {
        super(props)
        this.state = {
            json: null,
            path: null,
            pathText: ''
        }
        this.generate = this.generate.bind(this)
        this.mapPath = this.mapPath.bind(this)
    }
    _text = ''
    generate() {
        this.setState({
            json: this._text.trim() || '""'
        })
    }
    mapPath() {
        this.setState({
            path: this.state.pathText
        })
    }
    render() {
        return (<div>
            <div style={{width:'29%',height:800,float:'left',boxSizing:'border-box',paddingLeft:'30px',borderRight:'1px solid #888'}}>
                <textarea
                    style={{width:'80%',height:300}}
                    onChange={e=> this._text = e.target.value}
                />
                <p><button style={{width:'80%'}} onClick={this.generate}>generate</button></p>
                <textarea
                    style={{width:'80%',minHeight:'50px',boxSizing:'border-box',border:'1px solid #108ee9',padding:'10px'}}
                    onInput={(e: any)=> {
                        this.setState({
                            pathText: e.target.value
                        })
                    }}
                    value={this.state.pathText}
                />
                <p><button style={{width:'80%'}} onClick={this.mapPath}>map path</button></p>
            </div>
            <div style={{width:'70%',float:'left',boxSizing:'border-box',paddingLeft:'50px'}}>
                <JsonPathPicker
                    json={this.state.json}
                />
            </div>
        </div>)
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById("main")
)
