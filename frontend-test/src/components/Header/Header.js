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
                                <p>All</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => context.setSportType(1)}>
                                <p>Football</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => context.setSportType(18)}>
                                <p>Cricket</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(2)}>
                                <p>IceHockey</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(34)}>
                                <p>Darts</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(52)}>
                                <p>Valorant</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(6)}>
                                <p>Lol</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(7)}>
                                <p>Tennis</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(9)}>
                                <p>Table Tennis</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(25)}>
                                <p>Dota 2</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(26)}>
                                <p>Volleyball</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(42)}>
                                <p>Snooker</p>
                            </button>
                        </li>
                        <li>
                            <button onClick={(e) => context.setSportType(25)}>
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