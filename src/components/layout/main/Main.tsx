import React from "react";

const Main = () => {
  const [words, setWords] = React.useState<string[]>(["test", "asdasdasd"]);

  const [cursorPosition, setCursorPosition] = React.useState([0, 0]);

  const [writtenWord, setWrittenWord] = React.useState<string>("");

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      setCursorPosition((prev) => {
        return [prev[0] + 1, 0];
      });

      return;
    }
    setWrittenWord((prev) => {
      return prev + e.key;
    });
    setCursorPosition((prev) => {
      return [prev[0], prev[1] + 1];
    });
    console.log(e);
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      <div>{writtenWord}</div>
      <div className="flex h-40 w-full gap-2 overflow-hidden border-2 border-solid border-white text-white">
        {words.map((w: string, wi: number) => (
          <div>
            {w.split("").map((c: string, ci: number) => (
              <>
                {wi === cursorPosition[0] && ci === cursorPosition[1]
                  ? "|"
                  : ""}
                <span>{c}</span>
              </>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
