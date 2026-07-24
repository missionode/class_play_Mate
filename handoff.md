# Breakcup Handoff

## Current State

Breakcup is a static HTML/CSS/vanilla JavaScript employee break-group mixer. It loads employees from a published Google Sheets CSV or built-in sample data, creates diverse groups, assigns guides and destinations, persists state in `localStorage`, and exports a presentation board as a lossless PNG.

Core files:

- `index.html` — application and presentation markup
- `style.css` — professional light/dark UI, responsive layout, and export styles
- `app.js` — CSV parsing, employee/group state, mixing, rendering, persistence, and export
- `employees_sample.csv` — sample data and expected Sheet structure
- `AGENTS.md` — repository rules and efficient working guidance

## CSV Contract

Expected columns:

```text
Name,Gender,Department,Destination,Planning Event,Is Guide
```

- `Planning Event`: use `Yes` for activities such as a movie, trip, bowling, or club outing that should be planned during the break.
- `Is Guide`: use `Yes` for verified guides.
- Header aliases for guide, destination, and planning fields are supported in `processLoadedCSV()`.
- Sample data has 20 employees, 5 verified guides, physical destinations, and planning topics.
- A built-in CSV fallback allows Sample Data to work when `index.html` is opened with `file://`.

## Guide and Planning Rules

- Every employee is assigned to a group.
- Every verified guide in a group is treated as assigned and listed in the gathering instruction.
- Guides are spread across groups where possible.
- The guide is the primary gathering point.
- Guided card instruction: meet the named guide(s) at the break time.
- Unguided card instruction: meet directly at the physical destination.
- Planning events are random, with a 35% chance per guided group.
- Unguided groups must never receive planning events.
- Planning events appear as `Planning Topic`, not as a physical meeting destination.
- Removing or moving the only guide prevents or removes an invalid planning assignment.

## Export Behavior

- Output format is lossless PNG.
- Capture resolution targets 4× and is automatically constrained by safe canvas dimensions.
- Avatars are embedded at 256×256 before capture.
- Fonts and images are awaited before rendering.
- Export layout is independent of mobile viewport:
  - 1 group: 720px canvas
  - 2 groups: 960px canvas
  - 3+ groups: 1200px canvas, three-column grid
- Send the PNG as a document in WhatsApp or similar apps to avoid external compression.

## UI/UX Work Completed

- Professional blue/slate light and dark design system.
- Improved typography, spacing, controls, cards, table, sidebar, and presentation board.
- Accessible button-based tabs, focus states, loader status, and live feedback messages.
- Clear/Delete confirmations.
- Mobile-responsive application layout.
- Reduced-motion support.
- Directory includes editable verified-guide status.
- Guide details are consolidated into one gathering-instruction banner.
- Group drag capacity uses the configured maximum instead of a hard-coded value.

## Persistence

Important `localStorage` keys:

- `mixer_employees`
- `mixer_groups`
- `mixer_event_slots`
- `mixer_gathering_points`
- `mixer_sheet_url`
- `mixer_min_group_size`
- `mixer_max_group_size`
- `mixer_theme`
- `mixer_bg`

Keep existing object shapes and keys backward-compatible when practical.

## Verification

There is no package manager or automated test suite.

After JavaScript changes:

```bash
node --check app.js
git diff --check
```

For UI/export changes, manually verify:

1. Load Sample Data.
2. Confirm guide values in Employee Directory.
3. Mix employees multiple times and check planning randomness.
4. Confirm no unguided group receives a planning topic.
5. Test guide movement between groups.
6. Export from desktop and mobile widths.
7. Confirm the PNG is multi-column, readable, and includes guide instructions.

## Recommended Next Work

- Add an accessible non-drag “Move to group” control for touch and keyboard users.
- Replace remaining browser `alert()` messages with inline status feedback.
- Show guide coverage before mixing.
- Add an optional admin panel for destination/planning options instead of requiring CSV edits.
- Add an undo action for employee deletion and Clear All.
- Perform a real-device mobile/export smoke test; browser automation is not configured in this repository.

## Constraints

- Keep the app dependency-light and browser-native.
- Do not introduce a framework or backend without explicit approval.
- Escape CSV/user content before HTML insertion.
- Do not modify more than three files in one change without permission.
- Do not commit, push, or open a pull request unless requested.
