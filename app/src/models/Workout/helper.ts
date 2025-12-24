export function dateToString(ms: number): string {
	const d = new Date(ms);

	const yy = String(d.getFullYear() % 100).padStart(2, "0");
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");

	return `${yy}-${mm}-${dd}`;
}

