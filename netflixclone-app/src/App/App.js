import React, {useEffect, useState} from "react";
import './App.css'
import Tmdb from "../BaseDatabase/TmdbDatabase";
import MovieRow from "../components/MovieRow/index";
import FeaturedMovie from '../components/Featured/index'
import Header from '../components/Header/index'





export default () => {


  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(()=>{
    const loadAll = async () =>{
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[ramdomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setFeaturedData(chosenInfo);          
      
    }   

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 20) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
    
      }

    }
    window.addEventListener('scroll', scrollListener);
    return () =>
      window.removeEventListener('scroll', scrollListener)
    }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData && <FeaturedMovie item={featuredData}/>}

      <section className="list">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
Feito por: Leandro Maiero<br/>
Direito de imagem Netflix<br/>
API: ThemovieDB.org

      </footer>

      {movieList.length <=0 &&

      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"/>
        </div>
      }

    </div>
  );

}