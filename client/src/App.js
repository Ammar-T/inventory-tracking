import './App.css';
import Inventory from './components/inventory';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div>
      <Container>
        <Inventory />
      </Container>
    </div>
  );
}

export default App;
