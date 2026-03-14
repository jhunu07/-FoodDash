import React, { useState } from 'react';
import './Home.css';
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import AppDownload from '../../Components/AppDownload/AppDownload';
const Home = () => {

  const [category, setCategory] = useState("All");


  return (
    <div className="home-page">
      <Header />
      <section className="home-section">
        <ExploreMenu category={category} setCategory={setCategory} />
      </section>
      <section className="home-section">
        <FoodDisplay category={category} />
      </section>
      <section className="home-section" id="app-download">
        <AppDownload />
      </section>

    </div>
  );
};
export default Home 