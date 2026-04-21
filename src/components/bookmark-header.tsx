import Sort from '../assets/icon-sort.svg';

export default function BookmarkHeader() {
    return (
        <div className='flex justify-between items-center px-4 py-3'>
            <div className='text-xl leading-[1.2] text-neutral-900 dark:text-white dark:bg-neutral-900'>
                <h2>All bookmarks</h2>
            </div>
            <div className='flex gap-3 bg-white dark:bg-neutral-900 px-2 py-1 border border-neutral-400 rounded-md'>
                <img src={Sort} alt="Menu" className="w-5 h-5 text-neutral-900 dark:text-white" />
                <span className='text-neutral-900'>Sort by</span>
            </div>
        </div>
    )
}