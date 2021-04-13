import "./App.scss";
import Container from "./components/container/Container";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import React from "react";

function App() {
    return (
        <ErrorBoundary>
            <Container />
        </ErrorBoundary>
    );
}

export default App;
