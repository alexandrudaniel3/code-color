import './styles/WindowsWindow.css';

export default function WindowsWindow({textSize, width, height, padding, header, output, lightMode, boldText}) {
    let theme = (lightMode === true) ? "light" : "dark";
    let bold = (boldText === true) ? 'bold' : '';
    textSize = (!textSize ? 'normal' : textSize + 'px' );

    return (
        <div className={"windows-window " + theme} style={{width: width, height: height}}>
            <div className={"windows-title-bar " + theme}>
                <div className={"windows-title " + theme}>{header}</div>
                <div className={"windows-window-controls " + theme}>
                    <div className={"windows-minimize " + theme}></div>
                    <div className={"windows-maximize " + theme}></div>
                    <div className={"windows-close " + theme}></div>
                </div>
            </div>
            <div className={"windows-content " + theme} style={{padding: padding, fontSize: textSize}}>
                <pre id="output" dangerouslySetInnerHTML={{__html: output}} className={theme + " "+ bold}></pre>
            </div>
        </div>
    )
}
