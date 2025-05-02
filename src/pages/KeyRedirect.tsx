
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const KeyRedirect = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (key) {
      // Redirect to KeyDisplay with the key
      navigate(`/keydisplay/${key}`);
    } else {
      // If no key is provided, redirect back to getkey page
      navigate('/getkey');
    }
  }, [key, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <p className="text-white text-xl">Lade Deinen Key...</p>
    </div>
  );
};

export default KeyRedirect;
