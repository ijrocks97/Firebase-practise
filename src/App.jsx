import React, { useEffect, useState } from "react";
import { db, auth, storage } from "./Config/firebase-config";
import Auth from "./Components/Auth";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const App = () => {
  const [movielist, setMovielist] = useState([]);

  const [newMovie, setNewMovie] = useState("");
  const [newReleaseDate, setReleaseDate] = useState(0);
  const [newAward, setNewAward] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);

  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("");

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    //Read The Data From DB
    //Set The Movie List
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovielist(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedMovieTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    console.log("Function called successfully");
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
      console.log("File Uploaded Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovie,
        release_Date: newReleaseDate,
        recievedAnOscar: newAward,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          type="text"
          placeholder="movie title"
          onChange={(e) => setNewMovie(e.target.value)}
        />
        <input
          type="number"
          placeholder="release date"
          onChange={(e) => setReleaseDate(Number(e.target.value))}
        />
        <label>Recieved An Oscar</label>
        <input
          type="checkbox"
          checked={newAward}
          onChange={(e) => setNewAward(e.target.checked)}
        />
        <button onClick={onSubmitMovie}>Submit</button>
      </div>

      <div>
        {movielist.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p> Released-Date: {movie.release_Date}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              placeholder="newTitle"
              onChange={(e) => setUpdatedMovieTitle(e.target.value)}
            />
            <button onClick={() => updateMovie(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input
          type="file"
          placeholder="Choose File"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
};

export default App;
