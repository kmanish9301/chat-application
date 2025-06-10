import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const PageNotFound = () => {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-2">Oops!</h1>
      <p className="text-lg mb-4">
        Something went wrong or this page doesn’t exist.
      </p>
      {isRouteErrorResponse(error) ? (
        <p className="text-gray-700">
          {error.status} - {error.statusText}
        </p>
      ) : (
        <p className="text-gray-700">
          {(error as Error).message || "Unknown Error"}
        </p>
      )}
    </div>
  );
};

export default PageNotFound;
