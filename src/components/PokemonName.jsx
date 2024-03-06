import styles from './PokemonName.module.css';

export default function PokemonName(props) {
  return (
    <div className={styles.tile}>
      <span className={props.isBlurred ? styles.blur : ''}>{props.name}</span>
    </div>
  );
}
