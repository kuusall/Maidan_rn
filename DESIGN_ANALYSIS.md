# Maidan Design Analysis

## Scope and source-directory note

The requested `design/` directory does not exist in the repository. The design source is stored in `designs/`, which contains 15 Markdown files. The files were inspected without modification.

The files are not React Native implementations. They are self-contained web documents composed of:

- HTML elements such as `div`, `header`, `main`, `nav`, `button`, `input`, and `article`
- Tailwind CSS utility classes loaded from `https://cdn.tailwindcss.com`
- Inline CSS for pitch textures, glass surfaces, shadows, gradients, and responsive behavior
- Inline SVG icons and illustrations
- External Google Fonts
- External Tabler Icons and, in one file, Material Symbols

They are visual reference implementations and must be translated to React Native primitives and local/shared components.

## Screen inventory

| Source file | Screen | Primary purpose | Main entry relationship |
|---|---|---|---|
| `screen1.md` | Home / Discovery | Greeting, search, nearby grounds, upcoming booking, quick actions | Root tab; launches booking, match, team, and challenge flows |
| `bookAGround.md` | Book a Ground | Select a ground, time slot, and advance/full payment mode | Reached from Home or booking actions; proceeds to booking confirmation/ticket |
| `bookingTicket.md` | Booking QR Ticket | Show confirmed booking QR, booking details, payment split, wallet action | Reached after booking; can be opened from Home/upcoming booking |
| `bookingHistory.md` | Booking History | List completed, cancelled, and no-show bookings | Reached from drawer/profile |
| `myTeam.md` | My Teams | List teams, membership/captain status, upcoming booking | Teams tab; opens team detail or create team |
| `createTeam.md` | Create Your Team | Enter team name, invite players, show team code, review roster | Reached from My Teams or Home quick action |
| `teamdetail.md` | Team Detail | Team summary, chat shortcut, next slot, roster, captain actions | Reached from My Teams; opens Team Chat or Post |
| `TeamChat.md` | Team Chat | Team conversation thread, compose message, attachments | Reached from Team Detail or Chat tab |
| `findmatchRecruitment.md` | Find a Match — Recruitment | Browse player recruitment posts and apply | Teams/find-match flow; opens Create Post or applies to a post |
| `findmatchChallenges.md` | Find a Match — Team Challenges | Browse team challenges and accept one | Teams/find-match flow; opens Create Post or accepts a challenge |
| `post.md` | Create Post | Toggle recruitment/challenge, configure requirements, difficulty, slot, and payment rule | Reached from Team Detail, Find a Match, or Home quick action |
| `notification.md` | Notifications | Group notifications into Today and Earlier | Reached from drawer/profile/header notification action |
| `wallet.md` | Wallet | Balance, top-up provider/amount selection, recent transactions | Reached from drawer/profile and booking/payment flows |
| `screenDrawer.md` | Settings Drawer | User profile, notifications, history, payments, help, theme, logout | Opened from Home menu; links to Notifications, Booking History, Wallet |
| `design.md` | Booking History duplicate/reference | Contains an HTML Booking History implementation despite the generic filename | Treat as design-system reference plus duplicate Booking History source |

### Source inconsistency

`designs/design.md` is the design-system specification by content, but it also contains a complete Booking History HTML document. `designs/bookingHistory.md` is another Booking History implementation. The implementation should use `design.md` for the canonical token language and `bookingHistory.md` for the canonical screen reference unless product direction says otherwise.

## Navigation map

```text
Home / Discovery
├── Open Menu
│   └── Settings Drawer
│       ├── Notifications
│       ├── Booking History
│       ├── Wallet / Payment Methods & Top-up
│       ├── Help & Support (not separately designed)
│       ├── Daylight/Night Pitch theme toggle
│       └── Log out (not separately designed)
├── Scan QR Code
├── Search grounds / area / venue
├── Nearby Ground
│   └── Book a Ground
│       ├── Select slot
│       ├── Select Advance or Full amount
│       └── Confirm booking
│           └── Booking QR Ticket
├── Upcoming booking QR action
│   └── Booking QR Ticket
├── Book Slot
│   └── Book a Ground
├── Find Squad
│   └── Find a Match — Recruitment
├── Create Team
│   └── Create Your Team
└── Post Challenge
    └── Create Post

My Teams
├── Team card
│   └── Team Detail
│       ├── Chat
│       │   └── Team Chat
│       ├── Post recruitment
│       │   └── Create Post (Recruitment selected)
│       ├── Post challenge
│       │   └── Create Post (Challenge selected)
│       └── Upcoming booking
└── Create new team
    └── Create Your Team

Find a Match
├── Recruitment tab
│   └── Apply to recruitment post
├── Team Challenges tab
│   └── Accept challenge
└── Floating add action
    └── Create Post

Bottom tabs
├── Home
├── Bookings
├── Teams
├── Chat
└── Profile
```

The designs imply a five-tab shell: Home, Bookings, Teams, Chat, and Profile. Only Home and Teams have detailed tab-level designs; Bookings, Chat, and Profile are represented through related/detail screens and navigation chrome.

## Shared component inventory

### Global chrome

- `ScreenBackground` / pitch-line background texture
- `SafeAreaScreen` with scrollable and non-scrollable variants
- `Header` with optional back button, title, subtitle, and trailing action
- `BottomNavigation` / floating glass navigation dock
- `Drawer` / modal side panel
- `HomeIndicator` visual placeholder where designs simulate an iOS device

### Typography

- Display heading: Rajdhani, uppercase, bold/semi-bold
- Body/interface: Manrope, regular through bold
- Data/financial/time: Roboto Mono
- One screen uses Space Grotesk for general UI
- One screen uses Plus Jakarta Sans for the drawer
- One screen uses JetBrains Mono for team codes

### Controls

- `Button`: primary neon gradient, ghost, outlined/secondary, small apply action
- `IconButton`: rounded glass action with back, menu, QR, share, settings, plus, receipt, and close states
- `Input`: glass search pill, text input, message input
- `SegmentedControl`: Recruitment/Team Challenges and Recruitment/Challenge toggles
- `Switch`: loser-pays and theme toggles
- `RadioGroup` / selectable tiles: booking slots and payment modes
- `FloatingActionButton`: create match/challenge

### Surfaces

- `GlassCard`: standard frosted panel
- `ElevatedGlassCard`: stronger surface and shadow
- `StatusBadge`: turf, amber, coral, blue, neutral
- `Avatar`: initials-based rounded square/circle variants
- `TeamCard`
- `NotificationCard`
- `TransactionCard`
- `BookingCard`
- `MetricCard`

### Domain visual components

- Pitch/ground illustration card with field lines
- Venue discovery carousel
- Upcoming booking card
- Slot grid
- Payment option card
- QR ticket with notched cutouts and dashed separators
- Chat bubble: incoming and outgoing
- Team roster row
- Challenge/recruitment feed card
- Team code display

## Design tokens

### Core colors

The canonical Night Pitch palette is:

| Token | Value | Use |
|---|---|---|
| Page background | `#0A1310` | Main screen background |
| Screen surface top | `#0D1712` | Surface/background gradient |
| Screen surface bottom | `#0A100D` | Surface/background gradient |
| Phone surface | `#141B18` | Simulated device or elevated frame |
| Ticket cutout | `#0B100D` | QR ticket edge cutouts |
| Turf primary | `#3EE28C` | Primary action, active states, success |
| Turf strong | `#1F9A5E` | Gradient stop and darker accent |
| Action ink | `#06170D` | Text/icons on primary green |
| Heading/ink | `#EAF6EF` | Primary text |
| Ink dim | `#93A79C` | Secondary text |
| Ink faint | `#5E7268` | Placeholder, inactive icons, dividers |
| Amber | `#FFB74A` | Warnings, advanced/no-show/dummy states |
| Blue | `#5B8CFF` | Invited/member/info states |
| Coral | `#FF6B5E` | Challenges, cancellations, urgent states |
| Glass | `rgba(255,255,255,0.06)` | Standard glass panel |
| Glass elevated | `rgba(255,255,255,0.10)` | Active/elevated glass panel |
| Glass border | `rgba(255,255,255,0.14)` | Frosted panel border |
| Scrim | `rgba(0,0,0,0.7)` | Drawer/modal backdrop |

Additional file-specific colors mostly represent darker/lighter variants of the same palette, such as `#111C16`, `#141E18`, `#17221E`, and `#242C29`. These should not become arbitrary one-off tokens unless visual comparison requires them.

### Light theme

The design-system file defines a Daylight Pitch counterpart:

- Background: `#F1EDE1`
- Surface: `#FFFDF2` / `#F0EBDC`
- Primary: `#0B5C63`
- Primary strong: `#083F45`
- Text: `#263E3B`
- Muted text: `#526C67`
- Faint text: `#78908A`
- Amber: `#A86112`
- Blue: `#245A73`
- Coral: `#B9473F`

The dark theme is the default in the current application foundation.

### Typography

| Role | Family | Typical sizes | Typical weights |
|---|---|---:|---|
| Hero/app title | Rajdhani | 26–38px | 700–800 |
| Screen/section title | Rajdhani | 17–28px | 600–700 |
| Card/team title | Rajdhani or Manrope | 13.5–17px | 600–700 |
| Body/interface | Manrope | 13–15px | 400–700 |
| Metadata | Manrope | 11–13px | 400–500 |
| Data/time/financial | Roboto Mono | 10.5–17px | 400–700 |
| Team code | JetBrains Mono | 24–26px | 500–700 |

React Native must load or bundle fonts explicitly; browser Google Fonts links do not carry over.

### Spacing and dimensions

Repeated values:

- Screen horizontal padding: 16–20px
- Compact screen padding: 12–14px
- Section spacing: 16–24px
- Card internal padding: 12–20px
- Small control gap: 8–12px
- Grid gap: 8–14px
- Header action buttons: 40–48px square
- Tab dock height: approximately 60–68px
- Floating action button: 52–56px square
- Mobile reference widths: 300px, 320px, 335px, 360px, 375px, 390px, and 412px

### Border radii

- Small controls: 8–12px
- Standard cards and inputs: 14–18px
- Large cards: 20–24px
- Floating/navigation dock: 24–28px
- Pills/badges: 999px
- Simulated phone shell: 36–46px

### Effects

- Pitch-line texture: vertical repeating/linear gradients at 24–36px intervals
- Glass blur: approximately 8–20px on the web
- Elevated shadows: green glow around primary actions and FABs
- Press state: scale approximately `0.95–0.99`
- Web transitions: approximately `0.15–0.25s`

## Asset inventory

### Referenced external assets

- Tailwind CDN:
  - `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts:
  - Manrope
  - Rajdhani
  - Roboto Mono
  - Space Grotesk
  - Plus Jakarta Sans
  - JetBrains Mono
- Icon webfonts:
  - Tabler Icons Webfont, latest or version `2.44.0`
  - Material Symbols Outlined in `findmatchChallenges.md`

### Local or embedded assets

No design file references local image paths, raster images, image URLs, or external SVG files. Visuals are embedded as:

- Inline SVG icon paths
- Inline SVG QR-like matrix in `bookingTicket.md`
- CSS pitch illustrations
- CSS gradients and field-line geometry
- Initials-based avatars

The application repository separately contains `assets/images/maidan-logo.png`, but that logo is not referenced by the design source files.

### Icon inventory

Common icon concepts:

- Navigation: home, calendar, users/group, message, user
- Booking: calendar event/check, clock, map pin, QR, receipt, wallet, credit card
- Teams: shirt/jersey, user-plus, crown, user-question
- Matchmaking: swords, trophy, flame, shield-check, send/apply
- Utility: menu, arrow-left, plus, close, settings, share, paperclip
- Status: circle-check, cancellation X, warning/info

The web designs use icon fonts and inline SVG interchangeably. React Native needs a platform-safe icon strategy, such as existing Expo Symbols where suitable or a deliberately added/icon component strategy; raw webfont classes will not work natively.

## Screen dependencies

| Screen | Shared dependencies | Screen-specific dependencies |
|---|---|---|
| Home | Screen, header actions, Input/search pill, Card, Badge, bottom tabs | Ground carousel, pitch thumbnail, upcoming booking, quick-action grid |
| Book a Ground | Screen, Header, Badge, Card, Button | Pitch visual, slot grid, payment selector |
| Booking Ticket | Screen, IconButton, Badge, Button, Text/data styles | QR rendering, ticket cutouts, dashed separators, wallet action |
| Booking History | Screen, Header, Card, Badge, bottom tabs | Booking status list |
| My Teams | Screen, Header, IconButton, Card, Avatar, Badge, bottom tabs | Team list/card |
| Create Team | Screen, Header, Input, Card, Avatar, Button | Invite action tiles, team code, roster |
| Team Detail | Screen, Header, Card, Avatar, Badge | Metric cards, roster, captain actions |
| Team Chat | Screen, Header, Input, IconButton, bottom tabs | Message list, incoming/outgoing bubbles, attachment/send bar |
| Recruitment | Screen, segmented control, Card, Badge, Button, FAB, bottom tabs | Recruitment feed card |
| Challenges | Screen, segmented control, Card, Badge, Button, FAB, bottom tabs | Challenge feed card |
| Create Post | Screen, Header, segmented control, Card, Button, Switch, slot selector | Recruitment/challenge form |
| Notifications | Screen, Header/IconButton, Card, Badge | Today/Earlier notification groups |
| Wallet | Screen, Header/IconButton, Card, Button, Badge | Balance card, provider selector, transaction list |
| Drawer | Modal/scrim, Avatar, IconButton, navigation rows, Switch | Theme toggle row, logout row |

## Implementation order

1. **Token and font foundation**
   - Consolidate dark/light colors, typography, spacing, radii, shadows, and semantic statuses.
   - Decide how Rajdhani, Manrope, and Roboto Mono are bundled for Android and iOS.
   - Add reusable pitch background and glass surface style helpers using React Native-compatible properties.

2. **Global primitives**
   - Screen/safe-area wrapper
   - Text styles
   - Buttons and icon buttons
   - Inputs
   - Cards, badges, avatars
   - Header and bottom navigation
   - Segmented control, switch, selection tile, FAB

3. **Navigation shell**
   - Confirm five bottom tabs.
   - Define stack/modal routes for drawer, booking details, team details, chat, post, notifications, and wallet.
   - Preserve deep-linkable route names.

4. **Home and core booking flow**
   - Home/discovery
   - Book a Ground
   - Booking QR Ticket
   - Booking History

5. **Team flow**
   - My Teams
   - Team Detail
   - Create Your Team
   - Team Chat

6. **Matchmaking flow**
   - Recruitment feed
   - Team challenge feed
   - Create Post

7. **Account/support surfaces**
   - Notifications
   - Wallet
   - Settings Drawer and theme toggle

8. **Visual verification**
   - Compare Android and iOS renders at small and large phone widths.
   - Verify keyboard, safe areas, scroll behavior, pressed states, and bottom-dock overlap.

## Potential React to React Native translation issues

### Layout and styling

- Tailwind classes must become `StyleSheet` objects or existing token-based styles.
- CSS gradients and repeating pitch-line backgrounds are not directly supported by core React Native. They require layered `View`s, a supported gradient implementation, or a simplified platform-safe texture.
- `backdrop-filter: blur(...)` is not uniformly available on Android/iOS. Glass surfaces need a translucent fallback and optionally an Expo-supported blur implementation.
- CSS pseudo-elements (`::before`, `::after`) used for QR ticket cutouts must become positioned child views.
- CSS `position: fixed`, `sticky`, transforms, and web z-index layering need to become React Native layout/absolute-position equivalents.
- CSS `clamp()`, viewport units, `100dvh`, `calc()`, and arbitrary Tailwind breakpoints need runtime dimensions and `useWindowDimensions`.
- Web CSS `gap`, `overflow-x-auto`, hidden scrollbars, and horizontal carousels need React Native `gap` support verification, `ScrollView`, and platform-specific content sizing.

### HTML semantics and interaction

- `div`, `section`, `article`, `header`, `nav`, and `footer` become `View` or reusable semantic components.
- `button` and anchor elements become `Pressable`, `Button`, or Expo Router `Link`.
- `input` becomes `TextInput`; keyboard avoidance and focus behavior must be designed explicitly.
- HTML `role="radio"` and `aria-checked` require React Native accessibility roles/states and managed selection state.
- HTML checkbox/toggle behavior requires a controlled React Native switch or custom accessible control.
- Web hover states have no touch equivalent; preserve pressed/focused states instead.
- `active:scale-*` should use `Pressable` state styles, not CSS transforms.
- Fixed bottom navigation and CTAs must account for safe-area insets and keyboard visibility.

### Fonts and icons

- Google Fonts `<link>` tags do not work in native bundles. Fonts need local assets and `expo-font`, or a deliberate system-font fallback.
- Tabler Icons webfont class names cannot be rendered by React Native `Text` without font packaging and platform setup.
- Material Symbols has the same issue and appears only in the challenges screen.
- Inline SVG can be translated to an SVG library only if a dependency is intentionally added; otherwise use existing Expo Symbols or native primitives for simple icons.
- Font weights and exact letter spacing may render differently on Android and iOS.

### Media and visual fidelity

- The QR matrix shown in the HTML is a static visual approximation, not a functional QR generator. A real booking implementation should use a native-compatible QR strategy later.
- CSS shadow blur/spread and `backdrop-filter` differ significantly across platforms.
- Ticket perforation, dashed borders, and complex pitch illustrations require custom layout primitives and careful pixel-density testing.
- The simulated phone shells and iOS home-indicator bars are design-preview artifacts, not application UI; native screens should use actual safe-area/status-bar behavior.

### Product/navigation behavior

- Several designs show links such as `#home`, `#bookings`, and `#teams`; these are visual web placeholders, not final route contracts.
- Some flows are implied but not fully designed: Help & Support, logout, profile, booking tab content, and QR scanning.
- `screen1.md` contains a malformed `!-- BEGIN: MainScrollArea -->` comment, which is harmless for visual reference but confirms the source is not production-ready application code.
- `design.md` and `bookingHistory.md` duplicate Booking History with slightly different token values, so a canonical screen reference must be chosen before pixel matching.
