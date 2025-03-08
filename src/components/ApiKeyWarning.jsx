import { AlertTriangle } from "lucide-react";

const ApiKeyWarning = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600 my-4">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-lg mb-2">API Key Required</h3>
          <p className="mb-3">
            You need to set up your OMDB API key to use this application. The
            app won't function properly without a valid API key.
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-3 ml-2">
            <li>
              Visit{" "}
              <a
                href="https://www.omdbapi.com/apikey.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                OMDB API Key Registration
              </a>
            </li>
            <li>Fill out the form (FREE tier allows 1,000 daily requests)</li>
            <li>Check your email and verify your API key</li>
            <li>Copy your API key</li>
            <li>
              Open{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                services/api.jsx
              </code>{" "}
              in your code editor
            </li>
            <li>
              Replace{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                API_KEY
              </code>{" "}
              with your actual API key
            </li>
          </ol>
          <p className="text-sm italic">
            Note: After updating the API key, you'll need to restart your
            development server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyWarning;
