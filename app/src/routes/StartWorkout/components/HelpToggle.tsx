import { useState } from "preact/hooks";

function HelpToggle() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button type="button" onClick={() => setOpen((p) => !p)}>
        Help
      </button>

      {open && (
        <div>
            <h3>Stopwatch  --help</h3>
            <p>
            Used to track rests prior to adding a set. The value of the stopwatch
            will be added to the set (if not zero) immediately preceding the set
            added.
            </p>
        </div>
      )}
    </div>
  );
};

export default HelpToggle;
