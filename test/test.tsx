import * as React from "react"
import * as ReactDOM from "react-dom"

import {JsonPathPicker} from "../src/react-json-path-picker"

interface S {
    json: string
    path: string
}

class Main extends React.Component<undefined, S> {
    constructor(props: any) {
        super(props)
        this.state = {
            json: null,
            path: ''
        }
        this.generate = this.generate.bind(this)
    }
    _text = ''
    generate() {
        this.setState({
            json: this._text.trim() || '""'
        })
    }
    render() {
        return (<div>
            <div style={{width:'29%',height:800,float:'left',boxSizing:'border-box',paddingLeft:'30px',borderRight:'1px solid #888'}}>
                <textarea style={{width:'80%',height:300}} onChange={e=> this._text = e.target.value}></textarea>
                <p><button style={{width:'80%'}} onClick={this.generate}>generate</button></p>
                <p style={{width:'80%',minHeight:'50px',boxSizing:'border-box',border:'1px solid #108ee9',padding:'10px'}}>{this.state.path}</p>
            </div>
            <div style={{width:'70%',float:'left',boxSizing:'border-box',paddingLeft:'50px'}}>
                <JsonPathPicker json={this.state.json} onChoose={path=> {
                    console.log(path)
                    this.setState({path})
                    {/*console.log(getTargetByJsonPath(this.state.json, path))*/}
                }} />
            </div>
        </div>)
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById("main")
)