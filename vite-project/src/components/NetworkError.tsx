export default function NetworkError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
      <p className="mt-4 text-xl font-semibold text-gray-800">
        Network error
      </p>
      <p className="mt-2 text-gray-500 max-w-md">
        We’re having trouble connecting to the server. Please check your
        internet connection or try again later.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition"
      >
        Retry
      </button>
    </div>
  );
}
