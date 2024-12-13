import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header title="Hatch" desc="Your personal home cooking companion" />
      <main>
        <Search />
        <h1 className="text-center display-5 fw-bolder">Recipes</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
