import './styles/ModernWindow.css';

export default function ModernWindow({width, height, padding, header, output, lightMode, boldText}) {
    let theme = (lightMode === true) ? "light" : "dark";
    let bold = (boldText === true) ? 'bold' : '';

    return (
        <div className={"modern-window " + theme} style={{width: width, height: height}}>
            <div className={"modern-title-bar " + theme}>
                <div className={"modern-window-controls " + theme}>
                    <div className={"modern-close " + theme}></div>
                    <div className={"modern-minimize " + theme}></div>
                    <div className={"modern-maximize " + theme}></div>
                </div>
                <div className={"modern-title " + theme}>{header}</div>
            </div>
            <div className={"modern-content " + theme} style={{padding: padding}}>
                <pre id="output" dangerouslySetInnerHTML={{__html: output}} className={theme + ' ' + bold}></pre>
            </div>
        </div>
    )
}
