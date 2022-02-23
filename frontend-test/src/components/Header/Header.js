import React, { useContext } from 'react';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import IceSkatingIcon from '@mui/icons-material/IceSkating';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import './styles.css';
import { DataContext } from '../../App';

const Header = () => {
    const context = useContext(DataContext);
    return (
        <header className="App-header">

            <div className="sports-navigation-general">
                <div className="sport-nav-container-general scrollbar-general">
                    <ul>
                    <li>
                            <button onClick={() => context.setSportType(0)}>
                                <span><i className="games-count-view-general">3</i></span>
                                <p>All</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => context.setSportType(1)}>
                                <span><SportsSoccerIcon fontSize="large" /><i className="games-count-view-general">3</i></span>
                                <p>Football</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => context.setSportType(18)}>
                                <span><SportsCricketIcon fontSize="large" /><i className="games-count-view-general">3</i></span>
                                <p>Cricket</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(2)}>
                                <span><SportsHockeyIcon fontSize="large" /><i className="games-count-view-general">3</i></span>
                                <p>IceHockey</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(34)}>
                                <span><i className="games-count-view-general">17</i></span>
                                <p>Darts</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(52)}>
                                <span ><i className="games-count-view-general">4</i></span>
                                <p>Valorant</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(6)}>
                                <span ><i className="games-count-view-general">2</i></span>
                                <p>Lol</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(7)}>
                                <span><SportsTennisIcon fontSize="large" /><i className="games-count-view-general">1</i></span>
                                <p>Tennis</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(9)}>
                                <span><SportsTennisIcon fontSize="large" /><i className="games-count-view-general">1</i></span>
                                <p>Table Tennis</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(25)}>
                                <span><i className="games-count-view-general">2</i></span>
                                <p>Dota 2</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(26)}>
                                <span><SportsVolleyballIcon fontSize="large" /><i className="games-count-view-general">1</i></span>
                                <p>Volleyball</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(42)}>
                                <span ><i className="games-count-view-general">1</i></span>
                                <p>Snooker</p>
                            </button>
                        </li>
                        <li>
                            <button  onClick={(e) => context.setSportType(25)}>
                                <span><SportsBasketballIcon fontSize="large" /><i className="games-count-view-general">1</i></span>
                                <p>Basketball</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>


        </header>
    )
}
export default Header;