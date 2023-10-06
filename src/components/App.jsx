import { Component } from "react";
import { fetchImages } from "./Services";
import { SearchBar } from "./SearchBar";
import { ImageGallery } from "./ImageGallery";
import { Loader } from "./Loader";
import { Modal } from "./Modal";
import { Button } from "./Button/Button";

export class App extends Component {
  
  state = {
    images: [],
    searchValue: "",
    page: 1,
    error: null,
    isLoading: false,
    modal: "",
    totalPages: 0
  }

  async componentDidUpdate(prevProps, prevState) {

    if (this.state.searchValue !== prevState.searchValue || this.state.page !== prevState.page) {
      
      try {
        this.setState({ isLoading: true });

        const images = await fetchImages(
          this.state.searchValue,
          this.state.page
        )

        images.hits.map(image => {
          return this.setState(prevState => ({
            images: [
              ...prevState.images,
              {
                id: image.id,
                webformatURL: image.webformatURL,
                largeImageURL: image.largeImageURL,
                tags: image.tags,
                // totalPages: Math.ceil(images.totalHits / 12)
              },
            ],
            totalPages: Math.ceil(images.totalHits / 12)
          }))
        })
      } catch (error) {
        this.setState({ error });

      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchValue = e =>
    
    this.setState({
      searchValue: e,
      page: 1,
      images: [],
      error: null,
    })

  showImages = () => {

    const { images } = this.state;
    return images;
  }

  // loadMoreButtonVisibility = () => {

  //   if (this.state.images.length < 12) return "none";

  // }

  loadMoreButton = event => {

    if (event) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  handlerModal = imageAddress => this.setState({ modal: imageAddress });

  modalClose = event => this.setState({ modal: event });

  handlerModalShow = () => this.state.modal;

  render() {
    const { images, isLoading, modal, page, totalPages } = this.state;

    return (

      <div>
        <SearchBar onSubmit={this.searchValue} />

        <ImageGallery images={images} imageAddress={this.handlerModal} />

        {isLoading && <Loader />}
        
        {images.length > 0 && totalPages !== page && !isLoading && (
          <Button onClick={this.loadMoreButton} />
        )}

        {modal !== "" && (
          <Modal imageAddress={this.handlerModalShow()} onClick={this.modalClose} />
        )}
      </div>

    )
  }
}