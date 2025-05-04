import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Repo, Status } from "../../types/types";
import { Spinner } from "react-bootstrap";

const Cards = () => {
  const profileData = useSelector((state: { profile: { entities: Repo[] } }) => state.profile.entities);
  const status = useSelector((state: { profile:  { status: Status } } ) => state.profile.status)
  const [displayedRepos, setDisplayedRepos] = React.useState<Repo[]>([]);
  const itemsPerPage = 20;
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  const range: [number, number, number, number, number] = [19, 39, 59, 79, 99];

  useEffect(() => {
    setDisplayedRepos(profileData.slice(0, itemsPerPage));
  }, [profileData]);

  useEffect(() => {
    if (inView) {
      loadMoreRepos(); // +20 в состояние
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const loadMoreRepos = () => {
    const newRepos = profileData.slice(displayedRepos.length, displayedRepos.length + itemsPerPage);
    if (newRepos.length > 0) {
      setDisplayedRepos((prevRepos) => [...prevRepos, ...newRepos]);
    }
  };

  return (
    <> {/* Используем фрагмент для обертки */}
      {status as unknown as string === 'Loading' ? (
        // Оборачиваем спиннер в div для центрирования
        <div className="spinner-container">
          <Spinner animation="grow" variant="light"/>
        </div>
      ) : (
        profileData.length > 0 && (
          <ul className="cards-list">
            {
              displayedRepos.map((el: Repo, index) => (
                <li
                  className='cards-list__item item'
                  key={el.id}
                  ref={range.includes(index) ? ref : null}
                >
                  <p className="item-title">{el.name}</p>
                  {el.description && <p className="item-description">{el.description}</p>}
                  <a className="item-link" href={`${el.html_url}`} target="_blank" rel="noopener noreferrer">{el.html_url}</a>
                  <p className="item-lastchanges">Last update was at: {new Date(el.updated_at).toLocaleString()}</p>
                  <p className="item-starcounter">
                    <svg width="17.5" height="17.5" viewBox="0 0 17.5 17.5" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="8.75,0 11.2,5.45 17.5,6.75 12.95,11.05 14.15,17.5 8.75,14.65 3.35,17.5 4.55,11.05 0,6.75 6.3,5.45" fill="gold" stroke="black" stroke-width="0.5"/>
                    </svg>
                    Stars: {el.stargazers_count}
                  </p>
                </li>
              ))
            }
          </ul>
        )
      )}
    </>
  );
};

export default Cards;
