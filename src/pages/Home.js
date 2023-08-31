import './styles/Home.css';
import Box from "../components/Box";

export default function Home() {

    return (
        <div className='home-page'>
            <div className='header' style={{height: 'fit-content', backgroundColor: 'black'}}>
                <h1 style={{color: "white", margin: 0, textAlign: "center"}}>Title</h1>
            </div>
            <Box />
        </div>
    )
}
