import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setProductsFromLocalStorage } from 'src/features/Cart';
import { useAppDispatch } from 'src/shared/lib/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductsFromLocalStorage());
  }, [dispatch]);

  return <Outlet />;
}

export default App;
