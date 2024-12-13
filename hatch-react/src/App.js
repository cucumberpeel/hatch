import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import RecipeList from './components/RecipeList';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header title="Hatch" desc="Your personal home cooking companion" />
      <main>
        <Search />
        <RecipeList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
