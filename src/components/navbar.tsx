import Bars from "../assets/icon-menu-hamburger.svg";
import Search from '../assets/icon-search.svg';
import Add from '../assets/icon-add.svg';
import Avatar from '../assets/image-avatar.webp';

export default function Navbar() {
    return (
        <nav className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-neutral-800 px-4 py-3" style={{ minWidth: '220px' }}>
            {/* menu + search */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <button className="inline md:hidden p-2.5 bg-white rounded-md shadow-sm w-10 h-10 border border-neutral-400">
                    <img src={Bars} alt="Menu" className="text-neutral-900 dark:text-white w-5 h-5" />
                </button>

                <div className="flex items-center gap-1 bg-white dark:bg-neutral-500 px-3 py-2 rounded-md shadow-sm w-full md:w-72 border border-neutral-400">
                    <img src={Search} alt="Search" className="w-5 h-5 opacity-60 text-neutral-800" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="outline-none text-sm bg-transparent w-full  text-neutral-800"
                    />
                </div>
            </div>

            {/* add  */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 justify-center text-white p-2 rounded-md  bg-teal-700 shadow-2xs">
                    <img src={Add} alt="Add" className="text-amber-50 w-5 h-5"/>
                    <span className="hidden md:inline">Add bookmark</span>
                </button>
                <img
                    src={Avatar}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full"
                />
            </div>
        </nav>
    );
}