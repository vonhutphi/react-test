import axios from "axios";
import React, { useEffect, useState } from "react";
import Game from "../game";
import "./style.css";

const tabs = [
  {
    label: "Top Games",
    value: "top",
  },
  {
    label: "New Games",
    value: "new",
  },
  {
    label: "Slots",
    value: "slots",
  },
  {
    label: "Jackpots",
    value: "jackpots",
  },
  {
    label: "Live",
    value: "live",
  },
  {
    label: "Blackjack",
    value: "blackjack",
  },
  {
    label: "Roulette",
    value: "roulette",
  },
  {
    label: "Table",
    value: "table",
  },
  {
    label: "Poker",
    value: "poker",
  },
  {
    label: "Other",
    value: "other",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("top");
  const [games, setGames] = useState([]);
  const [jackpots, setJackpots] = useState([]);
  const [menuIsActive, setMenuIsActive] = useState(false);

  useEffect(() => {
    fetchGames();
    const interval = setInterval(() => {
      fetchJackpot()
    }, 3000)
    return () => clearInterval(interval)
  }, []);

  const fetchGames = async () => {
    const { data } = await axios.get(
      "http://stage.whgstage.com/front-end-test/games.php"
    );
    if (data) {
      setGames(data);
    }
  };

  const fetchJackpot = async () => {
    const { data } = await axios.get(
      "http://stage.whgstage.com/front-end-test/jackpots.php"
    );
    if (data) {
      setJackpots(data);
    }
  };

  return (
    <div className="wrapper">
      <div className="tab-pane-wrapper">
        <ul className="tab-bar">
          {tabs.map((tab, idx) => (
            <li
              className={tab.value === activeTab ? "active" : ""}
              key={idx}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
        <div className="tab-bar-mobile">
          <div className="tab-bar-mobile-wrapper">
            <div className="head-menu-wrapper">
              <div className="head-menu">
                <div className="selected-tab">
                  <span>
                    {tabs.filter((tab) => tab.value === activeTab)[0].label}
                  </span>
                </div>
                <div
                  className="menu-icon"
                  onClick={() => setMenuIsActive(!menuIsActive)}
                >
                  <div className="line line-1"></div>
                  <div className="line line-2"></div>
                  <div className="line line-3"></div>
                </div>
              </div>
            </div>
            <div
              className={`dropdown-wrapper ${menuIsActive && "menu-active"}`}
            >
              <ul className="dropdown-list">
                {tabs.map((tab, idx) => (
                  <li
                    className={tab.value === activeTab ? "active" : ""}
                    key={idx}
                    onClick={() => {
                      setActiveTab(tab.value);
                      setMenuIsActive(false);
                    }}
                  >
                    <span>{tab.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-content-wrapper">
        <div className="tab-content row">
          {games &&
            games
              .filter((game) => {
                if (activeTab === "other") {
                  return game.categories.some((category) =>
                    ["ball", "virtual", "fun"].includes(category)
                  );
                }
                return game.categories.includes(activeTab);
              })
              .map((game, idx) => (
                <Game
                  game={game}
                  key={idx}
                  activeTab={activeTab}
                  jackpots={jackpots}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
