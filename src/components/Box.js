import './styles/javaKeywords.css';
import './styles/Box.css';
import {useEffect, useRef, useState} from "react";
import InputSlider from "react-input-slider";
import MacWindow from "./MacWindow";
import WindowsWindow from "./WindowsWindow";
import ReactDropdown from "react-dropdown";
import 'react-dropdown/style.css';
import ReactSwitch from "react-switch";
import {CirclePicker} from "react-color";
import ModernWindow from "./ModernWindow";
import {toPng} from "html-to-image";


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
    const [textSize, setTextSize] = useState(10);
    const boxRef = useRef(null);

    useEffect(() => {
        setOutput(highlightCode(input, selectedColor, lightMode, boldText));
    }, [input, selectedColor, lightMode]);

    const exportBox = () => {
        toPng(boxRef.current, {cacheBust: false})
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "code.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='box'>
            <div className='sidebar'>
                <p>Your code:</p>
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
                <p>Window Theme:</p>
                <ReactDropdown options={windows} placeholder={'macOS'} onChange={(option) => setSelectedWindow(option.value)}/>
                <p>Color Theme:</p>
                <ReactDropdown options={colors} placeholder={'Xcode'} onChange={(option) => setSelectedColor(option.value)}/>
                <div className='sidebar-switch'>
                    <p>Light Mode: &nbsp;</p>
                    <ReactSwitch checked={lightMode} onChange={setLightMode} checkedIcon={false} uncheckedIcon={false} onColor="#7fc8f8"/>
                </div>
                <div className='sidebar-switch'>
                    <p>Bold Text: &nbsp;</p>
                    <ReactSwitch checked={boldText} onChange={setBoldText} checkedIcon={false} uncheckedIcon={false} onColor="#7fc8f8"/>
                </div>
                <div className='sidebar-color-picker'>
                    <div className='sidebar-color-picker-header'>
                        <p>Background:</p>
                        <button type={'button'} onClick={() => setBackground('none')}>none</button>
                    </div>
                    <CirclePicker colors={backgroundColors} onChange={(color) => setBackground(color.hex)} styles={{}}/>
                </div>
                    <button className='sidebar-export-button' onClick={exportBox}>Export</button>
            </div>
            <div className='main'>
                <div className='banner'>
                    <div className='banner-1'>
                        Width:
                        <InputSlider
                            axis="x" x={width} xmax={1000} xmin={100}
                            onChange={({x}) => setWidth(state => (x))}
                            styles={{
                                track: {
                                    margin: "10px",
                                },
                                active: {
                                    backgroundColor : "#7fc8f8",
                                },
                            }}
                        />
                        <input type="number" min="100" max="1000" step="1" value={width} onChange={e => setWidth(e.target.value)}/>

                        Height:
                        <InputSlider
                            axis="x" x={height} xmax={1000} xmin={100}
                            onChange={({x}) => setHeight(state => (x))}
                            styles={{
                                track: {
                                    margin: "10px",
                                },
                                active: {
                                    backgroundColor : "#7fc8f8",
                                },
                            }}
                        />
                        <input type="number" min="100" max="1000" step="1" value={height} onChange={e => setHeight(e.target.value)}/>

                        Padding:
                        <InputSlider
                            axis="x" x={padding} xmax={500} xmin={10}
                            onChange={({x}) => setPadding(state => (x))}
                            styles={{
                                track: {
                                    margin: "10px",
                                },
                                active: {
                                    backgroundColor : "#7fc8f8",
                                },
                            }}
                        />
                        <input type="number" min="10" max="500" step="1" value={padding} onChange={e => setPadding(e.target.value)}/>

                    </div>
                    <div className='banner-2'>
                        Position:
                        <InputSlider
                            axis="x" x={position} xmax={1000} xmin={10}
                            onChange={({x}) => setPosition(state => (x))}
                            styles={{
                                track: {
                                    margin: "10px",
                                },
                                active: {
                                    backgroundColor : "#7fc8f8",
                                },
                            }}
                        />
                        <input type="number" min="10" max="1000" step="1" value={position} onChange={e => setPosition(e.target.value)}/>

                        Text Size:
                        <InputSlider
                            axis="x" x={textSize} xmax={100} xmin={10}
                            onChange={({x}) => setTextSize(state => (x))}
                            styles={{
                                track: {
                                    margin: "10px",
                                },
                                active: {
                                    backgroundColor : "#7fc8f8",
                                },
                            }}
                        />
                        <input type="number" min="10" max="100" step="1" value={textSize} onChange={e => setTextSize(e.target.value)}/>

                    </div>
                </div>
                <div id="export-box">
                    <div ref={boxRef} className='background' style={{background: background, padding: position, width: "fit-content"}}>
                        {selectedWindow === 'mac' ?
                            <MacWindow textSize={textSize} output={output} width={width} height={height} lightMode={lightMode} header={''} padding={padding} boldText={boldText}/> :
                            selectedWindow === 'windows' ?
                            <WindowsWindow textSize={textSize} output={output} width={width} height={height} lightMode={lightMode} header={''} padding={padding} boldText={boldText}/> :
                                <ModernWindow textSize={textSize} output={output} width={width} height={height} lightMode={lightMode} header={''} padding={padding} boldText={boldText}/>}
                    </div>
                </div>
            </div>


        </div>
    )
}
