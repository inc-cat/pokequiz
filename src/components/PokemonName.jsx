import styles from './PokemonName.module.css';

export default function PokemonName(props) {
  return <div className={styles.tile}>{props.name}</div>;
}
