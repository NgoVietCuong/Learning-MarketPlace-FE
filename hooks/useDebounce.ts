import { useEffect, useCallback, useRef } from 'react';

export default function useDebounce(effect: any, dependencies: any[], delay: number) {
  const callback = useCallback(effect, dependencies);
  const lastDependencies = useRef(dependencies);

  useEffect(() => {
    if (lastDependencies.current.every((dep, i) => dep === dependencies[i])) {
      return;
    }
    lastDependencies.current = dependencies;

    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay, ...dependencies]);
}