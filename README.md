# Mind Maze - Interactive Web Game

An engaging, responsive web-based puzzle game that combines maze navigation with trivia challenges, creating a unique blend of spatial reasoning and knowledge-based gameplay for players of all skill levels.

**Live Site:** [https://nicolae-cristoloveanu.github.io/mind-maze-hackathon-ci/](https://nicolae-cristoloveanu.github.io/mind-maze-hackathon-ci/)

![Mind Maze Wizard](assets/images/wizard.webp)

![Mind Maze Game](assets/images/mind-maze2.png)

## 🎮 Recent Updates & Improvements

### Latest Enhancements

- **Procedural Maze Generation**: Implemented recursive backtracking algorithm for unique, solvable mazes every playthrough
- **Trivia API Integration**: Connected to [Open Trivia Database](https://opentdb.com/) for dynamic question fetching with multiple categories
- **Medieval Theme Implementation**: Applied cohesive Fable-inspired design with ornate borders, warm colors, and fantasy aesthetics
- **Master Key System**: Strategic resource management allowing players to skip difficult questions with limited uses
- **Responsive Controls**: Dual input support with keyboard (WASD/arrows) and touch controls for mobile devices
- **Real-time HUD**: Live tracking of master keys, correct answers, and game progress with visual feedback
- **Modal System**: Bootstrap-powered trivia question display with accessible design patterns
- **Game State Management**: Comprehensive tracking of player progress, statistics, and win/lose conditions
- **Cross-platform Compatibility**: Optimized gameplay experience across desktop, tablet, and mobile devices
- **White Text Accessibility**: Enhanced modal text visibility with improved contrast for better readability

### AI Development Tools Used
This project has been developed with assistance from advanced AI tools:
- **GitHub Copilot**: Used for code completion, debugging assistance, and implementation optimization
- **ChatGPT/Claude AI**: Assisted with game logic refinement, documentation, and accessibility improvements


## Table Of Contents:
1. [Project Overview](#project-overview)
2. [Design & Planning](#design--planning)
    * [Wireframes](#wireframes)
    * [User Stories](#user-stories)
    * [Typography](#typography)
    * [Colour Scheme](#colour-scheme)
3. [Features](#features)
    * [Game Mechanics](#game-mechanics)
    * [Trivia System](#trivia-system)
    * [User Interface](#user-interface)
    * [Responsive Design](#responsive-design)
4. [Technologies Used](#technologies-used)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Credits](#credits)

## Project Overview

Mind Maze is an interactive web-based puzzle game that challenges players to navigate through procedurally generated mazes while answering trivia questions at strategic checkpoints. The game combines spatial reasoning with knowledge-based challenges, creating an engaging experience that tests both navigation skills and general knowledge.

### Key Features:
- **Procedural Generation**: Every maze is unique, ensuring fresh gameplay experiences
- **Trivia Integration**: Knowledge-based challenges that gate progress through the maze
- **Strategic Resource Management**: Master keys provide limited skips for difficult questions
- **Cross-Platform Gameplay**: Seamless experience across desktop, tablet, and mobile devices

## Design & Planning:

### Wireframes

The game interface was designed with wireframes to establish optimal user experience across different device sizes:

[Wireframe screenshots will be added here]

#### Desktop Layout
- **Game Area**: Central maze display with surrounding HUD elements
- **Control Panel**: Directional controls positioned for easy access
- **Statistics Display**: Master keys and score tracking in dedicated panels
- **Modal System**: Overlay trivia questions with medieval-themed styling

#### Mobile Layout
- **Stacked Interface**: Vertical arrangement optimizing touch interaction
- **Touch Controls**: Large, accessible buttons for directional movement
- **Responsive Modals**: Full-screen trivia questions for mobile screens
- **Optimized HUD**: Condensed statistics display for smaller screens

### User Stories

#### 1. As a player, I want to move through a maze so that I can reach the goal.
**Acceptance Criteria:**
- Maze is visible on screen
- Player can move in four directions
- Player cannot pass through walls

**Atomic Tasks:**
1. Implement HTML/CSS grid for maze layout
2. Create JavaScript maze rendering function
3. Add keyboard controls (arrow keys + WASD)
4. Add touch/swipe button controls for mobile
5. Implement wall collision detection

#### 2. As a player, I want to encounter locked doors with trivia questions so that I must answer correctly to progress.
**Acceptance Criteria:**
- Locked door tiles appear in maze
- Reaching a door triggers trivia modal
- Door opens only if correct answer given

**Atomic Tasks:**
1. Define door tile positions in maze data
2. Implement door rendering on grid
3. Detect collision with door tile
4. Trigger trivia popup when door reached
5. Unlock door if trivia answered correctly

#### 3. As a player, I want to use a limited number of master keys so I can skip tough questions.
**Acceptance Criteria:**
- Player starts with fixed number of master keys
- Skip button in trivia modal consumes 1 key
- Keys count updates on HUD

**Atomic Tasks:**
1. Add master key count to game state object
2. Display keys remaining in HUD
3. Add skip button in trivia modal
4. Reduce key count when skip used
5. Allow door to open when skip used

#### 4. As a player, I want immediate feedback after answering a trivia question so I know if I can move forward.
**Acceptance Criteria:**
- Correct answer shows 'Correct!' and opens door
- Incorrect answer shows 'Incorrect!' and highlights correct answer

**Atomic Tasks:**
1. Add answer validation logic
2. Style feedback messages in modal
3. Highlight correct answer after wrong guess
4. Close trivia modal and open door on correct/skipped answer

#### 5. As a player, I want the game to work smoothly on my phone so that I can play anywhere.
**Acceptance Criteria:**
- Maze fits on screen
- Buttons and text scale well
- Touch controls work

**Atomic Tasks:**
1. Use CSS media queries for responsiveness
2. Adjust HUD layout for mobile
3. Implement button controls
4. Test on multiple screen sizes

#### 6. As a player, I want readable text and clear visuals so that I can enjoy the game without strain.
**Acceptance Criteria:**
- Fonts readable on all devices
- Colors high-contrast
- Buttons large enough for touch

**Atomic Tasks:**
1. Apply accessible font sizes
2. Use high-contrast color scheme
3. Style trivia modal for clarity
4. Ensure all buttons are touch-friendly

#### 7. As a player, I want an intro screen with game settings and tutorials so that I can understand how to play and adjust the game before starting.
**Acceptance Criteria:**
- Intro screen appears before maze starts
- Player can start new game from intro screen
- Player can access tutorial/instructions
- Player can adjust basic settings (e.g., difficulty, maze size, trivia category, sound)

**Atomic Tasks:**
1. Create intro screen HTML structure
2. Add "Start Game" button to transition into maze
3. Add "Tutorial" button with modal explaining rules & controls
4. Implement settings options (difficulty - should set maze size and trivia question category)
5. Store chosen settings in game state object
6. Ensure intro screen is responsive on all devices

#### 8. As a player, I want the maze layout and trivia questions to change each time so that the game feels fresh.
**Acceptance Criteria:**
- Maze is randomly generated or loaded from a set
- Trivia pulled randomly from question bank

**Atomic Tasks:**
1. Implement random maze generator or load random layout from list
2. Build trivia question bank using Web API
3. Implement random question selection logic

#### 9. As a player, I want to see my performance at the end so that I can track my progress.
**Acceptance Criteria:**
- Game end screen shows score, correct answers, skips used, and time

**Atomic Tasks:**
1. Track correct answers in game state
2. Track skips used in game state
3. Add end-game summary screen
4. Display performance stats from game state

### Typography
The website uses carefully selected Google Fonts for optimal readability and thematic consistency:
- **Primary Font**: Figtree - Modern, highly readable sans-serif for UI elements and game text
- **Secondary Font**: Montserrat - Clean geometric typeface for headings and emphasis
- **Thematic Font**: Cinzel - Medieval-inspired serif font for modal titles and atmospheric text

### Colour Scheme
The color palette reflects the medieval fantasy theme with natural, earthy tones:
- **Primary Color**: `#F7EF99` (Light Yellow) - Warm, inviting tone for primary elements
- **Secondary Color**: `#ABE188` (Light Green) - Natural accent representing growth and progress
- **Highlight Color**: `#8B8BAE` (Purple/Lavender) - Mystical accent for special elements
- **Accent Color**: `#F1BB87` (Warm Beige) - Earthy tone for balanced visual hierarchy
- **Text Color**: `#5D675B` (Dark Green) - Readable dark tone maintaining natural theme

## Features:

### Game Mechanics

#### Maze Navigation System
- **Procedural Generation**: Recursive backtracking algorithm creates unique, solvable mazes
- **Player Movement**: Smooth navigation using keyboard arrows, WASD, or touch controls
- **Collision Detection**: Accurate wall detection preventing invalid movement
- **Visual Feedback**: Clear player positioning with blue circular indicator
- **Start/End Points**: Distinctive visual markers for maze entrance and exit

#### Trivia Door System
- **Strategic Placement**: Doors positioned throughout maze requiring knowledge to pass
- **Question Presentation**: Bootstrap modal system displaying multiple-choice questions
- **Answer Validation**: Immediate feedback with correct/incorrect response handling
- **Door States**: Visual indicators for locked, unlocked, and completed doors
- **Progress Blocking**: Failed questions prevent advancement until resolved

#### Master Key Mechanism
- **Limited Resource**: Strategic number of master keys based on difficulty setting
- **Skip Functionality**: Bypass difficult questions while consuming valuable resources
- **Visual Counter**: Real-time display of remaining master keys in HUD
- **Strategic Decision**: Players must choose when to use keys vs. attempt answers
- **Game Balance**: Prevents total blocking while maintaining challenge

### Trivia System

#### API Integration
- **[Open Trivia Database](https://opentdb.com/)**: Dynamic question fetching for varied content
- **Category Selection**: Multiple subject areas for diverse questioning
- **Difficulty Scaling**: Questions calibrated for engaging but fair challenge
- **Caching System**: Efficient storage preventing repeated API calls
- **Fallback Content**: Local question bank if API unavailable

#### Question Format
- **Multiple Choice**: Four-option format with single correct answer
- **Immediate Feedback**: Instant response with answer validation
- **Educational Value**: Correct answers highlighted for learning opportunities
- **Randomization**: Shuffled options preventing pattern memorization
- **Accessibility**: Screen reader compatible with proper ARIA labels

### User Interface

#### Heads-Up Display (HUD)
- **Master Keys Counter**: Golden key icons showing remaining skips
- **Score Tracking**: Correct answers and total questions attempted
- **Progress Indicators**: Visual representation of game advancement
- **Responsive Layout**: Adaptive positioning for different screen sizes

#### Control Systems
- **Keyboard Controls**: Arrow keys and WASD for directional movement
- **Touch Interface**: Large, accessible buttons for mobile interaction
- **Button Feedback**: Visual hover and active states for user feedback
- **Accessibility Support**: Full keyboard navigation for screen readers

#### Modal Design
- **Medieval Theming**: Ornate borders and atmospheric background imagery
- **Accessible Content**: High contrast white text for improved readability
- **Responsive Sizing**: Optimal display across all device types
- **Clear Actions**: Distinct buttons for answers and master key usage

### Responsive Design

#### Cross-Device Compatibility
- **Mobile Optimization**: Touch-friendly controls and appropriate sizing
- **Tablet Adaptation**: Balanced layout utilizing available screen space
- **Desktop Enhancement**: Full feature set with optimal performance
- **Consistent Experience**: Unified gameplay across all platforms

#### Performance Considerations
- **Efficient Rendering**: Optimized CSS for smooth animation and interaction
- **Image Optimization**: Compressed assets for faster loading
- **Responsive Images**: Appropriate sizing for different screen densities
- **Progressive Enhancement**: Core functionality works without advanced features

## Technologies Used

- **HTML5**: Semantic markup for game structure and accessibility compliance
- **CSS3**: Custom styling with CSS variables, flexbox, and grid for responsive design
- **JavaScript ES6+**: Game logic, API integration, maze generation algorithms, and interactive functionality
- **Bootstrap 5.3.3**: Responsive framework providing grid system, modals, and component styling
- **Google Fonts**: Professional typography with Figtree, Montserrat, and Cinzel font families
- **Font Awesome**: Comprehensive icon library for UI elements and visual feedback
- **[Open Trivia DB API](https://opentdb.com/)**: External trivia question database for dynamic content

### Development Tools:
- **Visual Studio Code**: Primary development environment with extensions for productivity
- **Chrome DevTools**: Debugging, performance analysis, and responsive design testing
- **Git & GitHub**: Version control and repository hosting with collaborative development
- **Live Server**: Local development server for real-time testing and iteration
- **CSS/HTML Validators**: W3C validation tools ensuring code quality and standards compliance

### Game Architecture:
- **Modular JavaScript**: Separated game logic, UI management, and API handling
- **Event-Driven Design**: Responsive user interaction handling with custom events
- **State Management**: Persistent game state throughout sessions with comprehensive tracking
- **Progressive Enhancement**: Core maze functionality independent of JavaScript features

### Framework Benefits:
- **Bootstrap Grid System**: Responsive 12-column layout for consistent design
- **Bootstrap Components**: Pre-built modals, buttons, and navigation elements
- **Bootstrap Utilities**: Spacing, typography, and color classes for efficient styling
- **Mobile-First Approach**: Responsive design philosophy ensuring optimal mobile experience

## Testing

[Testing section will be expanded with screenshots and detailed results]

### Cross-Browser Compatibility
Testing performed across major browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Device Responsiveness
Verified functionality across device categories:
- Mobile phones (320px - 768px)
- Tablets (768px - 1024px)
- Laptops (1024px - 1440px)
- Desktop monitors (1440px+)

### Game Logic Testing
- **Maze Generation**: Verified all generated mazes are solvable
- **Trivia Integration**: Confirmed API connectivity and question display
- **Master Key System**: Validated resource management and skip functionality
- **Win/Lose Conditions**: Tested all game completion scenarios

### Accessibility Testing
- **Keyboard Navigation**: Full game playable without mouse
- **Screen Reader Support**: Semantic HTML with appropriate ARIA labels
- **Color Contrast**: Text readability across all interface elements
- **Focus Management**: Clear visual indicators for interactive elements

### Performance Optimization
- **Load Times**: Optimized assets for fast initial rendering
- **Smooth Animations**: 60fps performance during gameplay
- **Memory Management**: Efficient maze generation and cleanup
- **API Response Handling**: Graceful handling of network delays

## Deployment

[Deployment details will be added once live site is available]

### GitHub Pages Deployment
The game will be deployed using GitHub Pages:
1. Repository settings configuration
2. Branch selection for deployment
3. Custom domain setup (if applicable)
4. SSL certificate configuration

### Local Development
For development and testing:
1. Open `index.html` in a web browser
2. Use live server for optimal API testing
3. Access developer tools for debugging

## Credits

### Content
- **Game Concept**: Original puzzle-trivia hybrid design combining spatial and knowledge challenges
- **Medieval Theme**: Inspired by fantasy gaming aesthetics and classical mythology
- **Educational Integration**: Trivia system designed to provide learning opportunities within gameplay
- **Accessibility Focus**: Universal design principles ensuring inclusive gaming experience

### Technical Resources
- **Bootstrap 5.3.3**: Responsive framework enabling professional UI development
- **[Open Trivia Database](https://opentdb.com/)**: Comprehensive question bank providing diverse trivia content
- **Google Fonts**: Professional typography enhancing readability and aesthetic appeal
- **Font Awesome**: Icon library providing consistent visual elements
- **Recursive Backtracking Algorithm**: Maze generation technique ensuring solvable puzzles

### Images and Assets
- **Fantasy Imagery**: Medieval-themed backgrounds and atmospheric elements
- **UI Icons**: Custom and Font Awesome icons for interface elements
- **Background Textures**: Atmospheric imagery supporting the fantasy theme
- **Player Indicators**: Custom designed elements for game state visualization

### Development Support
- **GitHub Copilot**: AI-assisted coding for implementation efficiency and bug detection
- **ChatGPT/Claude AI**: Development guidance, documentation assistance, and accessibility recommendations
- **Code Institute**: Educational foundation and project structure guidance
- **Open Source Community**: Libraries, frameworks, and development tools

### Inspiration and Research
- **Classic Maze Games**: Traditional puzzle games informing navigation mechanics
- **Educational Gaming**: Research on learning through interactive entertainment
- **Responsive Design**: Modern web development practices for cross-platform compatibility
- **Accessibility Standards**: WCAG guidelines ensuring inclusive design

### Acknowledgments
- **Code Institute**: Educational foundation and project requirements framework
- **GitHub Community**: Version control platform and collaborative development tools
- **Bootstrap Team**: Responsive framework enabling rapid, professional development
- **[Open Trivia Database](https://opentdb.com/) Maintainers**: Free API service providing educational content
- **Accessibility Advocates**: Guidelines and testing methodologies for inclusive design
- **Beta Testers**: Community feedback improving gameplay experience and usability

---
**Note**: This game is created for educational and entertainment purposes as part of a hackathon project. It demonstrates modern web development techniques, responsive design principles, and accessibility best practices in interactive entertainment.
- **Unique Layouts**: Different maze configuration each playthrough
- **Algorithmic Generation**: Procedural maze creation ensuring solvable paths
- **Scalable Complexity**: Maze size adapts to difficulty settings

#### Question Randomization
- **Shuffled Order**: Trivia questions randomized each game session
- **Category Mixing**: Balanced distribution across selected categories
- **Difficulty Progression**: Questions may increase in difficulty as players advance

### Game Modes & Settings

#### Intro Screen & Tutorial
- **Welcome Interface**: Game title and branding display before maze begins
- **How to Play**: Comprehensive tutorial covering:
  - Movement controls (keyboard, touch, swipe)
  - Trivia door mechanics
  - Master key usage strategies
  - Scoring system explanation

#### Difficulty Settings
- **Easy Mode**: 
  - Fewer trivia doors for gentler learning curve
  - User selects single preferred category
  - Smaller maze size (Y1 x Y1 grid)
- **Medium Mode**:
  - Moderate number of doors for balanced challenge
  - Choice from 4 different categories
  - Medium maze size for extended gameplay
- **Hard Mode** (Future Implementation):
  - Maximum doors and complexity
  - All categories mixed
  - Large maze size for expert players

#### Customization Options
- **Maze Size**: Adjustable grid dimensions based on difficulty
- **Door Frequency**: Variable number of trivia checkpoints
- **Category Selection**: Player choice in trivia subjects
- **Master Key Count**: Difficulty-based number of available skips

### Technical Implementation
- **API Integration**: External trivia question database connectivity
- **State Management**: Persistent game state throughout session
- **Responsive Design**: Bootstrap 5.3.3 for cross-device compatibility
- **Performance Optimization**: Efficient rendering for smooth gameplay
- **Progressive Enhancement**: Core functionality works without advanced features

## 🛠️ Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom styling with CSS variables, flexbox, and grid
- **Bootstrap 5.3.3**: Responsive grid system, modals, and components
- **JavaScript ES6+**: Game logic, API integration, and interactive functionality
- **Font Awesome**: Icons and visual elements for UI enhancement

### External Integrations
- **Trivia API**: Dynamic question fetching from external trivia databases
- **Bootstrap CDN**: Fast loading of framework assets
- **Font Awesome Kit**: Icon library for enhanced visual design

### Development Tools
- **Git**: Version control and collaboration
- **GitHub**: Repository hosting and deployment
- **VS Code**: Primary development environment
- **Live Server**: Local development server for testing

### Game Architecture
- **Modular JavaScript**: Separated game logic, UI management, and API handling
- **State Management**: Persistent game state throughout sessions
- **Event-Driven Design**: Responsive user interaction handling
- **Progressive Enhancement**: Core functionality without JavaScript dependencies

## 📱 Responsive Design

The game is fully responsive with optimized breakpoints:
- **Extra Small Devices** (< 576px): Phones in portrait mode
- **Small Devices** (< 768px): Phones and small tablets
- **Medium Devices** (768px - 991.98px): Tablets
- **Large Devices** (992px - 1199.98px): Desktops
- **Extra Large Devices** (≥ 1200px): Large desktop screens

## 🎮 Game Mechanics

### Core Gameplay Loop
1. **Game Initialization**: Player selects difficulty and trivia categories
2. **Maze Generation**: Dynamic maze layout created with randomized trivia doors
3. **Navigation Phase**: Player moves through maze using keyboard, WASD, or touch controls
4. **Trivia Encounters**: At locked doors, multiple-choice questions appear via modal/interface
5. **Decision Point**: Player chooses to answer question or use master key skip
6. **Progress Continuation**: Successful answers or skips open doors, allowing maze progression
7. **Victory Condition**: Reaching maze exit completes the game with performance summary

### Movement System
- **Desktop Controls**: Arrow keys or WASD for directional movement
- **Mobile Controls**: Swipe gestures or tap-to-move navigation
- **Collision Detection**: Walls and locked doors prevent invalid movement
- **Smooth Animation**: Fluid transitions between maze positions

### Trivia Door Mechanics
- **Door Placement**: Strategic positioning throughout maze to create engaging challenges
- **Question Presentation**: Bootstrap modal system displays trivia with multiple choice options
- **Answer Validation**: Immediate feedback with correct answer highlighting
- **Retry System**: Incorrect answers allow multiple attempts or master key usage
- **Door States**: Visual indicators for locked, unlocked, and completed doors

### Master Key System
- **Resource Management**: Limited quantity based on difficulty setting
- **Strategic Decision**: Players must choose when to skip vs. attempt answers
- **Visual Counter**: HUD displays remaining master keys at all times
- **One-Time Use**: Each skip permanently consumes one master key
- **Emergency Option**: Prevents total game blockage when stuck on difficult questions

### Scoring & Progress
- **Correct Answer Tracking**: Points awarded for each successful trivia response
- **Efficiency Bonus**: Higher scores for completing with fewer master key uses
- **Completion Time**: Speed factor in final score calculation
- **Progress Percentage**: Visual indicator of maze completion status

### API Integration Features
- **Dynamic Question Loading**: Real-time trivia fetching from external databases
- **Category Filtering**: API requests filtered by player-selected subjects
- **Question Caching**: Efficient storage to prevent repeated API calls
- **Fallback System**: Local question bank if API unavailable

## 📂 Project Structure

```
mind-maze-hackathon-ci/
├── index.html              # Main game interface
├── README.md               # Project documentation
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles and responsive design
│   ├── images/             # Game assets and graphics
│   └── js/
│       └── script.js       # Game logic and interactivity
├── .github/                # GitHub workflow configurations
└── .git/                   # Git repository data
```

## 🚦 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for CDN resources (Bootstrap, Font Awesome)

### Installation & Quick Start
1. **Clone the repository**:
   ```bash
   git clone https://github.com/nicolae-cristoloveanu/mind-maze-hackathon-ci.git
   ```

2. **Navigate to project directory**:
   ```bash
   cd mind-maze-hackathon-ci
   ```

3. **Launch the game**:
   - **Simple**: Double-click `index.html` to open in your default browser
   - **Development**: Use a local server for full functionality

### Development Setup
For active development with API integration and full features:

**Option 1: Python Server**
```bash
# Navigate to project folder
cd mind-maze-hackathon-ci

# Start local server (Python 3)
python -m http.server 8000

# Open browser to: http://localhost:8000
```

**Option 2: Node.js Live Server**
```bash
# Install live-server globally (if not already installed)
npm install -g live-server

# Start server in project directory
live-server

# Automatically opens browser with live reload
```

**Option 3: VS Code Live Server Extension**
```bash
# Install "Live Server" extension in VS Code
# Right-click on index.html
# Select "Open with Live Server"
```

### Game Controls
- **Desktop**: Use arrow keys or WASD for movement
- **Mobile/Tablet**: Swipe in desired direction or tap adjacent cells
- **Trivia**: Click/tap answer buttons in modal dialogs
- **Master Keys**: Use dedicated button when encountering locked doors

### First Play Guide
1. **Start Game**: Choose difficulty level (Easy recommended for first play)
2. **Select Category**: Pick your preferred trivia subject (Easy mode)
3. **Navigate Maze**: Move using controls to explore the maze
4. **Answer Questions**: When encountering doors, answer trivia to proceed
5. **Use Master Keys**: Skip difficult questions strategically
6. **Reach Exit**: Complete the maze to see your final score

## 🎨 Customization

### Color Scheme
The game uses CSS custom properties for easy theming:
- **Primary Color**: `#F78E69` (Coral/Peach navbar)
- **Text Colors**: High contrast for accessibility
- **Feature Grid**: Gradient backgrounds for visual appeal

### Responsive Breakpoints
Modify media queries in `assets/css/style.css` to adjust responsive behavior:
```css
/* Extra Small Devices */
@media (max-width: 575.98px) { /* Styles */ }

/* Small Devices */
@media (max-width: 767.98px) { /* Styles */ }

/* Medium Devices */
@media (min-width: 768px) and (max-width: 991.98px) { /* Styles */ }
```

## 🔄 Future Development

### Immediate Roadmap (Phase 1)
- [x] **Core Maze Engine**: Basic navigation and movement system
- [x] **Trivia Integration**: API connection and question display system
- [x] **Master Key Mechanics**: Skip functionality implementation
- [ ] **Complete Game Loop**: Full integration of all core systems
- [ ] **Difficulty Settings**: Easy/Medium/Hard mode implementation
- [ ] **Score Persistence**: Local storage for high scores and progress

### Enhanced Features (Phase 2)
- [ ] **Advanced Maze Generation**: Multiple maze algorithms (recursive backtracking, Prim's, etc.)
- [ ] **Category Management**: Expanded trivia subject options
- [ ] **Achievement System**: Badges for milestones (perfect runs, speed completion, category mastery)
- [ ] **Visual Enhancements**: Smooth animations, particle effects, and improved graphics
- [ ] **Sound Design**: Audio feedback for movement, correct answers, and achievements
- [ ] **Leaderboards**: Global and local high score tracking

### Advanced Features (Phase 3)
- [ ] **User Authentication**: Player profiles and cloud save functionality
- [ ] **Multiplayer Mode**: Competitive maze racing with shared trivia challenges
- [ ] **Custom Maze Editor**: User-created maze layouts with sharing capabilities
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Accessibility Enhancements**: Screen reader optimization, colorblind support
- [ ] **Analytics Dashboard**: Detailed player performance insights

### API & Backend Expansion
- [ ] **Multiple Trivia Sources**: Integration with various question databases
- [ ] **Custom Question Bank**: Admin interface for adding custom trivia
- [ ] **Difficulty Algorithms**: AI-driven question difficulty assessment
- [ ] **Performance Analytics**: Player behavior and completion rate analysis

### Contributing Guidelines
1. **Fork the Repository**: Create your own copy for development
2. **Feature Branches**: Use descriptive branch names (`feature/maze-generation`)
3. **Code Standards**: Follow existing code style and commenting conventions
4. **Testing**: Ensure all features work across desktop and mobile
5. **Pull Requests**: Provide clear descriptions of changes and testing performed

### Development Priorities
- **Core Functionality**: Complete basic game loop before advanced features
- **Mobile Optimization**: Ensure excellent mobile experience throughout development
- **Performance**: Maintain smooth gameplay on lower-end devices
- **Accessibility**: Build inclusive design principles into all features

## 📊 Performance Considerations

- **Optimized Assets**: Compressed images and minified CSS/JS for production
- **Responsive Images**: Multiple image sizes for different screen densities
- **Lazy Loading**: Deferred loading of non-critical resources
- **Progressive Enhancement**: Core functionality works without JavaScript

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color combinations
- **Touch Targets**: Appropriately sized buttons for mobile devices

---

**Made with ❤️ for the Code Institute Hackathon**
