import styles from './PokemonEntry.module.css';

export default function PokemonEntry(props) {
  const pokemon = props.pokemon;
  let diff = props.difficulty;
  let diffStyle = undefined;

  if (diff === '1') {
    diffStyle = `${styles.easy} ${styles.noSelection}`;
  } else if (diff === '2') {
    diffStyle = `${styles.medium} ${styles.noSelection}`;
  } else if (diff === '3') {
    diffStyle = `${styles.hard} ${styles.noSelection}`;
  } else {
    console.log('banana', diff);
    diffStyle = `${styles.easy} ${styles.noSelection}`;
  }
  return (
    <div className={styles.tile}>
      <div>
        <span className={styles.id}>#{pokemon.id}</span>
        {/* if isBlurred is true, styles.blur will be applied, otherwise nothing will be applied */}
        <span className={props.isBlurred ? diffStyle : ''}>{pokemon.name}</span>
      </div>
      <div className={(props.isBlurred ? diffStyle : '') + ' ' + styles.sprite}>
        <img
          src={pokemon.img}
          draggable="false"
          alt="A mysterious Pokémon"
        ></img>
      </div>
    </div>
  );
}
