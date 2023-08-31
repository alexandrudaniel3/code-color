import './styles/javaKeywords.css';
import './styles/Box.css';
import {useEffect, useState} from "react";
import InputSlider from "react-input-slider";
import MacWindow from "./MacWindow";
import WindowsWindow from "./WindowsWindow";
import ReactDropdown from "react-dropdown";
import 'react-dropdown/style.css';
import ReactSwitch from "react-switch";
import {CirclePicker} from "react-color";
import ModernWindow from "./ModernWindow";


const keywords = {
    accessModifiers: ['public', 'private', 'protected', 'static'],
    variableDeclaration: ['int', 'char', 'long', 'void'],
    objects: ['System', 'String', 'Object', 'Thread', 'ArrayList', 'HashMap', 'Exception', 'HashSet', 'StringBuilder', 'Arrays', 'Collections', 'LocalDate', 'Files', 'File', 'Scanner', 'System', 'Iterator', 'Runnable', 'Class', 'URL', 'LinkedList'],
    others: ['return', 'if', 'else', 'for', 'while', 'switch', 'true', 'false']

};

const highlightCode = (code, colors, lightMode) => {

    let theme = (lightMode === true) ? "light" : "dark";

    //class first so it ignores the html classes
    const classRegex = new RegExp('\\bclass\\b', "g");
    code = code.replace(classRegex, `<span class='others ${colors} ${theme}'>$&</span>`);

    const stringRegex = /"[^"]*"/g;
    code = code.replace(stringRegex, `<span class='string ${colors} ${theme}'>$&</span>`);

    const charRegex = /'[a-zA-Z_]'/g;
    code = code.replace(charRegex, `<span class='character ${colors} ${theme}'>$&</span>`);


    for (const category of Object.keys(keywords)) {
        for (const keyword of keywords[category]) {
            const keywordRegex = new RegExp(`\\b${keyword}\\b`, "g");
            code = code.replace(keywordRegex, `<span class='${category} ${colors} ${theme}'>${keyword}</span>`);
        }
    }

    const numberRegex = new RegExp(`\\b[0-9]+\\b`, "g");
    code = code.replace(numberRegex, `<span class='number ${colors} ${theme}'>$&</span>`);

    const commentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\//g;
    code = code.replace(commentRegex, `<span class='comments ${colors} ${theme}'>$&</span>`);

    return code;
};

const windows = [
    {label: 'macOS', value: 'mac'},
    {label: 'Windows', value: 'windows'},
    {label: 'Modern', value: 'modern'},
]

const colors = [
    {label: 'Xcode', value: 'xcode'},
    {label: 'IntelliJIDEA', value: 'intellij'},
]

const backgroundColors =
    ["#e7776f", "#e76c96", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
    "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39",
    "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b",
    "#ffffff", "#000000"];

export default function Box() {
    const [input, setInput] = useState('class Main {\n' +
        '\n' +
        '  public static void main(String[] args) {\n' +
        '    \n' +
        '    int first = 10;\n' +
        '    int second = 20;\n' +
        '\n' +
        '    // add two numbers\n' +
        '    int sum = first + second;\n' +
        '    System.out.println(first + " + " + second + " = "  + sum);\n' +
        '  }\n' +
        '}');
    const [output, setOutput] = useState('');
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(300);
    const [selectedWindow, setSelectedWindow] = useState('mac');
    const [lightMode, setLightMode] = useState(true);
    const [selectedColor, setSelectedColor] = useState('xcode');
    const [padding, setPadding] = useState(10);
    const [position, setPosition] = useState(10);
    const [background, setBackground] = useState('none')
    const [boldText, setBoldText] = useState(false);


    useEffect(() => {
        setOutput(highlightCode(input, selectedColor, lightMode, boldText));
    }, [input, selectedColor, lightMode]);

    return (
        <div className='box'>
            <div className='sidebar'>
                Your code:
                <textarea
                    style={{
                        width: '200px',
                        height: '200px',
                        resize: 'none',
                        margin: 0,
                    }}
                    rows='10'
                    cols='50'
                    value={input}
                    onChange={(event) => setInput(event.target.value)}/>
                Window Theme:
                <ReactDropdown options={windows} placeholder={'macOS'} onChange={(option) => setSelectedWindow(option.value)}/>
                Color Theme:
                <ReactDropdown options={colors} placeholder={'Xcode'} onChange={(option) => setSelectedColor(option.value)}/>
                Light Mode:
                <ReactSwitch checked={lightMode} onChange={setLightMode} checkedIcon={false} uncheckedIcon={false}/>
                Bold Text:
                <ReactSwitch checked={boldText} onChange={setBoldText} checkedIcon={false} uncheckedIcon={false}/>
                Background: <button type={'button'} onClick={() => setBackground('none')}>none</button>
                <CirclePicker colors={backgroundColors} onChange={(color) => setBackground(color.hex)} styles={{}}/>

            </div>
            <div className='main'>
                <div className='banner'>
                    Width:
                    <InputSlider
                        axis="x" x={width} xmax={1000} xmin={100}
                        onChange={({x}) => setWidth(state => (x))}
                        styles={{
                            track: {
                                margin: "10px"
                            }
                        }}
                    />
                    Height:
                    <InputSlider
                        axis="x" x={height} xmax={1000} xmin={100}
                        onChange={({x}) => setHeight(state => (x))}
                        styles={{
                            track: {
                                margin: "10px"
                            }
                        }}
                    />
                    Padding:
                    <InputSlider
                        axis="x" x={padding} xmax={300} xmin={0}
                        onChange={({x}) => setPadding(state => (x))}
                        styles={{
                            track: {
                                margin: "10px"
                            }
                        }}
                    />
                    Position:
                    <InputSlider
                        axis="x" x={position} xmax={300} xmin={0}
                        onChange={({x}) => setPosition(state => (x))}
                        styles={{
                            track: {
                                margin: "10px"
                            }
                        }}
                    />
                </div>
                <div className='background' style={{background: background, padding: position, width: "fit-content"}}>
                    {selectedWindow === 'mac' ?
                        <MacWindow output={output} width={width} height={height} lightMode={lightMode} header={''} padding={padding} boldText={boldText}/> :
                        selectedWindow === 'windows' ?
                        <WindowsWindow output={output} width={width} height={height} lightMode={lightMode} header={''} padding={padding} boldText={boldText}/> :
                            <ModernWindow output={output} width={width} height={height} lightMode={lightMode} header={''} padding={padding} boldText={boldText}/>}
                </div>
            </div>


        </div>
    )
}
