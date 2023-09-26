import './styles/Home.css';
import Box from "../components/Box";

export default function Home() {

    return (
        <div className='home-page'>
            <div className='header' style={{height: 'fit-content', backgroundColor: '#5aa9e6', padding: "5px"}}>
                <h1 style={{color: "white", margin: 0, textAlign: "center", fontFamily: "Courier Prime, monospace"}}>CodeLight</h1>
            </div>
            <Box />
        </div>
    )
}
