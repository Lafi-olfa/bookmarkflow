import Icon from '../assets/favicon-frontend-mentor.png';
import Menu from '../assets/icon-menu-bookmark.svg';
import VisitCount from '../assets/icon-visit-count.svg';
import Pin from '../assets/icon-pin.svg';

export default function Card() {
  return (
    <div className="max-w-sm rounded-lg shadow-md bg-white mx-4 my-3 p-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="w-10 h-10" src={Icon} alt="logo" />

          <div>
            <p className="font-semibold text-sm">Frontend Mentor</p>
            <p className="text-xs text-gray-500">frontendmentor.io</p>
          </div>
        </div>

        <button>
          <img className="w-5 h-5" src={Menu} alt="menu" />
        </button>
      </div>

      <hr className="my-3" />

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-semibold text-sm">
          The Coldest Sunset
        </h3>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>

      {/* Tags */}
      <div className="mt-3">
        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          #photography
        </span>
      </div>

      <hr className="my-3" />

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-600">

        <div className="flex gap-3">

          <div className="flex items-center gap-1">
            <img className="w-4 h-4" src={VisitCount} alt="" />
            <span>47</span>
          </div>

          <div className="flex items-center gap-1">
            <img className="w-4 h-4" src={VisitCount} alt="" />
            <span>23 Sep</span>
          </div>

          <div className="flex items-center gap-1">
            <img className="w-4 h-4" src={VisitCount} alt="" />
            <span>15 Jan</span>
          </div>

        </div>

        <img className="w-4 h-4" src={Pin} alt="pin" />

      </div>
    </div>
  );
}