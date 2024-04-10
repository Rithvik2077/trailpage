import React from "react";

interface CardProps {
  item: {
    id: string;
    total: number;
    type: string;
    value: number;
  };
  onclick: (id: string) => void;
  isActive: boolean;
}

const Cards: React.FC<CardProps> = ({ item, onclick, isActive }) => {
  const { id, total, type, value } = item;

  const ClassValue = isActive
    ? "focus:shadow-outline border-2 border-blue-300 boder-opacity-75 shadow-md"
    : "";

  const SvgSelector = (id: string) => {
    switch (id) {
      case "Tickets":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            {/* SVG Path for Tickets */}
          </svg>
        );
      case "Surveys":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            {/* SVG Path for Surveys */}
          </svg>
        );
      case "Feedback":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            {/* SVG Path for Feedback */}
          </svg>
        );
      default:
        return null;
    }
  };

  const icon = SvgSelector(id);

  const handleCardClick = () => {
    onclick(id);
  };

  return (
    <div
      className={`max-w-sm p-3 pr-16 bg-white rounded-lg shadow ${ClassValue}`}
      onClick={handleCardClick}
    >
      <div className="mb-2 flex gap-2 items-center">
        {icon}
        <a href="#">
          <h4 className="text-l font-bold tracking-tight text-blue-900 dark:text-white">
            {id}
          </h4>
        </a>
      </div>
      <div className="grid grid-row-2 grid-col-2">
        <p className="mb-2 col-span-2 font-bold text-black-500 dark:text-gray-400">
          Total {id}: {total}
        </p>
        <p className="mb-2 col-span-2 font-bold text-gray-500 dark:text-gray-400">
          {type}: {value}
        </p>
      </div>
    </div>
  );
};

export default Cards;
