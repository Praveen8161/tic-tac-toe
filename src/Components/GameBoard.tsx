import { useState } from "react";

const GameBoard = () => {
  const boxes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [iniState, setIniState] = useState<(null | string)[]>(
    Array(9).fill(null)
  );
  const [playerState, setPlayerState] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Combination of numbers to win
  const winningStrikes: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // Updating value
  const handleClick = (ind: number): void => {
    if (iniState[ind]) return;
    const tempMap: (string | null)[] = iniState.map(
      (val, idx): null | string => {
        if (ind === idx && !val) {
          return playerState ? "X" : "O";
        }
        return val;
      }
    );
    setIniState(() => [...tempMap]);
    setPlayerState((prev) => !prev);

    // Checking the Results
    const result: string | boolean = checkWinner(tempMap);
    if (result) {
      // giving Time so that the value will be updated before showing result
      setTimeout(() => {
        alert(result === "X" ? "player 1 wins" : "player 2 wins");
        setIniState(() => Array(9).fill(null));
        setPlayerState(() => true);
      }, 500);

      return;
    }

    // Check if the match is Draw
    const tCount: number = totalCount + 1;
    setTotalCount(tCount);
    if (tCount === 9) {
      setTimeout(() => {
        alert("Match Draw");
        setIniState(() => Array(9).fill(null));
        setPlayerState(() => true);
      }, 500);
    }
  };

  // Checking winning condition
  const checkWinner = (tempMap: (string | null)[]): string | boolean => {
    const len: number = winningStrikes.length;

    for (let i = 0; i < len; i++) {
      let count: number = 1;
      let winner: string | null = "";
      for (let j = 0; j < winningStrikes[i].length - 1; j++) {
        if (
          tempMap[winningStrikes[i][j] - 1] &&
          tempMap[winningStrikes[i][j] - 1] ===
            tempMap[winningStrikes[i][j + 1] - 1]
        ) {
          count++;
          winner = tempMap[winningStrikes[i][j] - 1];
        }
      }

      if (count === 3) {
        return winner as string;
      }
    }

    return false;
  };

  return (
    <div>
      <div className="mb-2">
        <span className="fw-semibold">Next Player: </span>
        <span className="fw-medium">{playerState ? "X" : "O"}</span>
      </div>

      {/* Game Board */}
      <div
        className="row justify-content-center align-items-center bg-primary d-flex border-collapse border"
        style={{ maxWidth: "300px" }}
      >
        {boxes.map((box, ind) => (
          <section
            key={`${box + ind}`}
            id={"" + box}
            onClick={() => handleClick(ind)}
            className=" col-4 text-center border border-dark fs-1 d-flex justify-content-center fw-semibold align-items-center"
            style={{
              maxWidth: "150px",
              minWidth: "90px",
              minHeight: "90px",
              maxHeight: "150px",
            }}
          >
            {iniState[ind]}
          </section>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
