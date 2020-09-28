/**
 * author: akunzeng
 * 20170705
 *
 * notice!!!: JsonPathPick's prop - json, shouldn't have any key name including " ", otherwise the getTargetByJsonPath function (or other function you defined) will not work properlly.
 */
import * as React from 'react';
import './style.css';
export interface P {
    json: string;
    onChoose?(path: string): any;
    path?: string | null;
    showOnly?: boolean;
}
export interface S {
    choosen: string | null;
}
export declare class JsonPathPicker extends React.Component<P, S> {
    constructor(props: P);
    componentWillReceiveProps(nextp: P): void;
    shouldComponentUpdate(nextp: P, nexts: S): boolean;
    choose: (e: any) => void;
    render(): JSX.Element;
}
