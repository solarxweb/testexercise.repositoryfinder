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

  return (status as unknown as string === 'Loading' ? <Spinner animation="grow" variant="light" />
    :
    profileData.length > 0 && <ul className="cards-list">
      {
        displayedRepos.map((el: Repo, index) => (
          <li
            className='cards-list__item'
            key={el.id}
            ref={range.includes(index) ? ref : null}
          >
            <p><b>{el.name}</b></p>
            {el.description !== null ? <p style={{ textAlign: 'justify' }}>{el.description}</p> : null}
            <a href={`${el.html_url}`} target="_blank" rel="noopener noreferrer">{el.html_url}</a>
            <p>Last update was at: {new Date(el.updated_at).toLocaleString()}</p>
            <p>Stars: {el.stargazers_count}</p>
          </li>
        ))
      }
    </ul>
  ) 
};

export default Cards;
