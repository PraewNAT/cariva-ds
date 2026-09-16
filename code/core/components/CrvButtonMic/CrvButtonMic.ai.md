> Source of truth: ../../../rules/components/crv-button-mic.md
> Figma node: crv-button-mic, 5862:33778

# CrvButtonMic

Picker for the audio input device.

## Exports

- `CrvButtonMic`

## Props

| Prop | Type | Default |
|---|---|---|
| `label` | ReactNode — device name | required |
| `active` | boolean — animates the waveform | `false` |
| `showWaveform` | boolean | `true` |

## Tokens

- Waveform bars: `color/status/active/on-surface/default`, 5 bars 8/12/16/12/8 px
- Label: `typography/label/small` in `color/content/secondary`
- Hover `color/on-surface/action/hover` · pressed `color/on-surface/action/pressed` · radius `radius/12`

## AI Implementation Rules

1. Use only for choosing a microphone — not as a generic dropdown.
2. Set `active` while audio is coming in; the animation respects `prefers-reduced-motion`.
3. Long device names truncate — do not wrap the label.
