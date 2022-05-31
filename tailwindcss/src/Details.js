import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { useState, useEffect } from "react";

const Details = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pet, setPet] = useState({});

  useEffect(() => {
    const fetchPets = async () => {
      const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
      const json = await res.json();

      setPet(json.pets[0]);
      setLoading(false);
    };
    fetchPets();
  }, [id]);

  const toggleModal = () => setShowModal((state) => !state);
  // const adopt = () => (window.location = "http://bit.ly/pet-adopt");
  if (loading) {
    return <h2>loading … </h2>;
  }

  const { animal, breed, city, state, description, name, images } = pet;

  return (
    <div className="container mx-auto flex flex-col">
      <Carousel images={images} />
      <div className="bg-gray-600 text-white bg-opacity-60 p-5 rounded-md m-10 flex flex-col">
        <h1 className="text-xl">{name}</h1>
        <h2 className="text-slate-200 text-sm">{`${animal} — ${breed} — ${city}, ${state}`}</h2>
        <ThemeContext.Consumer>
          {([theme]) => (
            <button
              onClick={toggleModal}
              style={{ backgroundColor: theme }}
              className="p-5 rounded-xl m-5 self-center"
            >
              Adopt {name}
            </button>
          )}
        </ThemeContext.Consumer>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <a href="https://bit.ly/pet-adopt">Yes</a>
                <button onClick={toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
