import styles from './PokemonName.module.css';

export default function PokemonName(props) {
  return (
    <div className={styles.tile}>
      {/* if isBlurred is true, styles.blur will be applied, otherwise nothing will be applied */}
      <span className={props.isBlurred ? styles.blur : ''}>{props.name}</span>
    </div>
  );
}
