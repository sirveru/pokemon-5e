import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { Button, Group, Image, NumberInput, Stack, TextInput } from "@mantine/core";

const pokemonSpriteURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function PokemonInfo(props) {
    const [pokemon, setPokemon] = useState();
    const name = props.name ? String.fromCharCode((props.name.charCodeAt(0) - 32)) + props.name.substr(1) : "";

    useEffect(() => {
        if (!name) return;
        console.log(name);

        fetch(`https://raw.githubusercontent.com/Jerakin/p5e-data/519adc38da6eefa57b74fb403f1d7dbf596f4046/data/pokemon/${name}.json`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            const pokemon = new Pokemon(json);
            pokemon.name = name;
            setPokemon(pokemon);
        })
        .catch(err => console.error(err));
    }, [name]);

    function convert() {
        console.log("Converting...");
        console.log(pokemon);
    }

    function valueChange($event, fieldName) {
        const field = fieldName ? fieldName : $event.target.name;
        console.log($event);
        const newPokemon = {
            ...pokemon,
            [field]: fieldName ? $event : $event.target.value
        }
        setPokemon(newPokemon);
    }

    console.log(pokemon);

    if (!pokemon) {
        return (<div>
            No Pokemon
        </div>);
    }

    return (
        <Stack align="center">
            {pokemon.name}
            <Group>
                <TextInput
                    name="name"
                    label="Name"
                    placeholder="Insert name"
                    value={pokemon.name}
                    onChange={valueChange}/>
                <NumberInput
                    readOnly
                    name="pokedexEntry"
                    label="Pokedex Entry"
                    value={pokemon.pokedexEntry}/>
            </Group>
            <Group>
            </Group>
            <Group>
                <NumberInput
                    name="ac"
                    label="AC"
                    value={pokemon.ac}
                    onChange={value => valueChange(value, "ac")}/>
            </Group>
            <Image maw={160} src={pokemonSpriteURL + pokemon.pokedexEntry + ".png"}/>
            <Button onClick={convert}>Convert</Button>
        </Stack>
    );
}