import React from "react";
import "./styles.css";

const formatAmount = (amount = 0, decPlaces = 3) => {
  return parseFloat(amount.toFixed(decPlaces))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Game = ({ game, activeTab, jackpots }) => {
  const [imageError, setImageError] = React.useState(false);
  return (
    <div
      className={`game-wrapper col-xxl-auto col-xl-3 col-md-4 col-sm-6 ${
        imageError && "image-error"
      }`}
    >
      <div className="game">
        <img
          src={`https:${game.image}`}
          alt=""
          onError={() => setImageError(true)}
        />
        <div className="overlay"></div>
        <div className="game-info">
          <span>{game.name}</span>
          <button>Play</button>
        </div>
        {jackpots.find((jackpot) => jackpot.game === game.id) && (
          <div className="jackpot">
            <span className="jackpot-amount">
              &#163;
              {formatAmount(
                jackpots.filter((jackpot) => jackpot.game === game.id)[0].amount
              )}
            </span>
          </div>
        )}

        {activeTab !== "new" && game.categories.includes("new") && (
          <div className="ribbon">
            <span>New</span>
          </div>
        )}
        {activeTab !== "top" && game.categories.includes("top") && (
          <div className="ribbon">
            <span>Top</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
