import './styles/MacWindow.css';

export default function MacWindow({width, height, padding, header, output, lightMode, boldText}) {
    let theme = (lightMode === true) ? "light" : "dark";
    let bold = (boldText === true) ? 'bold' : '';

    return (
        <div className={"mac-window " + theme} style={{width: width, height: height}}>
            <div className={"mac-title-bar " + theme}>
                <div className={"mac-window-controls " + theme}>
                    <div className={"mac-close " + theme}></div>
                    <div className={"mac-minimize " + theme}></div>
                    <div className={"mac-maximize " + theme}></div>
                </div>
                <div className={"mac-title " + theme}>{header}</div>
            </div>
            <div className={"mac-content " + theme} style={{padding: padding}}>
                <pre id="output" dangerouslySetInnerHTML={{__html: output}} className={theme + ' ' + bold}></pre>
            </div>
        </div>
    )
}
