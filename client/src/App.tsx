import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Suspense } from "react";

const App = () => {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
