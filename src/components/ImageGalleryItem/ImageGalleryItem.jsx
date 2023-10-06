import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = props => {
  
  const { id, tags, imageAddress, webformatURL, largeImageURL } = props;
  
  return (
    <li
      className={css.image}
      key={id}
      value={id}
      onClick={() => {
        imageAddress(largeImageURL);
      }}
    >
      <img src={webformatURL} alt={tags} className={css.card} />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  // onClick: PropTypes.func.isRequired,
  // id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}