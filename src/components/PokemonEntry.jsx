import styles from './PokemonEntry.module.css';

export default function PokemonEntry(props) {
  const pokemon = props.pokemon;
  return (
    <div className={styles.tile}>
      <span className={styles.id}>#{pokemon.id}</span>
      {/* if isBlurred is true, styles.blur will be applied, otherwise nothing will be applied */}
      <span className={props.isBlurred ? styles.blur : ''}>{pokemon.name}</span>
      <span
        className={(props.isBlurred ? styles.blur : '') + ' ' + styles.sprite}
      >
        <img src={pokemon.img}></img>
      </span>
    </div>
  );
}
