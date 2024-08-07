# Star Wars Heroes Viewer

This is a web application that allows users to view a list of Star Wars heroes, along with detailed information about the spaceships and movies associated with each hero. The project uses the latest version of Next.js for application structure, Axios for API requests, and React Flow for visualizing information in a graph format.

## DEMO LINK
[DEMO LINK](https://next-test-app-star-wars-uqc9-hi9vu4tgh-rodionsavs-projects.vercel.app/).

## Features

- **Heroes List:** Displays a paginated or infinite scroll list of all Star Wars heroes using the [StarWars API](https://sw-api.starnavi.io).
- **Hero Details:** Upon clicking a hero, detailed information is displayed in a graph format where:
  - The main node is the selected hero.
  - Links from the hero to the movies in which they appear.
  - Links from each movie to the spaceships the hero traveled on.
  
## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/)
- **API Requests:** [Axios](https://axios-http.com/)
- **UI Library:** [Chakra UI](https://chakra-ui.com/) or [Tailwind CSS](https://tailwindcss.com/)
- **Graph Visualization:** [React Flow](https://reactflow.dev/)
- **Testing:** [Jest](https://jestjs.io/) or [ViTest](https://vitest.dev/)

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/RodionSav/next_test-app-star-wars.git
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Application

To run the development server:
```sh
npm run dev
# or
yarn dev
