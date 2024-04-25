import logo from './logo.svg';
import './App.css';
import PokemonInfo from './components/PokemonInfo';
import { useEffect, useState } from 'react';
import { Combobox, InputBase, InputPlaceholder, useCombobox } from '@mantine/core';

const pokeAPIUrl = "https://pokeapi.co/api/v2/pokemon?limit=809";

async function fetchNames(setPokemon) {
}

function App() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState();
  const [pokemon, setPokemon] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    fetch(pokeAPIUrl)
    .then(res => res.json())
    .then(json => {
      setPokemon(json.results);
      const temp = json.results.map(poke => {
        return <Combobox.Option value={poke} key={poke.name}>
          {poke.name}
        </Combobox.Option>
      });

      setOptions(temp);
    })
    .catch(err => console.error(err));
    // await fetchNames(setPokemon);
  }, []);

  function setOption(value) {
    setValue(value);
    combobox.closeDropdown();
  }

  return (
    <main>
      <Combobox store={combobox} onOptionSubmit={setOption}>
        <Combobox.Target>
          <InputBase
            component='button'
            type='button'
            pointer
            rightSection={<Combobox.Chevron/>}
            rightSectionPointerEvents='none'
            onClick={() => combobox.toggleDropdown()}
            >
              {value?.name || <InputPlaceholder>Pick value</InputPlaceholder>}
            </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {value?.name}
      <PokemonInfo name={value?.name}/>
    </main>
  );
}

export default App;
