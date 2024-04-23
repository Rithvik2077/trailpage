export default function Loading({size}) {
    return (
        <div className="absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5">
            <div className="w-[50%]  flex-center h-10 bg-opacity-0">
            <div
            style={{ width: `${size}px`, height: `${size}px` }}
            className="animate-spin">
                <div className="h-full w-full border-4 border-t-blue-600
                 border-l-blue-600 rounded-[50%]">
               </div>
            </div>
            </div>
        </div>
      );
}