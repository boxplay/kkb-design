import { useCallback, useEffect, useRef, useState } from 'react';

function useFetchState(props: any) {
  const focus = useRef<boolean>();
  const [state, setState] = useState(props);
  useEffect(() => {
    focus.current = true;
    return () => {focus.current = false};
  }, []);
  const setFetchState = useCallback((params) => {
    if (focus.current) {setState(params)}
  }, []);
  return [state, setFetchState];
}

export default useFetchState;
