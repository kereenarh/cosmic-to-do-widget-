import { React } from 'uebersicht';

export const refreshFrequency = false;

export const className = `
  top: 40px;
  right: 40px;
  user-select: none;
  pointer-events: auto !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .widget-container {
    width: 310px;
    min-height: 420px;
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    background-color: #2b1f4a;
    pointer-events: auto !important;
  }

  .bg-illustration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/pixel-todo.widget/planet_bg.png");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: cover;
    z-index: 1;
    image-rendering: pixelated;
  }

  .content-box {
    position: relative;
    background: #5eebda;
    margin: 14px;
    padding: 14px;
    border-radius: 16px;
    border: 2px solid #715eeb;
    backdrop-filter: blur(6px);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 2;
  }

  .title {
    font-size: 14px;
    font-weight: 800;
    color: #2e1d52;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-align: center;
  }

  .input-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .task-input {
    flex: 1;
    padding: 8px 12px;
    font-size: 13px;
    border: 2px solid #715eeb;
    border-radius: 8px;
    background: #ffffff;
    color: #1e1b4b;
    outline: none;
    user-select: text !important;
    cursor: text;
  }

  .task-input:focus {
    border-color: #715eeb;
    box-shadow: 0 0 0 2px #715eeb;
  }

  .icon-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
    transition: transform 0.1s ease;
  }

  .icon-btn:active {
    transform: scale(0.9);
  }

  .icon-btn img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    image-rendering: pixelated;
  }

  .todo-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 7px 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(88, 75, 125, 0.3);
  }

  .todo-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    overflow: hidden;
    cursor: pointer;
  }

  .star-checkbox {
    width: 18px;
    height: 18px;
    display: inline-block;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    color: #9284ba;
  }

  .todo-text {
    font-size: 13px;
    color: #241442;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: text;
  }

  .todo-item.completed .todo-text {
    text-decoration: line-through;
    opacity: 0.5;
  }

  .todo-item.completed .star-checkbox {
    color: #f6b400;
    text-shadow: 0 0 4px rgba(246, 180, 0, 0.6);
  }

  .confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
    overflow: hidden;
  }

  .pixel-confetti {
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: pixelFloat 5s ease-out forwards;
  }

  @keyframes pixelFloat {
    0% {
      opacity: 0;
      transform: translateY(0px) rotate(0deg) scale(0.6);
    }
    12% {
      opacity: 1;
      transform: translateY(-40px) rotate(45deg) scale(1.1);
    }
    40% {
      opacity: 0.95;
      transform: translateY(-110px) rotate(110deg) scale(1);
    }
    75% {
      opacity: 0.85;
      transform: translateY(-180px) rotate(210deg) scale(0.95);
    }
    100% {
      opacity: 0;
      transform: translateY(-240px) rotate(320deg) scale(0.8);
    }
  }
`;

const CONFETTI_COLORS = [
  "#ff4d8d",
  "#12e2a3",
  "#7ee7fc",
  "#ffd23f"
];

const TodoApp = () => {
  const [tasks, setTasks] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cloud_tasks") || "[]");
    } catch (e) {
      return [];
    }
  });

  const [inputVal, setInputVal] = React.useState("");
  const [confetti, setConfetti] = React.useState([]);

  React.useEffect(() => {
    try {
      localStorage.setItem("cloud_tasks", JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    const clean = inputVal.trim();
    if (!clean) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: clean, completed: false }]);
    setInputVal("");
  };

  const triggerConfetti = () => {
    const batchId = Date.now();
    const pieceCount = 28;

    const pieces = Array.from({ length: pieceCount }).map((_, i) => {
      const size = Math.floor(Math.random() * 5) + 6;
      return {
        id: `${batchId}-${i}`,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: `${size}px`,
        left: `${Math.random() * 84 + 8}%`,
        bottom: `${Math.random() * 50 + 10}px`,
        delay: `${(Math.random() * 0.45).toFixed(2)}s`
      };
    });

    setConfetti((prev) => [...prev, ...pieces]);

    setTimeout(() => {
      setConfetti((prev) => prev.filter((p) => !p.id.startsWith(`${batchId}-`)));
    }, 5000);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          if (next) triggerConfetti();
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="widget-container">
      <div className="bg-illustration" />

      <div className="confetti-container">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="pixel-confetti"
            style={{
              backgroundColor: c.color,
              width: c.size,
              height: c.size,
              left: c.left,
              bottom: c.bottom,
              animationDelay: c.delay
            }}
          />
        ))}
      </div>

      <div className="content-box">
        <div className="title">Tasks</div>
        <form onSubmit={addTask} className="input-row">
          <input
            type="text"
            className="task-input"
            placeholder="New task..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="icon-btn" title="Add item">
            <img src="/pixel-todo.widget/yellow_plus.png" alt="+" />
          </button>
        </form>

        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
              <div className="todo-left" onClick={() => toggleTask(task.id)}>
                <span className="star-checkbox">{task.completed ? "★" : "☆"}</span>
                <span className="todo-text">{task.text}</span>
              </div>
              <button
                type="button"
                className="icon-btn"
                title="Delete item"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
              >
                <img src="/pixel-todo.widget/blue_minus.png" alt="x" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const render = () => {
  return <TodoApp />;
};
