import { useEffect, useRef, useState } from "preact/hooks";

function toString(time: number): string {
	const min = Math.floor(time / 60_000);
	const sec = Math.floor((time / 1000) % 60);
	const ts = Math.floor((time % 1000) / 100);

	const m_str = String(min).padStart(2, "0");
	const s_str = String(sec).padStart(2, "0");
	const ts_str = String(ts);

	return `${m_str}:${s_str}.${ts_str}`;
}

function Stopwatch() {
	const [running, setRunning] = useState<boolean>(false);
	const [elapsed, setElapsed] = useState<number>(0);
	
	const prev_time = useRef<number | null>(null);

	useEffect(() => {
		if (!running) return;

		let id = 0;

		function tick() {
			if (prev_time.current == null) return;

			const now = performance.now();
			const dt = now - prev_time.current;

			prev_time.current = now;
			setElapsed((prev) => prev + dt);

			id = requestAnimationFrame(tick);
		}

		id = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(id);
	}, [running]);

	function toggle() {
		if (!running) {
			prev_time.current = performance.now();
		} else {
			prev_time.current = null;
		}
		setRunning((prev) => !prev);
		return;
	}

	return (
		<div>
			<div aria-live="polite">{toString(elapsed)}</div>
			<button type="button" onClick={toggle}>
				{running ? "Stop" : "Start"}
			</button>
			{(elapsed != 0) && (
			<button type="button" onClick={() => setElapsed(0)}>
				Reset
			</button>)}
		</div>
	);
}

export default Stopwatch;
