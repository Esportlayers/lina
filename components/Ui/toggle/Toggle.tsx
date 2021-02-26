import "react-toggle/style.css";

import { ReactElement } from "react";
import ReactToggle from "react-toggle";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export default function Toggle({
  checked,
  disabled,
  label,
  onChange,
}: Props): ReactElement {
  return (
    <label>
      <ReactToggle
        checked={Boolean(checked)}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={"label"}>{label}</span>

      <style jsx global>{`
        .react-toggle.react-toggle--checked:not(.react-toggle--disabled)
          .react-toggle-track {
          background-color: var(--secondary-accent);
        }

        .react-toggle--checked .react-toggle-thumb {
          border-color: var(--secondary-accent);
        }

        .react-toggle.react-toggle--checked:hover:not(.react-toggle--disabled)
          .react-toggle-track,
        label:hover
          .react-toggle.react-toggle--checked:not(.react-toggle--disabled)
          .react-toggle-track {
          background-color: var(--secondary-accent-darken);
        }

        .react-toggle:not(.react-toggle--disabled) .react-toggle-track {
          background-color: #333;
        }

        .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track,
        label:hover
          .react-toggle:not(.react-toggle--disabled)
          .react-toggle-track {
          background-color: #222;
        }
      `}</style>

      <style jsx>{`
        label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .label {
          margin-left: 0.5rem;
        }
      `}</style>
    </label>
  );
}
