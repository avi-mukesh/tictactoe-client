import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // whenever the component unmounts, we set the title back to what it was before
    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
