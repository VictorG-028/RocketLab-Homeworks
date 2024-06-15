
interface Props {
  size?: number,
}

export default function Spinner({size = 16} : Props) {

  return(
    <div className="flex justify-center items-center">
      <div className={`size-${size} relative animate-spin`}>
        <div className="absolute inset-0 border-4 border-solid border-t-blue-500 border-transparent rounded-full"></div>
        <div className="absolute inset-0 border-4 border-solid border-r-rose-500 border-transparent rounded-full"></div>
        <div className="absolute inset-0 border-4 border-solid border-b-green-500 border-transparent rounded-full"></div>
        <div className="absolute inset-0 border-4 border-solid border-l-yellow-500 border-transparent rounded-full"></div>
        <div className="absolute rotate-45 top-[50%] left-[50%]">
          <div className="absolute bottom-[52%] right-[52%] size-1 rotate-[270deg] bg-blue-500"></div>
          <div className="absolute top-[52%] right-[52%] size-1 rotate-180 bg-yellow-500"></div>
          <div className="absolute top-[52%] left-[52%] size-1 rotate-90 bg-green-500"></div>
          <div className="absolute bottom-[52%] left-[52%] size-1 bg-rose-500"></div>
        </div>
      </div>
    </div>
  );
}
