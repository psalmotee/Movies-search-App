import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 my-4">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span>{message || "An error occurred. Please try again."}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
