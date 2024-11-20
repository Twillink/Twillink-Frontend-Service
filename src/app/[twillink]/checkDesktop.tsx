import {useState, useEffect} from 'react';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // Initial value based on screen width

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    // Listener for changes in viewport width
    const handleChange = (event: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => {
      setIsDesktop(event.matches); // `matches` is true when viewport width is >= 1024px
    };

    // Attach listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDesktop;
};

export default useIsDesktop;
