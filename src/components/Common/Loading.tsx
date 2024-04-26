export default function Loading({ size }) {
  return (
    <div className="absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5">
      <div className="flex-center  h-10 w-[50%] bg-opacity-0">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="animate-spin"
        >
          <div
            className="h-full w-full rounded-[50%] border-4
                 border-l-blue-600 border-t-blue-600"
          ></div>
        </div>
      </div>
    </div>
  );
}
