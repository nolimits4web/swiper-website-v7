import { ReactComponent as GithubLogo } from '@/img/github.svg';
import { useEffect, useState } from 'react';

function getLocalStats() {
  return {
    stars: localStorage.getItem('swiper-git-stats-stars'),
    forks: localStorage.getItem('swiper-git-stats-forks'),
  };
}

async function fetchGitStats(local) {
  if (local) {
    return getLocalStats();
  }
  const res = await fetch('https://api.github.com/repos/nolimits4web/swiper');
  const { stargazers_count, forks } = await res.json();
  if (stargazers_count || forks) {
    localStorage.setItem('swiper-git-stats-date', new Date().getTime());
  }
  if (stargazers_count) {
    localStorage.setItem(
      'swiper-git-stats-stars',
      stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  if (forks) {
    localStorage.setItem(
      'swiper-git-stats-forks',
      forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    );
  }
  return getLocalStats();
}

export default function GithubStats(props) {
  const { white, className, responsive } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    const gitStatsDate = localStorage.getItem('swiper-git-stats-date');
    const local =
      gitStatsDate && new Date().getTime() - gitStatsDate * 1 < 1000 * 60 * 60;
    fetchGitStats(local).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div className={`flex items-center ${className || ''}`}>
      <a
        href="https://github.com/nolimits4web/swiper"
        rel="noopener"
        target="_blank"
        className="flex"
      >
        <GithubLogo
          className={`inline-block ${white ? 'text-white' : ''}`}
          height="20"
        />
      </a>
      {[
        [data.stars, 'stars'],
        [data.forks, 'forks'],
      ].map(([value, label]) => (
        <a
          key={label}
          className={`mx-1 text-xs ${
            white
              ? 'text-white hover:underline'
              : 'text-gray-700 hover:text-primary hover:no-underline'
          } ${responsive ? 'hidden md:block' : ''}`}
          href="https://github.com/nolimits4web/swiper"
          rel="noopener"
          target="_blank"
        >
          <span className="text-base font-medium">{value}</span>{' '}
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
