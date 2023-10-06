// import { Component } from "react";
import React from "react";
import { useState, useEffect } from "react";
import { fetchImages } from "./Services";
import { SearchBar } from "./SearchBar";
import { ImageGallery } from "./ImageGallery";
import { Loader } from "./Loader";
import { Modal } from "./Modal";
import { Button } from "./Button/Button";

export const App = () => {

  const [images, setImages] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [page, setPage] = useState(1)
  const [, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState("")
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {

    const fetchHits = async () => {
      if (searchValue !== "" || page !== 1) {

        try {
          setIsLoading(true)

          const response = await fetchImages(searchValue, page)

          const newImages = response.hits.map((image) => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          }))

          setImages((prevImages) => [...prevImages, ...newImages])
          setTotalPages(Math.ceil(response.totalHits / 12))

        } catch (error) {
          setError(error)

        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchHits()
  }, [searchValue, page]) 

  const handleSearchValue = (e) => {
    setSearchValue(e)
    setPage(1)
    setImages([])
    setError(null)
  }

  const loadMoreButton = (event) => {

    if (event) {
      setPage(prevPage => prevPage + 1);
    }
  }

  const handlerModal = (imageAddress) => {
    setModal(imageAddress)
  }

  const modalClose = (event) => {
    setModal(event)
  }

  const handlerModalShow = () => {
    return modal
  }

    return (
      <div>
        <SearchBar onSubmit={handleSearchValue} />
        <ImageGallery images={images} imageAddress={handlerModal} />
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== page && !isLoading && (
          <Button onClick={loadMoreButton} />
        )}
        {modal !== "" && (
          <Modal imageAddress={handlerModalShow()} onClick={modalClose} />
        )}
      </div>
    )
}

// Base code from hw-03
// export class App extends Component {
  
//   state = {
//     images: [],
//     searchValue: "",
//     page: 1,
//     error: null,
//     isLoading: false,
//     modal: "",
//     totalPages: 0
//   }

//   async componentDidUpdate(prevProps, prevState) {

//     if (this.state.searchValue !== prevState.searchValue || this.state.page !== prevState.page) {
      
//       try {
//         this.setState({ isLoading: true });

//         const images = await fetchImages(
//           this.state.searchValue,
//           this.state.page
//         )

//         images.hits.map(image => {
//           return this.setState(prevState => ({
//             images: [
//               ...prevState.images,
//               {
//                 id: image.id,
//                 webformatURL: image.webformatURL,
//                 largeImageURL: image.largeImageURL,
//                 tags: image.tags,
//                 // totalPages: Math.ceil(images.totalHits / 12)
//               },
//             ],
//             totalPages: Math.ceil(images.totalHits / 12)
//           }))
//         })
//       } catch (error) {
//         this.setState({ error });

//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   searchValue = e =>
    
//     this.setState({
//       searchValue: e,
//       page: 1,
//       images: [],
//       error: null,
//     })

//   showImages = () => {

//     const { images } = this.state;
//     return images;
//   }

//   // loadMoreButtonVisibility = () => {

//   //   if (this.state.images.length < 12) return "none";

//   // }

//   loadMoreButton = event => {

//     if (event) {
//       this.setState({ page: this.state.page + 1 });
//     }
//   }

//   handlerModal = imageAddress => this.setState({ modal: imageAddress });

//   modalClose = event => this.setState({ modal: event });

//   handlerModalShow = () => this.state.modal;

//   render() {
//     const { images, isLoading, modal, page, totalPages } = this.state;

//     return (

//       <div>
//         <SearchBar onSubmit={this.searchValue} />

//         <ImageGallery images={images} imageAddress={this.handlerModal} />

//         {isLoading && <Loader />}
        
//         {images.length > 0 && totalPages !== page && !isLoading && (
//           <Button onClick={this.loadMoreButton} />
//         )}

//         {modal !== "" && (
//           <Modal imageAddress={this.handlerModalShow()} onClick={this.modalClose} />
//         )}
//       </div>

//     )
//   }
// }