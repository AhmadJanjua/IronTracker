import { useState } from "preact/hooks";

function WorkoutKindModal({onConfirm}) {
  const [draft, setDraft] = useState<string>("");

  function confirm(): void {
    let fmt_str: string = draft.trim();
    if (fmt_str.length === 0) return;

    fmt_str = fmt_str.toLowerCase();
    fmt_str = fmt_str.charAt(0).toUpperCase() + fmt_str.slice(1);
    onConfirm(fmt_str);
  }

  return (
    <div role="dialog" aria-modal="true">
        <label>
          Workout kind:
          <input type="text" value={draft}
            onInput={(e) => setDraft((e.currentTarget as HTMLInputElement).value)}
            placeholder=""
          />
        </label>
        <button type="button" onClick={confirm}>
            Continue
        </button>
      </div>
  );
};

export default WorkoutKindModal;
